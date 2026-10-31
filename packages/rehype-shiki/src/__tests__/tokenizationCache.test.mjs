import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { createHighlighterCoreSync } from '@shikijs/core';
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';
import { createOnigurumaEngine } from '@shikijs/engine-oniguruma';
import c from 'shiki/langs/c.mjs';
import html from 'shiki/langs/html.mjs';
import javascript from 'shiki/langs/javascript.mjs';
import json from 'shiki/langs/json.mjs';
import markdown from 'shiki/langs/markdown.mjs';
import shellscript from 'shiki/langs/shellscript.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import githubDark from 'shiki/themes/github-dark.mjs';
import githubLight from 'shiki/themes/github-light-default.mjs';
import nord from 'shiki/themes/nord.mjs';

import { withTokenizationCache } from '../tokenizationCache.mjs';

// Code that starts lines in states other than the first: open comments,
// template literals and embedded languages, and lines repeated in a state
const SAMPLES = {
  javascript: [
    "import { readFile } from 'node:fs/promises';",
    '',
    '/**',
    ' * Reads a file.',
    ' */',
    'const read = async (path, { encoding = "utf8" } = {}) => {',
    '  const text = `${path}:',
    '  ${await readFile(path, encoding)}`;',
    '  return /^[a-z]+$/i.test(text) ? text : null;',
    '};',
    '};',
    '',
    'class Reader extends EventEmitter {',
    '  #path = null;',
    '}',
  ].join('\n'),
  typescript: [
    'type Options<T extends object = {}> = Partial<T> & { signal?: AbortSignal };',
    'function f<T>(value: T): Promise<Array<T>> {',
    '  return Promise.resolve([value as T]);',
    '}',
  ].join('\n'),
  markdown: [
    '# Title',
    '',
    'Some **bold** text and `code`.',
    '',
    '```js',
    'const x = 1;',
    '```',
    '',
    '- [link](https://nodejs.org)',
  ].join('\n'),
  html: [
    '<style>',
    '  body { color: #333; }',
    '</style>',
    '<script>',
    '  document.body.append("hi");',
    '</script>',
    '<p class="note">Hello</p>',
  ].join('\n'),
  c: '#include <node_api.h>\n\nnapi_value Init(napi_env env, napi_value exports) {\n  return exports;\n}',
  shellscript: 'for f in *.md; do\n  echo "$f" | tr a-z A-Z\ndone',
  json: '{\n  "name": "node",\n  "version": [1, 2, 3],\n  "private": true\n}',
};

const ENGINES = {
  oniguruma: () => createOnigurumaEngine(import('shiki/wasm')),
  javascript: () => createJavaScriptRegexEngine({ forgiving: true }),
};

const THEMES = { light: 'github-light-default', dark: 'nord' };

/**
 * Creates a highlighter, and the same one caching each line's tokens.
 *
 * @param {import('@shikijs/core').RegexEngine} engine
 * @returns {{ shiki: import('@shikijs/core').HighlighterCore, cached: import('@shikijs/core').HighlighterCore }}
 */
const createHighlighters = engine => {
  const shiki = createHighlighterCoreSync({
    engine,
    langs: [
      ...c,
      ...html,
      ...javascript,
      ...json,
      ...markdown,
      ...shellscript,
      ...typescript,
    ],
    themes: [githubLight, nord, githubDark],
  });

  return { shiki, cached: withTokenizationCache(shiki) };
};

/**
 * Creates options to highlight TypeScript in two themes by name, with a
 * transformer that has it highlighted as JavaScript, as Twoslash does with
 * `// @showEmit`.
 *
 * @param {() => void} preprocess - Called whenever the transformer runs
 * @returns {import('@shikijs/core').CodeToHastOptions}
 */
const createTranspilingOptions = preprocess => ({
  lang: 'typescript',
  themes: THEMES,
  transformers: [
    {
      preprocess() {
        preprocess();
        this.options.lang = 'javascript';
      },
    },
  ],
});

