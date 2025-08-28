import { readFile, glob } from 'node:fs/promises';
import { join, basename, posix, win32 } from 'node:path';

import generateReleaseData from '#site/next-data/generators/releaseData.mjs';
import { getRelativePath } from '#site/next.helpers.mjs';

import { processDocument } from './process-documents.mjs';

// If a GitHub token is available, include it for higher rate limits
const fetchOptions = process.env.GITHUB_TOKEN
  ? { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
  : undefined;

/**
 * Fetch Node.js API documentation directly from GitHub
 * for the current Active LTS version.
 */
export const getAPIDocs = async () => {
  // Find the current Active LTS version
  const releaseData = await generateReleaseData();
  const { versionWithPrefix } = releaseData.find(
    r => r.status === 'Active LTS'
  );

  // Get list of API docs from the Node.js repo
  const fetchResponse = await fetch(
    `https://api.github.com/repos/nodejs/node/contents/doc/api?ref=${versionWithPrefix}`,
    fetchOptions
  );
  const documents = await fetchResponse.json();

  // Download and return content + metadata for each doc
  return Promise.all(
    documents.map(async ({ name, download_url }) => {
      const res = await fetch(download_url, fetchOptions);

      return {
        content: await res.text(),
        pathname: `docs/${versionWithPrefix}/api/${basename(name, '.md')}.html`,
      };
    })
  );
};

/**
 * Collect all local markdown/mdx articles under /pages/en,
 * excluding blog content.
 */
export const getArticles = async () => {
  const relativePath = getRelativePath(import.meta.url);
  const root = join(relativePath, '..', '..', 'pages', 'en');

  // Find all markdown files (excluding blog)
  const files = await Array.fromAsync(glob('**/*.{md,mdx}', { cwd: root }));

  // Read content + metadata
  return Promise.all(
    files
      .filter(path => !path.startsWith('blog'))
      .map(async path => ({
        content: await readFile(join(root, path), 'utf8'),
        pathname: path
          // Strip the extension
          .replace(/\.mdx?$/, '')
          // Normalize to a POSIX path
          .replaceAll(win32.sep, posix.sep),
      }))
  );
};

/**
 * Aggregate all documents (API docs + local articles).
 */
export const getDocuments = async () => {
  const documentPromises = await Promise.all([getAPIDocs(), getArticles()]);
  return documentPromises.flatMap(documents =>
    documents.flatMap(processDocument)
  );
};
