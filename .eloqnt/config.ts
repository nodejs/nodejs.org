import { defineConfig } from '@eloqnt/cli';

import localeConfig from '../packages/i18n/src/config.json' with { type: 'json' };

export default defineConfig({
  srcPath: ['./apps/site'],
  messages: {
    path: './packages/i18n/src/locales',
    locales: localeConfig
      .filter(locale => locale.enabled)
      .map(locale => locale.code),
    sourceLocale: 'en',
    format: 'json',
  },
  lint: {
    overrides: [
      {
        // These keys are built at runtime, so static analysis cannot
        // see which ones are in use.
        keys: [
          'components.containers.footer.links.*',
          'components.containers.navBar.links.*',
          'components.navigation.about.links.*',
          'components.navigation.getInvolved.links.*',
          'layouts.download.codeBox.platformInfo.*',
          'layouts.blog.categories.*',
          'components.eolChip.severity.*',

          // These namespaces also hold statically referenced keys, so the
          // dynamic ones are listed individually.
          'components.metabar.author',
          'components.metabar.authors',
          'components.releaseModal.title',
          'components.releaseModal.titleWithoutCodename',
          'components.banner.default',
          'components.banner.warning',
          'components.banner.error',
        ],
        rules: { 'orphan-message': 'off' },
      },
    ],
  },
});
