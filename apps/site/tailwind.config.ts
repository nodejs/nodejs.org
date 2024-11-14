import twConfig from '@node-core/ui-components/tailwind.config';
// We also want to include the UI components' inline tailwind configurations
twConfig.content.push('../../packages/ui-components/**/*.tsx');
export default twConfig;
