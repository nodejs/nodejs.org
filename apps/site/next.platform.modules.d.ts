/**
 * Wildcard ambient module declaration for the `@platform/*` webpack alias.
 *
 * The alias is resolved at build time by `apps/site/next.config.mjs` to the
 * active `@node-core/platform-<target>` package. We declare it here (rather
 * than via `tsconfig.json`'s `paths`) so that `tsconfig-paths-webpack-plugin`
 * can't shadow the webpack alias and bundle the wrong platform's files.
 */
declare module '@platform/*';
