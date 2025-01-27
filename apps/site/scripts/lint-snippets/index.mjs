import { readFile } from 'node:fs/promises';

import { parse } from 'acorn';
import { glob } from 'glob';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

const SUPPORTED_LANGUAGES = ['js', 'mjs', 'cjs'];

// Initialize the markdown parser
const markdownParser = unified().use(remarkParse);

/**
 * Parse JavaScript code using Acorn
 *
 * @param {string} code - The code to parse
 * @param {string} language - The language identifier
 * @returns {void}
 * @throws {Error} If parsing fails
 */
function parseJavaScript(code, language) {
  parse(code, {
    ecmaVersion: 'latest',
    sourceType: language === 'cjs' ? 'script' : 'module',
    allowReturnOutsideFunction: true,
  });
}

/**
 * Validate code blocks in a markdown file
 *
 * @param {string} filePath - Path to the markdown file
 * @returns {Array<{path: string, position: number, message: string}>} Array of errors
 */
async function validateFile(filePath) {
  const errors = [];

  const content = await readFile(filePath, 'utf-8');
  const tree = markdownParser.parse(content);

  visit(tree, 'code', node => {
    // TODO: Add TypeScript support
    if (!SUPPORTED_LANGUAGES.includes(node.lang)) {
      return;
    }

    try {
      parseJavaScript(node.value, node.lang);
    } catch (err) {
      errors.push({
        path: filePath,
        position: node.position.start.line,
        message: err.message,
      });
    }
  });

  return errors;
}

/**
 * Print validation errors to console
 *
 * @param {Array<{path: string, position: number, message: string}>} errors
 * @returns {void}
 */
function reportErrors(errors) {
  if (errors.length === 0) {
    return;
  }

  console.error('Errors found in the following files:');
  errors.forEach(({ path, position, message }) => {
    console.error(`- ${path}:${position}: ${message}`);
  });
}

// Get all markdown files
const filePaths = await glob('**/*.md', {
  root: process.cwd(),
  cwd: 'apps/site/pages/en/learn/',
  absolute: true,
});

// Validate all files and collect errors
const allErrors = await Promise.all(filePaths.map(validateFile));

// Flatten the array of errors
const flattenedErrors = allErrors.flat();

// Report errors if any
reportErrors(flattenedErrors);

// Exit with appropriate code
process.exit(flattenedErrors.length > 0 ? 1 : 0);
