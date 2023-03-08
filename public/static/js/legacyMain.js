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

const detectEnviromentAndSetDownloadOptions = () => {
  const userAgent = navigator.userAgent;
  const osMatch = userAgent.match(/(Win|Mac|Linux)/);

  const os = (osMatch && osMatch[1]) || '';

  const arch =
    userAgent.match(/x86_64|Win64|WOW64/) || navigator.cpuClass === 'x64'
      ? 'x64'
      : 'x86';

  const buttons = document.querySelectorAll('.home-downloadbutton');
  const downloadHead = document.querySelector('#home-downloadhead');

  let dlLocal;

  if (downloadHead && buttons) {
    dlLocal = downloadHead.getAttribute('data-dl-local');

    switch (os) {
      case 'Mac':
        versionIntoHref(buttons, 'node-%version%.pkg');
        downloadHead.textContent = dlLocal + ' macOS';
        break;
      case 'Win':
        versionIntoHref(buttons, 'node-%version%-' + arch + '.msi');
        downloadHead.textContent = dlLocal + ' Windows (' + arch + ')';
        break;
      case 'Linux':
        versionIntoHref(buttons, 'node-%version%-linux-x64.tar.xz');
        downloadHead.textContent = dlLocal + ' Linux (x64)';
        break;
    }
  }

  // Windows button on download page
  const winButton = document.querySelector('#windows-downloadbutton');

  if (winButton && os === 'Win') {
    const winText = winButton.querySelector('p');

    winButton.href = winButton.href.replace(/x(86|64)/, arch);
    winText.textContent = winText.textContent.replace(/x(86|64)/, arch);
  }
};

const setCurrentTheme = () =>
  setTheme(getTheme() || (preferredColorScheme.matches ? 'dark' : 'light'));

const startLegacyApp = () => {
  setCurrentTheme();

  watchThemeChanges();

  listenLanguagePickerButton();
  listenThemeToggleButton();
  listenScrollToTopButton();

  detectEnviromentAndSetDownloadOptions();
};

setCurrentTheme();

window.startLegacyApp = startLegacyApp;
