import { NextResponse } from 'next/server';
import createMiddleware from './next.middleware';
import detectLanguage from './middlewares/detectLanguage';

const nextMiddleware = createMiddleware(NextResponse);

export const { middleware } = nextMiddleware([detectLanguage]);

export const config = { matcher: "/" };
