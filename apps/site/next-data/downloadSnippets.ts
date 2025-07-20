import {
  ENABLE_STATIC_EXPORT,
  IS_NOT_VERCEL_RUNTIME_ENV,
  NEXT_DATA_URL,
} from '#site/next.constants.mjs';
import { availableLocaleCodes } from '#site/next.locales.mjs';
import type { DownloadSnippet } from '#site/types';

export default async function getDownloadSnippets(lang: string) {
  // Prevents attempting to retrieve data for an unsupported language as both the generator
  // and the API endpoint will simply return 404. And we want to prevent a 404 response.
  if (!availableLocaleCodes.includes(lang)) {
    return [];
  }

  // When we're using Static Exports the Next.js Server is not running (during build-time)
  // hence the self-ingestion APIs will not be available. In this case we want to load
  // the data directly within the current thread, which will anyways be loaded only once
  // We use lazy-imports to prevent `provideBlogData` from executing on import
  if (ENABLE_STATIC_EXPORT || IS_NOT_VERCEL_RUNTIME_ENV) {
    const { default: provideDownloadSnippets } = await import(
      '#site/next-data/providers/downloadSnippets'
    );
    return provideDownloadSnippets(lang)!;
  }

  // Applies the language to the URL, since this content is actually localized
  const LOCALIZED_NEXT_DATA = NEXT_DATA_URL.replace(
    '/en/next-data/',
    `/${lang}/next-data/`
  );

  const fetchURL = `${LOCALIZED_NEXT_DATA}download-snippets`;

  // This data cannot be cached because it is continuously updated. Caching it would lead to
  // outdated information being shown to the user.
  // Note: We do manual JSON.parse after response.text() to prevent React from throwing an Error
  // that does not provide a clear stack trace of which request is failing and what the JSON.parse error is
  const response = await fetch(fetchURL);

  return JSON.parse(await response.text()) as Array<DownloadSnippet>;
}
