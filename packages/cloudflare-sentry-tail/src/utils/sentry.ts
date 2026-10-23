import { type SeverityLevel } from '@sentry/cloudflare';

export function determineSeverityLevel(
  item: TraceItem
): SeverityLevel | undefined {
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

export function workerOutcomeToSeverityLevel(outcome: string): SeverityLevel {
  const map: Record<string, SeverityLevel> = {
    exceededCpu: 'fatal',
    exceededMemory: 'fatal',
    exception: 'error',
    ok: 'info',
  };

  return map[outcome] ?? 'warning';
}

export function workerOutcomeToEventMessage(outcome: string): string {
  const map: Record<string, string> = {
    exceededCpu: 'Exceeded CPU',
    exceededMemory: 'Exceeded Memory',
    exception: 'Script Threw Exception',
    canceled: 'Client Disconnected',
    ok: 'Success',
  };

  return map[outcome] ?? 'Internal';
}

export function consoleLogLevelToSentryLevel(logLevel: string): SeverityLevel {
  const map: Record<string, SeverityLevel> = {
    debug: 'debug',
    log: 'info',
    error: 'error',
    warn: 'warning',
    trace: 'debug',
  };

  return map[logLevel] ?? 'debug';
}

export function consoleLogToString(logMessage: unknown): string {
  const pieces = Array.isArray(logMessage) ? logMessage : [logMessage];
  return pieces
    .map(p => (typeof p === 'string' ? p : JSON.stringify(p)))
    .join(', ');
}
