import { getSingletonHighlighterCore } from '@shikijs/core';
import type { HighlighterCore } from '@shikijs/core';
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';

import { LANGUAGES, DEFAULT_THEME } from '@/shiki.config.mjs';

// This creates a memoized minimal Shikiji Syntax Highlighter
export const shikiPromise = getSingletonHighlighterCore({
  themes: [DEFAULT_THEME],
  langs: LANGUAGES,
  // Let's use Shiki's new Experimental JavaScript-based regex engine!
  engine: createJavaScriptRegexEngine(),
});

export const highlightToHtml =
  (shiki: HighlighterCore) => (code: string, language: string) =>
    shiki
      .codeToHtml(code, { lang: language, theme: DEFAULT_THEME })
      // Shiki will always return the Highlighted code encapsulated in a <pre> and <code> tag
      // since our own CodeBox component handles the <code> tag, we just want to extract
      // the inner highlighted code to the CodeBox
      .match(/<code>(.+?)<\/code>/s)![1];

export const highlightToHast =
  (shiki: HighlighterCore) => (code: string, language: string) =>
    shiki.codeToHast(code, { lang: language, theme: DEFAULT_THEME });
