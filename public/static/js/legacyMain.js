const startLegacyApp = () => {
  const langPickerTogglerElement = document.querySelector(
    '.lang-picker-toggler'
  );

  const langPickerElement = document.querySelector('.lang-picker');

  if (langPickerElement) {
    const toggleFunction = function () {
      langPickerElement.classList.toggle('hidden');

      const isAriaExpanded =
        langPickerTogglerElement.getAttribute('aria-expanded') === 'true';

      langPickerTogglerElement.setAttribute('aria-expanded', !isAriaExpanded);
    };

    langPickerTogglerElement.addEventListener('click', toggleFunction);
  }

  const themeAttr = 'data-theme';
  const darkThemeSwitcherElement = document.querySelector(
    '.dark-theme-switcher'
  );

  let preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light';

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', function (event) {
      if (!getTheme()) {
        preferredColorScheme = event.matches ? 'dark' : 'light';
        document
          .querySelector('html')
          .setAttribute(themeAttr, preferredColorScheme);
      }
    });

  if (darkThemeSwitcherElement) {
    darkThemeSwitcherElement.addEventListener('click', function () {
      const currentTheme = getTheme() ?? preferredColorScheme;
      if (currentTheme === 'light') {
        setTheme('dark');
      } else if (currentTheme === 'dark') {
        setTheme('light');
      }
    });
  }

  function setTheme(theme) {
    document.querySelector('html').setAttribute(themeAttr, theme);
    window.localStorage.setItem('theme', theme);
  }

  function getTheme() {
    return window.localStorage.getItem('theme');
  }

  const scrollToTop = document.querySelector('#scroll-to-top');

  if (scrollToTop) {
    (window.onscroll = function () {
      window.requestAnimationFrame(function () {
        scrollToTop.style.display =
          window.pageYOffset > window.innerHeight ? 'block' : 'none';
      });
    })();

    scrollToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo(0, 0);
    });
  }

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

  function versionIntoHref(nodeList, filename) {
    const linkEls = Array.prototype.slice.call(nodeList);
    let version;
    let el;

    for (let i = 0; i < linkEls.length; i++) {
      version = linkEls[i].getAttribute('data-version');
      el = linkEls[i];
      el.href += filename.replace('%version%', version);
    }
  }

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

window.startLegacyApp = startLegacyApp;
