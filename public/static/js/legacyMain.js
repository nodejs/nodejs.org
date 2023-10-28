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
  listenScrollToTopButton();
};

window.startLegacyApp = startLegacyApp;
