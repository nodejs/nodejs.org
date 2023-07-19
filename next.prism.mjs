/**
 * Dynamic import Prism.js language components on demand
 * based on language prefixes
 *
 * @param {string} language Prism language to be loaded
 */
export const loadLanguage = async language => {
  switch (language.replace('language-', '')) {
    case 'bash':
    case 'zsh':
      await import('prismjs/components/prism-bash');
      break;
    case 'jsx':
    case 'tsx':
      await import('prismjs/components/prism-jsx');
      break;
    default:
      break;
  }
};
