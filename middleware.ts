import { NextResponse } from 'next/server';
import createMiddleware from './next.middleware';
import detectLanguage from './middlewares/detectLanguage';

const nextMiddleware = createMiddleware(NextResponse);

const { middleware, matcher } = nextMiddleware([detectLanguage]);

export { middleware, matcher };
