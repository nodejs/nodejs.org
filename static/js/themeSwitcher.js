(function () {
  const themeAttr = 'data-theme';
  const isInDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (getTheme() == null) {
    setTheme(isInDarkMode ? 'dark' : 'light');
  } else {
    setTheme(getTheme());
  }

  function setTheme(theme) {
    document.querySelector('html').setAttribute(themeAttr, theme);
  }

  function getTheme() {
    return window.localStorage.getItem('theme');
  }
})();
