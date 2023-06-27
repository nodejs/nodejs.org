import { NextResponse } from 'next/server';
import createMiddleware from './next.middleware';

const nextMiddleware = createMiddleware(NextResponse);

const { middleware, matcher } = nextMiddleware([
  require('./middlewares/detectLanguage').default,
]);

export { middleware, matcher };
