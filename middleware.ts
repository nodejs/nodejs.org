import { NextResponse } from 'next/server';
import createMiddleware from './next.middleware';

const nextMiddleware = createMiddleware(NextResponse);

const { middleware, matcher } = nextMiddleware([
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./middlewares/detectLanguage').default,
]);

export { middleware, matcher };