describe('withTokenizationCache', async () => {
  for (const [name, createEngine] of Object.entries(ENGINES)) {
    const engine = await createEngine();
    const { shiki, cached } = createHighlighters(engine);

    it(`highlights as Shiki does, with the ${name} engine`, () => {
      for (const [lang, code] of Object.entries(SAMPLES)) {
        for (const options of [
          { lang, themes: THEMES, defaultColor: 'light' },
          { lang, themes: { ...THEMES, dim: 'github-dark' } },
        ]) {
          for (const method of [
            'codeToHtml',
            'codeToHast',
            'codeToTokens',
            'codeToTokensWithThemes',
          ]) {
            assert.deepStrictEqual(
              cached[method](code, options),
              shiki[method](code, options),
              `${method} of ${lang}`
            );
          }
        }
      }
    });
  }

  const { shiki, cached } = createHighlighters(ENGINES.javascript());

  const grammar = shiki.getInternalContext().getLanguage('javascript');

  // Shiki tokenizes every line but the empty ones
  const lines = SAMPLES.javascript.split('\n').filter(Boolean);

  it('tokenizes each line once for all the themes', t => {
    const tokenizeLine = t.mock.method(grammar, 'tokenizeLine');
    const tokenizeLine2 = t.mock.method(grammar, 'tokenizeLine2');

    cached.codeToHtml(SAMPLES.javascript, {
      lang: 'javascript',
      themes: { ...THEMES, dim: 'github-dark' },
    });

    assert.equal(tokenizeLine.mock.callCount(), lines.length);
    assert.equal(tokenizeLine2.mock.callCount(), 0);
  });

  it('continues a highlight as Shiki does, from inside a comment or a template literal', () => {
    const options = {
      lang: 'javascript',
      themes: { ...THEMES, dim: 'github-dark' },
    };

    const sample = SAMPLES.javascript.split('\n');

    for (const at of [3, 7]) {
      const start = sample.slice(0, at).join('\n');
      const end = sample.slice(at).join('\n');

      const { grammarState } = cached.codeToTokens(start, options);
      const { grammarState: shikiState } = shiki.codeToTokens(start, options);

      for (const method of [
        'codeToHtml',
        'codeToHast',
        'codeToTokensWithThemes',
      ]) {
        assert.deepStrictEqual(
          cached[method](end, { ...options, grammarState }),
          shiki[method](end, { ...options, grammarState: shikiState }),
          `${method} from line ${at}`
        );
      }
    }
  });

  it('highlights as usual with theme objects, or a single theme', t => {
    const tokenizeLine = t.mock.method(grammar, 'tokenizeLine');

    for (const options of [
      { lang: 'javascript', themes: { light: githubLight, dark: nord } },
      { lang: 'javascript', theme: 'nord' },
    ]) {
      assert.equal(
        cached.codeToHtml(SAMPLES.javascript, options),
        shiki.codeToHtml(SAMPLES.javascript, options)
      );
    }

    assert.equal(tokenizeLine.mock.callCount(), 0);
  });

  it('tokenizes code for each theme with a grammar that sets token types', t => {
    t.mock.property(grammar, '_tokenTypeMatchers', [
      { matcher: () => false, type: 0 },
    ]);

    const tokenizeLine = t.mock.method(grammar, 'tokenizeLine');
    const tokenizeLine2 = t.mock.method(grammar, 'tokenizeLine2');
    const preprocess = t.mock.fn();

    const html = cached.codeToHtml(
      SAMPLES.javascript,
      createTranspilingOptions(preprocess)
    );

    assert.equal(preprocess.mock.callCount(), 1);
    assert.equal(tokenizeLine.mock.callCount(), 0);
    assert.equal(tokenizeLine2.mock.callCount(), 2 * lines.length);

    assert.equal(
      html,
      shiki.codeToHtml(SAMPLES.javascript, createTranspilingOptions(preprocess))
    );
  });

  it('tokenizes a line that stops at the time limit once for all the themes', t => {
    const tokenize = grammar.tokenizeLine.bind(grammar);

    const tokenizeLine = t.mock.method(grammar, 'tokenizeLine', (...args) => ({
      ...tokenize(...args),
      stoppedEarly: true,
    }));

    const tokenizeLine2 = t.mock.method(grammar, 'tokenizeLine2');
    const preprocess = t.mock.fn();

    const html = cached.codeToHtml(
      SAMPLES.javascript,
      createTranspilingOptions(preprocess)
    );

    assert.equal(preprocess.mock.callCount(), 1);
    assert.equal(tokenizeLine.mock.callCount(), lines.length);
    assert.equal(tokenizeLine2.mock.callCount(), 0);

    assert.equal(
      html,
      shiki.codeToHtml(SAMPLES.javascript, createTranspilingOptions(preprocess))
    );
  });
});
