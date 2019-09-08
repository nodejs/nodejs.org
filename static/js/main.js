;(function () {
  var langPickerTogglerElement = document.querySelector('.lang-picker-toggler')
  var langPickerElement = document.querySelector('.lang-picker')
  var langElements = langPickerElement.querySelectorAll('button')
  // Get the current URL language
  var currentLang = window.location.pathname.split('/')[1] || 'en'
  var currentLangElement = null

  Array.prototype.forEach.call(langElements, function (el) {
    if (el.getAttribute('data-lang') !== currentLang) {
      el.addEventListener('click', function (e) {
        var newLocale = (e.target && e.target.dataset && e.target.dataset.lang) || 'en'
        window.location.replace(window.location.pathname.replace(/\/[a-zA-Z-]+/, '/' + newLocale))
      })
    } else {
      currentLangElement = el
    }
  })

  langPickerTogglerElement.setAttribute('title', currentLangElement.textContent)

  // Remove the current selected language item, because we don't need to choose it
  // any more unless we want to switch to a new language
  langPickerElement.removeChild(currentLangElement.parentNode)

  langPickerTogglerElement.addEventListener('click', function () {
    langPickerElement.classList.toggle('hidden')

    if (langPickerTogglerElement.getAttribute('aria-expanded') === 'true') {
      langPickerTogglerElement.setAttribute('aria-expanded', 'false')
    } else {
      langPickerTogglerElement.setAttribute('aria-expanded', 'true')
    }
  })
})()

;(function () {
  var scrollToTop = document.getElementById('scroll-to-top');

  (window.onscroll = function () {
    window.requestAnimationFrame(function () {
      scrollToTop.style.display = window.pageYOffset > window.innerHeight ? 'block' : 'none'
    })
  })()

  scrollToTop.addEventListener('click', function (e) {
    e.preventDefault()
    window.scrollTo(0, 0)
  })
})()
