import { defineConfig } from '@eloqnt/cli';

export default defineConfig({
  srcPath: ['./apps/site', './packages/ui-components'],
  messages: {
    path: './packages/i18n/src/locales',
    locales: [
      'en',
      'es',
      'fr',
      'id',
      'ja',
      'ko',
      'pt-br',
      'pt',
      'ro',
      'ta',
      'tr',
      'uk',
      'zh-cn',
      'zh-tw',
    ],
    sourceLocale: 'en',
    format: 'json',
  },
  lint: {
    overrides: [
      {
        // These keys are built at runtime, so static analysis cannot see
        // them being used: labels come from navigation.json and
        // constants.json (e.g. t(link.text)), and the remaining keys are
        // built from a template with a runtime value, e.g.
        // t(`components.eolChip.severity.${severity}`).
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
