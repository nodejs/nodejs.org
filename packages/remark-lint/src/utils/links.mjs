import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * The `file:` URL of the file being linted, if it has a path.
 *
 * @param {import('vfile').VFile} file
 * @returns {URL | undefined}
 */
export const currentFileURL = file =>
  file.path
    ? pathToFileURL(
        path.isAbsolute(file.path)
          ? file.path
          : path.join(file.cwd || process.cwd(), file.path)
      )
    : undefined;
