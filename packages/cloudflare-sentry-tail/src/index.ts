import {
  type Event,
  type SeverityLevel,
  captureEvent,
} from '@sentry/cloudflare';

export type SentryTailWorkerOptions = {
  samplingRate: number;
  headersToRedact?: Array<string>;
};

export function createSentryTail<Env = unknown>(
  options: SentryTailWorkerOptions
): ExportedHandlerTailHandler<Env> {
  return (items: Array<TraceItem>): void => {
    for (const item of items) {
      processTraceItem(options, item);
    }
  };
}

function processTraceItem(
  options: SentryTailWorkerOptions,
  item: TraceItem
): void {
  const severityLevel = determineSeverityLevel(item);
  if (!severityLevel) {
    // Not an error
    return;
  }

  if (
    options.samplingRate !== 1 &&
    !shouldSampleTraceItem(options.samplingRate)
  ) {
    return;
  }

  const event: Event = {
    level: severityLevel,
    timestamp: item.eventTimestamp ?? Date.now(),
    logger: '@node-core/cloudflare-sentry-tail',
    message: workerOutcomeToEventMessage(item.outcome),
    fingerprint: [],
    breadcrumbs: [],
    exception: {
      values: [],
    },
    tags: {
      outcome: item.outcome,
      script_name: item.scriptName,
      script_version: item.scriptVersion?.tag,
      cpu_time: item.cpuTime,
      wall_time: item.wallTime,
    },
  };

  // Populate data specific to the type of trace event we got
  handleTraceItemEvent(options, item, event);

  // Populate breadcrumbs with any relevant data
  addRemainingBreadcrumbs(item, event);

  // Sort breadcrumbs by their timestamps
  event.breadcrumbs?.sort((a, b) => {
    if (!a.timestamp || !b.timestamp) {
      return 0;
    }

    return a.timestamp - b.timestamp;
  });

  captureEvent(event);
}

function determineSeverityLevel(item: TraceItem): SeverityLevel | undefined {
  // Two scenarios where we want to report back to Sentry:
  // 1. Trace item outcome isn't 'ok'
  // 2. We have a status code >= 500
  //
  // Note that outcome is determined by if the worker executed to completion,
  // not if it returned a successful status code

  if (item.outcome === 'ok') {
    const response =
      item.event && 'response' in item.event ? item.event.response : undefined;

    if (response?.status && response?.status >= 500) {
      return 'error';
    } else {
      // Don't care
      return undefined;
    }
  }

  return workerOutcomeToSeverityLevel(item.outcome);
}

/**
 * Determines what kind of trace item event we received and adds any
 * event-specific properties to the Sentry event to be reported.
 */
function handleTraceItemEvent(
  options: SentryTailWorkerOptions,
  item: TraceItem,
  sentryEvent: Event
): void {
  if (!item.event) {
    return;
  }

  if ('request' in item.event) {
    const request = item.event.request;
    const response = item.event.response;

    const redactedHeaders: Record<string, string> = {};
    for (let [key, value] of Object.entries(request.headers)) {
      key = key.toLowerCase();

      if (options.headersToRedact && options.headersToRedact.includes(key)) {
        value = 'redacted';
      }

      redactedHeaders[key] = value;
    }

    sentryEvent.request = {
      method: request.method,
      url: request.url,
      headers: redactedHeaders,
      env: {
        asn: request.cf?.asn,
        colo: request.cf?.colo,
        continent: request.cf?.continent,
        country: request.cf?.country,
        timezone: request.cf?.timezone,
        httpProtocol: request.cf?.httpProtocol,
        requestPriority: request.cf?.requestPriority,
        tlsCipher: request.cf?.tlsCipher,
        tlsClientAuth: request.cf?.tlsClientAuth,
        tlsExportedAuthenticator: request.cf?.tlsExportedAuthenticator,
        tlsVersion: request.cf?.tlsVersion,
      },
    };

    const responseStatusCode = response?.status ?? 'Unknown';

    sentryEvent.message = response
      ? `${responseStatusCode} Response`
      : 'No response';

    sentryEvent.breadcrumbs?.push({
      type: 'http',
      category: 'request',
      timestamp: item.eventTimestamp ?? Date.now(),
      data: {
        url: request.url,
        method: request.method,
        status_code: responseStatusCode,
      },
    });

    const requestUrl = new URL(request.url);
    sentryEvent.fingerprint?.push(
      requestUrl.origin,
      requestUrl.pathname,
      request.method,
      `${responseStatusCode}`
    );

    sentryEvent.tags!.event = 'fetch';
    sentryEvent.tags!.ray_id = redactedHeaders['cf-ray'];
  } else if ('rpcMethod' in item.event) {
    sentryEvent.tags!.event = 'js-rpc';
    sentryEvent.tags!.rpc_method = item.event.rpcMethod;
  } else if ('scheduledTime' in item.event) {
    if ('cron' in item.event) {
      sentryEvent.tags!.event = 'scheduled';
      sentryEvent.tags!.scheduled_time = item.event.scheduledTime;
      sentryEvent.tags!.cron = item.event.cron;
      return;
    }

    sentryEvent.tags!.event = 'alarm';
    sentryEvent.tags!.scheduled_time = item.event.scheduledTime.toUTCString();
  } else if ('queue' in item.event) {
    sentryEvent.tags!.event = 'queue';
    sentryEvent.tags!.queue = item.event.queue;
    sentryEvent.tags!.batchSize = item.event.batchSize;
  } else if ('mailFrom' in item.event) {
    sentryEvent.tags!.event = 'email';
    sentryEvent.tags!.rawSize = item.event.rawSize;
  }
}

