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

const startLegacyApp = () => {
  listenLanguagePickerButton();
  listenScrollToTopButton();
};

window.startLegacyApp = startLegacyApp;
