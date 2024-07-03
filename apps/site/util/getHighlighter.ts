import { getHighlighterCore } from '@shikijs/core';
import type { HighlighterCore } from '@shikijs/core';
import { getWasmInstance } from '@shikijs/core/wasm-inlined';

import { LANGUAGES, DEFAULT_THEME } from '@/shiki.config.mjs';

// This creates a memoized minimal Shikiji Syntax Highlighter
export const getShiki = () =>
  getHighlighterCore({
    themes: [DEFAULT_THEME],
    langs: LANGUAGES,
    loadWasm: getWasmInstance,
  });

export const highlightToHtml =
  (shiki: HighlighterCore) => (code: string, language: string) =>
    // Shiki will always return the Highlighted code encapsulated in a <pre> and <code> tag
    // since our own CodeBox component handles the <code> tag, we just want to extract
    // the inner highlighted code to the CodeBox
    shiki
      .codeToHtml(code, { lang: language, theme: DEFAULT_THEME })
      .match(/<code>(.+?)<\/code>/s)![1];

export const highlightToHast =
  (shiki: HighlighterCore) => (code: string, language: string) =>
    shiki.codeToHast(code, { lang: language, theme: DEFAULT_THEME });
