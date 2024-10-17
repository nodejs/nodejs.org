import { getSingletonHighlighterCore } from '@shikijs/core';
import type { HighlighterCore } from '@shikijs/core';
import type { LanguageRegistration, ThemeRegistrationRaw } from 'shiki';
import { createJavaScriptRegexEngine } from 'shiki';

// This creates a memoized minimal Shikiji Syntax Highlighter
export const shikiPromise = (
  langs: Array<LanguageRegistration>,
  theme: ThemeRegistrationRaw
) =>
  getSingletonHighlighterCore({
    themes: [theme],
    langs: langs,
    // Let's use Shiki's new Experimental JavaScript-based regex engine!
    engine: createJavaScriptRegexEngine(),
  });

export const highlightToHtml =
  (shiki: HighlighterCore) =>
  (code: string, language: string, theme: ThemeRegistrationRaw) =>
    shiki
      .codeToHtml(code, { lang: language, theme: theme })
      // Shiki will always return the Highlighted code encapsulated in a <pre> and <code> tag
      // since our own CodeBox component handles the <code> tag, we just want to extract
      // the inner highlighted code to the CodeBox
      .match(/<code>(.+?)<\/code>/s)![1];

export const highlightToHast =
  (shiki: HighlighterCore, theme: ThemeRegistrationRaw) =>
  (code: string, language: string) =>
    shiki.codeToHast(code, { lang: language, theme: theme });
