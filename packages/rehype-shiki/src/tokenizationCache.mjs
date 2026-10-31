import {
  codeToHast,
  codeToHtml,
  codeToTokens,
  codeToTokensWithThemes,
} from '@shikijs/core';
import { EncodedTokenMetadata } from 'shiki/textmate';

// The metadata of each path of scopes, by grammar and theme
/** @type {WeakMap<object, WeakMap<object, Map<string, number>>>} */
const metadataCache = new WeakMap();

/**
 * Gets a map's value for a key, setting it first if it has none.
 *
 * @template K, V
 * @param {Map<K, V> | (K extends object ? WeakMap<K, V> : never)} map
 * @param {K} key
 * @param {() => V} create
 * @returns {V}
 */
const getOrSet = (map, key, create) => {
  let value = map.get(key);

  if (value === undefined) {
    value = create();
    map.set(key, value);
  }

  return value;
};

/**
 * Computes the metadata vscode-textmate gives a token with these scopes in the
 * theme in effect: the theme's defaults, with each scope's attributes merged
 * over them (`AttributedScopeStack`), and whether it holds balanced brackets
 * (`LineTokens.produceFromScopes`).
 *
 * @param {any} grammar - A vscode-textmate grammar, whose internals this reads:
 * Shiki types it without them, and vscode-textmate keeps them private
 * @param {Array<string>} scopes
 * @returns {number}
 */
const computeMetadata = (grammar, scopes) => {
  const { languageId, tokenType } =
    grammar._basicScopeAttributesProvider.getDefaultAttributes();
  const defaults = grammar.themeProvider.getDefaults();

  let metadata = EncodedTokenMetadata.set(
    0,
    languageId,
    tokenType,
    null,
    defaults.fontStyle,
    defaults.foregroundId,
    defaults.backgroundId
  );

  let path = null;

  for (const scopeName of scopes) {
    path = { scopeName, parent: path };

    const basic = grammar.getMetadataForScope(scopeName);
    const style = grammar.themeProvider.themeMatch(path);

    metadata = EncodedTokenMetadata.set(
      metadata,
      basic.languageId,
      basic.tokenType,
      null,
      style ? style.fontStyle : -1,
      style ? style.foregroundId : 0,
      style ? style.backgroundId : 0
    );
  }

  const brackets = grammar.balancedBracketSelectors;

  if (
    brackets &&
    (brackets.matchesAlways ||
      (!brackets.matchesNever && brackets.match(scopes)))
  ) {
    metadata = EncodedTokenMetadata.set(metadata, 0, 8, true, -1, 0, 0);
  }

  return metadata;
};

/**
 * Creates the primitive one highlight goes through, caching each line's
 * tokens: Shiki tokenizes code once for each theme, each time from the same
 * states, so the themes after the first only give the cached tokens their
 * styles. A grammar with token types of its own is tokenized as usual.
 *
 * @param {import('@shikijs/core').ShikiPrimitive} primitive
 * @returns {import('@shikijs/core').ShikiPrimitive}
 */
const createCachingPrimitive = primitive => {
  // Each line's tokens, by grammar, then by the state the line starts in
  /** @type {Map<object, Map<unknown, Map<string, import('shiki/textmate').ITokenizeLineResult>>>} */
  const lines = new Map();

  /** @type {object} */
  let theme;

  return {
    ...primitive,

    setTheme(name) {
      const result = primitive.setTheme(name);

      theme = result.theme;

      return result;
    },

    getLanguage(name) {
      /** @type {any} */
      const grammar = primitive.getLanguage(name);

      if (
        !grammar._basicScopeAttributesProvider ||
        grammar._tokenTypeMatchers?.length !== 0
      ) {
        return grammar;
      }

      return {
        name: grammar.name,

        tokenizeLine: grammar.tokenizeLine.bind(grammar),

        /** @type {import('@shikijs/core').Grammar['tokenizeLine2']} */
        tokenizeLine2(line, stack, timeLimit) {
          const states = getOrSet(lines, grammar, () => new Map());

          const { tokens, ruleStack, stoppedEarly } = getOrSet(
            getOrSet(states, stack, () => new Map()),
            line,
            () => grammar.tokenizeLine(line, stack, timeLimit)
          );

          const metadata = getOrSet(
            getOrSet(metadataCache, grammar, () => new WeakMap()),
            theme,
            () => new Map()
          );

          /** @type {Array<number>} */
          const binary = [];

          for (const { startIndex, scopes } of tokens) {
            const tokenMetadata = getOrSet(metadata, scopes.join(' '), () =>
              computeMetadata(grammar, scopes)
            );

            // Neighboring tokens with the same metadata are one
            if (binary.at(-1) !== tokenMetadata) {
              binary.push(startIndex, tokenMetadata);
            }
          }

          return { tokens: Uint32Array.from(binary), ruleStack, stoppedEarly };
        },
      };
    },
  };
};

/**
 * Makes a Shiki highlighter cache each line's tokens for all the themes it
 * highlights code in, rather than tokenizing it again for each: matching a
 * grammar doesn't depend on the theme, only the styles the matched scopes get
 * do. That's when two or more themes are given by name (Shiki prepares a theme
 * object again for every highlight), without `includeExplanation`; otherwise
 * code is highlighted as usual. The grammar state a cached highlight ends in
 * holds one theme's styles for every theme, so it only continues highlights
 * made the same way.
 *
 * @template {import('@shikijs/core').HighlighterCore} T
 * @param {T} shiki
 * @returns {T}
 */
export const withTokenizationCache = shiki => {
  const primitive = shiki.getInternalContext();

  /**
   * Wraps a highlighter method to highlight through the cache when it can.
   *
   * @template R
   * @param {(primitive: import('@shikijs/core').ShikiPrimitive, code: string, options: any) => R} highlight - The `@shikijs/core` function behind the method
   * @param {(code: string, options: any) => R} usual - The highlighter's own method
   * @returns {(code: string, options: any) => R}
   */
  const cached = (highlight, usual) => (code, options) => {
    const themes = Object.values(options?.themes ?? {}).filter(Boolean);

    return themes.length > 1 &&
      themes.every(theme => typeof theme === 'string') &&
      !options.includeExplanation
      ? highlight(createCachingPrimitive(primitive), code, options)
      : usual(code, options);
  };

  return {
    ...shiki,
    codeToTokensWithThemes: cached(
      codeToTokensWithThemes,
      shiki.codeToTokensWithThemes
    ),
    codeToTokens: cached(codeToTokens, shiki.codeToTokens),
    codeToHast: cached(codeToHast, shiki.codeToHast),
    codeToHtml: cached(codeToHtml, shiki.codeToHtml),
  };
};
