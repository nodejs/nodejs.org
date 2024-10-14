import tailwindConfig from '@/tailwind.config';

const colors = tailwindConfig.theme.colors;
export const themeConfig = {
  colors: {
    light: {
      '--text-color-primary': colors.neutral[900],
      '--text-color-accent': colors.green[600],
      '--background-color-secondary': colors.neutral[100],
      '--background-color-tertiary': colors.neutral[300],
      '--border-color-accent': colors.green[600],
      '--border-color-primary': colors.neutral[200],
      '--border-color-tertiary': colors.green[700],
      '--button-background-color-primary': colors.green[600],
      '--button-background-color-secondary': colors.white,
      '--button-background-color-secondary-hover': colors.neutral[100],
      '--button-border-color-secondary': colors.neutral[300],
      '--button-text-color-secondary': colors.neutral[900],
      '--chat-button-border-color-gradientThree': colors.green[400],
      '--chat-button-border-color-gradientFour': colors.green[700],
      '--chat-button-background-color-gradientOne': colors.green[600],
      '--chat-button-background-color-gradientTwo': colors.green[300],
    },
    dark: {
      '--text-color-primary': colors.neutral[100],
      '--text-color-accent': colors.green[400],
      '--background-color-secondary': colors.neutral[950],
      '--background-color-tertiary': colors.neutral[900],
      '--border-color-accent': colors.green[400],
      '--border-color-primary': colors.neutral[900],
      '--border-color-tertiary': colors.green[300],
      '--button-background-color-primary': colors.green[400],
      '--button-background-color-secondary': colors.neutral[950],
      '--button-background-color-secondary-hover': colors.neutral[900],
      '--button-border-color-secondary': colors.neutral[900],
      '--button-text-color-secondary': colors.neutral[200],
      '--chat-button-border-color-gradientThree': colors.green[400],
      '--chat-button-border-color-gradientFour': colors.green[700],
      '--chat-button-background-color-gradientOne': colors.green[400],
      '--chat-button-background-color-gradientTwo': colors.green[800],
    },
  },
};
