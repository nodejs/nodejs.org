import { processTraceItem } from './utils/processTailItem';

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
