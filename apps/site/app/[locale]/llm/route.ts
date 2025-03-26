import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { NextResponse } from 'next/server';

// This is the Route Handler for the `GET` method which handles the request
// for a static llm.txt file
export const GET = async () => {
  try {
    // Read the content from a file
    const filePath = join(process.cwd(), 'public', 'llm.txt');
    const content = readFileSync(filePath, 'utf8');

    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.error('Error reading llm-full.txt file:', error);
    return new NextResponse('Error loading content', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

// Enforces that this route is used as static rendering
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
export const revalidate = 300;