function addRemainingBreadcrumbs(item: TraceItem, sentryEvent: Event) {
  if (!sentryEvent.breadcrumbs) {
    return;
  }

  let breadcrumbsIdx = sentryEvent.breadcrumbs.length;

  // Allocate space for the elements we're gonna add
  sentryEvent.breadcrumbs.length +=
    item.logs.length +
    item.diagnosticsChannelEvents.length +
    item.exceptions.length;

  for (const log of item.logs) {
    sentryEvent.breadcrumbs[breadcrumbsIdx++] = {
      type: 'debug',
      category: `console.${log.level}`,
      message: consoleLogToString(log.message),
      level: consoleLogLevelToSentryLevel(log.level),
      timestamp: log.timestamp,
    };
  }

  for (const payload of item.diagnosticsChannelEvents) {
    sentryEvent.breadcrumbs[breadcrumbsIdx++] = {
      type: 'debug',
      category: `channel.${payload.channel}`,
      message: consoleLogToString(payload.message),
      level: 'debug',
      timestamp: payload.timestamp,
    };
  }

  let fingerprintIdx = sentryEvent.fingerprint!.length;
  let exceptionValueIdx = sentryEvent.exception!.values!.length;

  sentryEvent.fingerprint!.length += item.exceptions.length;
  sentryEvent.exception!.values!.length += item.exceptions.length;

  for (const exception of item.exceptions) {
    sentryEvent.breadcrumbs[breadcrumbsIdx++] = {
      type: 'error',
      level: 'error',
      category: exception.name,
      message: exception.message,
      timestamp: exception.timestamp,
      data: {
        stack: exception.stack,
      },
    };

    sentryEvent.fingerprint![fingerprintIdx++] = exception.name;
    sentryEvent.exception!.values![exceptionValueIdx++] = {
      type: exception.name,
      value: exception.message,
    };
  }
}

function shouldSampleTraceItem(sampleRate: number) {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);

  const random = buffer[0] / 4294967295;

  return random <= sampleRate;
}

function workerOutcomeToSeverityLevel(outcome: string): SeverityLevel {
  const map: Record<string, SeverityLevel> = {
    exceededCpu: 'fatal',
    exceededMemory: 'fatal',
    exception: 'error',
    ok: 'info',
  };

  return map[outcome] ?? 'warning';
}

function workerOutcomeToEventMessage(outcome: string): string {
  const map: Record<string, string> = {
    exceededCpu: 'Exceeded CPU',
    exceededMemory: 'Exceeded Memory',
    exception: 'Script Threw Exception',
    canceled: 'Client Disconnected',
    ok: 'Success',
  };

  return map[outcome] ?? 'Internal';
}

function consoleLogLevelToSentryLevel(logLevel: string): SeverityLevel {
  const map: Record<string, SeverityLevel> = {
    debug: 'debug',
    log: 'info',
    error: 'error',
    warn: 'warning',
    trace: 'debug',
  };

  return map[logLevel] ?? 'debug';
}

function consoleLogToString(logMessage: unknown): string {
  const pieces = Array.isArray(logMessage) ? logMessage : [logMessage];
  return pieces
    .map(p => (typeof p === 'string' ? p : JSON.stringify(p)))
    .join(', ');
}
