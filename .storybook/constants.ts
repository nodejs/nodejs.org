// This is a constant object which is used throughout the app for changing the theme type of the storybook
// This object is read only due to the Object.freez so we can go with it because we are not changing its value anymore
export const STORYBOOK_MODE_THEME = Object.freeze({
  dark: 'dark',
  light: 'light',
});
// This defines "execution" modes that Chromatic will run on the each Storybook Story
// This allows us to test each Story with different parameters
// @see https://www.chromatic.com/blog/introducing-story-modes/
export const STORYBOOK_MODES = {
  'dark mobile': {
    theme: STORYBOOK_MODE_THEME.dark,
    viewport: 'small',
  },
  'dark desktop': {
    theme: STORYBOOK_MODE_THEME.dark,
    viewport: 'large',
  },
  'light mobile': {
    theme: STORYBOOK_MODE_THEME.light,
    viewport: 'small',
  },
  'light desktop': {
    theme: STORYBOOK_MODE_THEME.light,
    viewport: 'large',
  },
};

// These are the supported Viewports for our Storybook Stories
// It is also the different viewports that Chromatic will run the Visual Regression Tests
export const STORYBOOK_SIZES = {
  small: { name: 'Small', styles: { width: '414px', height: '896px' } },
  large: { name: 'Large', styles: { width: '1024px', height: '768px' } },
};
