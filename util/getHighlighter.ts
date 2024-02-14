import { getHighlighterCore } from 'shiki/core';
import getWasm from 'shiki/wasm';

import { LANGUAGES, DEFAULT_THEME } from '@/shiki.config.mjs';

// This creates a memoized minimal Shikiji Syntax Highlighter
const memoizedShikiji = await getHighlighterCore({
  themes: [DEFAULT_THEME],
  langs: LANGUAGES,
  loadWasm: getWasm,
});

export const highlightToHtml = (code: string, language: string) =>
  memoizedShikiji.codeToHtml(code, { lang: language, theme: DEFAULT_THEME });

export const highlightToHast = (code: string, language: string) =>
  memoizedShikiji.codeToHast(code, { lang: language, theme: DEFAULT_THEME });
