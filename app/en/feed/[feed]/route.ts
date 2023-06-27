import { basename } from 'node:path';
import { NextResponse } from 'next/server';
import * as nextJson from '@/next.json.mjs';
import * as nextData from '@/next-data/index.mjs';

// loads all the data from the blog-posts-data.json file
const websiteFeeds = nextData.generateWebsiteFeeds(nextJson.blogData);

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);

  const feed = basename(pathname);

  if (websiteFeeds.has(feed)) {
    return new NextResponse(websiteFeeds.get(feed)?.rss2(), {
      headers: { 'Content-Type': 'application/xml' },
    });
  }

  return new NextResponse(null, { status: 404 });
}
