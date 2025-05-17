import {
  type CodeToHastOptions,
  createHighlighterCoreSync,
} from '@shikijs/core';
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';

import { LANGUAGES, DEFAULT_THEME } from '../shiki.config';

// Create a memoized minimal Shiki Syntax Highlighter
export const shiki = createHighlighterCoreSync({
  themes: [DEFAULT_THEME],
  langs: LANGUAGES,
  engine: createJavaScriptRegexEngine(),
});

/**
 * Highlight code to HTML and extract the inner content from code tags
 * @param code - Source code to highlight
 * @param language - Programming language for syntax highlighting
 * @param options - Additional Shiki options
 * @returns HTML string with syntax highlighting
 */
export const highlightToHtml = (
  code: string,
  language: string,
  options: Partial<CodeToHastOptions<string, string>> = {}
): string => {
  const html = shiki.codeToHtml(code, {
    lang: language,
    theme: DEFAULT_THEME,
    ...options,
  });

  const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
  return match?.[1] || html;
};

/**
 * Convert code to HAST with syntax highlighting
 * @param code - Source code to highlight
 * @param language - Programming language for syntax highlighting
 * @param options - Additional Shiki options
 * @returns HAST (Hypertext Abstract Syntax Tree) representation
 */
export const highlightToHast = (
  code: string,
  language: string,
  options: Partial<CodeToHastOptions<string, string>> = {}
) =>
  shiki.codeToHast(code, {
    lang: language,
    theme: DEFAULT_THEME,
    ...options,
  });
