/* eslint-disable no-var */
// Notice: IE 10 and below is still supported, so disable eslint for the file
// when checking the "var"
(function () {
  var langPickerTogglerElement = document.querySelector('.lang-picker-toggler');
  var langPickerElement = document.querySelector('.lang-picker');
  var langElements = langPickerElement.querySelectorAll('button');
  // Get the current URL language
  var currentLang = window.location.pathname.split('/')[1] || 'en';
  var currentLangElement = null;

  Array.prototype.forEach.call(langElements, function (el) {
    if (el.getAttribute('data-lang') !== currentLang) {
      el.addEventListener('click', function (e) {
        var newLocale =
          (e.target && e.target.dataset && e.target.dataset.lang) || 'en';
        window.location.assign(
          window.location.pathname.replace(/\/[a-zA-Z-]+/, '/' + newLocale)
        );
      });
    } else {
      currentLangElement = el;
    }
  });

  if (currentLangElement) {
    langPickerTogglerElement.setAttribute(
      'title',
      currentLangElement.textContent
    );

    // Remove the current selected language item, because we don't need to choose it
    // any more unless we want to switch to a new language
    langPickerElement.removeChild(currentLangElement.parentNode);
  }

  const toggleFunction = function () {
    langPickerElement.classList.toggle('hidden');
    const isAriaExpanded =
      langPickerTogglerElement.getAttribute('aria-expanded') === 'true';
    langPickerTogglerElement.setAttribute('aria-expanded', !isAriaExpanded);
  };

  langPickerTogglerElement.addEventListener('click', function () {
    toggleFunction();
  });

  document.body.addEventListener('click', function (event) {
    if (
      !langPickerElement.classList.contains('hidden') &&
      !langPickerTogglerElement.contains(event.target)
    ) {
      toggleFunction();
    }
  });
})();
(function () {
  const themeAttr = 'data-theme';
  var darkThemeSwitcherElement = document.querySelector('.dark-theme-switcher');

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

  darkThemeSwitcherElement.addEventListener('click', function () {
    var currentTheme = getTheme() ?? preferredColorScheme;
    if (currentTheme === 'light') {
      setTheme('dark');
    } else if (currentTheme === 'dark') {
      setTheme('light');
    }
  });

  function setTheme(theme) {
    document.querySelector('html').setAttribute(themeAttr, theme);
    window.localStorage.setItem('theme', theme);
  }

  function getTheme() {
    return window.localStorage.getItem('theme');
  }
})();
(function () {
  var scrollToTop = document.querySelector('#scroll-to-top');

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
})();

(function () {
  'use strict';
  var userAgent = navigator.userAgent;
  var osMatch = userAgent.match(/(Win|Mac|Linux)/);
  var os = (osMatch && osMatch[1]) || '';
  var arch =
    userAgent.match(/x86_64|Win64|WOW64/) || navigator.cpuClass === 'x64'
      ? 'x64'
      : 'x86';
  var buttons = document.querySelectorAll('.home-downloadbutton');
  var downloadHead = document.querySelector('#home-downloadhead');
  var dlLocal;

  function versionIntoHref(nodeList, filename) {
    var linkEls = Array.prototype.slice.call(nodeList);
    var version;
    var el;

    for (var i = 0; i < linkEls.length; i++) {
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
        downloadHead.textContent = dlLocal + ' macOS (x64)';
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
  var winButton = document.querySelector('#windows-downloadbutton');
  if (winButton && os === 'Win') {
    var winText = winButton.querySelector('p');
    winButton.href = winButton.href.replace(/x(86|64)/, arch);
    winText.textContent = winText.textContent.replace(/x(86|64)/, arch);
  }
})();
(function () {
  // This function is used to replace the anchor
  // link of Edit on GitHub

  var editOnGitHubElement = document.getElementById('editOnGitHubLink');
  var editOnGitHubUrlElement = document.getElementById('editOnGitHubUrl');

  if (editOnGitHubUrlElement) {
    editOnGitHubElement.setAttribute('href', editOnGitHubUrlElement.value);
  } else {
    editOnGitHubElement.parentNode.parentNode.removeChild(
      editOnGitHubElement.parentNode
    );
  }
})();
