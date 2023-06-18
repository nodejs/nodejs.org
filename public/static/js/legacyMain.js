const themeAttr = 'data-theme';

const setTheme = theme => {
  document.querySelector('html').setAttribute(themeAttr, theme);
  document.body.className = theme;
  window.localStorage.setItem('theme', theme);
};

const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

const getTheme = () => window.localStorage.getItem('theme');

const versionIntoHref = (nodeList, filename) => {
  const linkEls = Array.prototype.slice.call(nodeList);
  let version;
  let el;

  for (let i = 0; i < linkEls.length; i++) {
    version = linkEls[i].getAttribute('data-version');
    el = linkEls[i];
    el.href += filename.replace('%version%', version);
  }
};

const listenLanguagePickerButton = () => {
  const langPickerTogglerElement = document.querySelector(
    '.lang-picker-toggler'
  );

  const langPickerElement = document.querySelector('.lang-picker');

  const toggleFunction = function () {
    langPickerElement.classList.toggle('hidden');

    const isAriaExpanded =
      langPickerTogglerElement.getAttribute('aria-expanded') === 'true';

    langPickerTogglerElement.setAttribute('aria-expanded', !isAriaExpanded);
  };

  langPickerTogglerElement.addEventListener('click', toggleFunction);
};

const watchThemeChanges = () =>
  preferredColorScheme.addEventListener(
    'change',
    event => getTheme() || setTheme(event.matches ? 'dark' : 'light')
  );

const listenThemeToggleButton = () => {
  const darkThemeSwitcherElement = document.querySelector(
    '.dark-theme-switcher'
  );

  darkThemeSwitcherElement.addEventListener('click', () => {
    const currentTheme =
      getTheme() || (preferredColorScheme.matches ? 'dark' : 'light');

    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  });
};

const listenScrollToTopButton = () => {
  const scrollToTop = document.querySelector('#scroll-to-top');

  const showScrollToTopIfOutOfBounds = () =>
    window.requestAnimationFrame(
      () =>
        (scrollToTop.style.display =
          window.pageYOffset * 2 > window.innerHeight ? 'block' : 'none')
    );

  document.addEventListener('scroll', showScrollToTopIfOutOfBounds, {
    passive: true,
  });

  scrollToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo(0, 0);
  });
};

const setCurrentTheme = () =>
  setTheme(getTheme() || (preferredColorScheme.matches ? 'dark' : 'light'));

const startLegacyApp = () => {
  setCurrentTheme();

  watchThemeChanges();

  listenLanguagePickerButton();
  listenThemeToggleButton();
  listenScrollToTopButton();
};

setCurrentTheme();

window.startLegacyApp = startLegacyApp;
