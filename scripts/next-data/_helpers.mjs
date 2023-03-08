import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';

export const getMatchingRoutes = (route = '', matches = []) =>
  matches.some(match => route === match);

// reads all immediate subdirectories of a directory
export const getDirectories = source => {
  return readdir(source, { withFileTypes: true }).then(d =>
    d.filter(e => e.isDirectory()).map(e => e.name)
  );
};

export const getRelativePath = path => fileURLToPath(new URL('.', path));
