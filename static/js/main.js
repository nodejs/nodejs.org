/* eslint-disable no-var */
// Notice: IE 10 and below is still supported, so disable eslint for the file
// when checking the "var"
;(function () {
  const langPickerTogglerElement = document.querySelector(
    '.lang-picker-toggler'
  )
  const langPickerElement = document.querySelector('.lang-picker')
  const langElements = langPickerElement.querySelectorAll('button')
  // Get the current URL language
  const currentLang = window.location.pathname.split('/')[1] || 'en'
  let currentLangElement = null

  Array.prototype.forEach.call(langElements, function (el) {
    if (el.getAttribute('data-lang') !== currentLang) {
      el.addEventListener('click', function (e) {
        const newLocale =
          (e.target && e.target.dataset && e.target.dataset.lang) || 'en'
        window.location.assign(
          window.location.pathname.replace(/\/[a-zA-Z-]+/, '/' + newLocale)
        )
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
    const isAriaExpanded =
      langPickerTogglerElement.getAttribute('aria-expanded') === 'true'
    langPickerTogglerElement.setAttribute('aria-expanded', !isAriaExpanded)
  })
})()
;(function () {
  const scrollToTop = document.getElementById('scroll-to-top')

  ;(window.onscroll = function () {
    window.requestAnimationFrame(function () {
      scrollToTop.style.display =
        window.pageYOffset > window.innerHeight ? 'block' : 'none'
    })
  })()

  scrollToTop.addEventListener('click', function (e) {
    e.preventDefault()
    window.scrollTo(0, 0)
  })
})()
;(function () {
  const contributorCard = document.querySelector('.contributor-card')

  if (!contributorCard) {
    return
  }

  const contributorAvatar = contributorCard.querySelector('#contributor-avatar')
  const contributorUsername = contributorCard.querySelector(
    '#contributor-username'
  )
  const contributorContributions = contributorCard.querySelector(
    '#contributor-contributions'
  )
  const loadingSpinner = contributorCard.querySelector('.spinner-border')

  if (window.IntersectionObserver) {
    const observer = new window.IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio > 0.5) {
            // In viewport, fetch a random contributor
            fetchRandomContributor()

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(document.querySelector('footer'))
  } else {
    // Does not support IntersectionObserver
    fetchRandomContributor()
  }

  function fetchRandomContributor() {
    let maxContributors
    let fetchDate
    let needToRefetch = false

    if (window.localStorage) {
      maxContributors = window.localStorage.getItem('max_contributors')
      fetchDate = parseInt(window.localStorage.getItem('fetch_date'), 10)
    }

    // If fetch date is a month old (2592000000 ms === 30 days)
    if (Date.now() - fetchDate >= 2592000000) {
      needToRefetch = true
    }

    // If localStorage and data is less than 1 month old, fetch 1 time
    if (maxContributors && !needToRefetch) {
      getContributor(
        Math.floor(Math.random() * Math.floor(parseInt(maxContributors))) + 1
      )
    } else {
      getMaxContributors(function (randomPage, lastPage) {
        getContributor(randomPage)

        if (window.localStorage) {
          window.localStorage.setItem('max_contributors', lastPage)
        }
      })
    }
  }

  function getMaxContributors(callback) {
    const xhr = new window.XMLHttpRequest()
    xhr.open(
      'GET',
      'https://api.github.com/repos/nodejs/node/contributors?per_page=1',
      true
    )

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Get Headers Links last page to generate a random contributor
          const links = linkParser(xhr.getResponseHeader('Link'))
          const randomPage =
            Math.floor(
              Math.random() * Math.floor(parseInt(links.last.page, 10))
            ) + 1

          if (window.localStorage) {
            window.localStorage.setItem('fetch_date', Date.now())
          }
          callback(randomPage, links.last.page)
        } else {
          return contributorCard.parentNode.removeChild(contributorCard)
        }
      }
    }

    xhr.send()
  }

  function getContributor(randomPage) {
    const xhr = new window.XMLHttpRequest()
    xhr.open(
      'GET',
      'https://api.github.com/repos/nodejs/node/contributors?per_page=1&page=' +
        randomPage,
      true
    )

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const contributor = JSON.parse(xhr.responseText)[0]

          // Remove loading spinner and show avatar
          loadingSpinner.parentNode.removeChild(loadingSpinner)
          contributorAvatar.classList.remove('hidden')
          // Set new values
          contributorAvatar.src = contributor.avatar_url + '&s=80'
          contributorAvatar.parentElement.href = contributor.html_url
          contributorUsername.textContent = contributor.login
          contributorUsername.href = contributor.html_url
          contributorContributions.textContent =
            contributor.contributions + ' contributions'
          contributorContributions.parentElement.href =
            'https://github.com/nodejs/node/commits?author=' + contributor.login
        } else {
          return contributorCard.parentNode.removeChild(contributorCard)
        }
      }
    }

    xhr.send()
  }

  function linkParser(linkHeader) {
    const regex = /<([^?]+\?per_page=1&[a-z]+=([\d]+))>;[\s]*rel="([a-z]+)"/g
    let array = []
    const object = {}

    while ((array = regex.exec(linkHeader)) !== null) {
      object[array[3]] = {
        url: array[1],
        page: array[2]
      }
    }

    return object
  }
})()
;(function (d, n) {
  'use strict'

  const osMatch = n.platform.match(/(Win|Mac|Linux)/)
  const os = (osMatch && osMatch[1]) || ''
  const arch =
    n.userAgent.match(/x86_64|Win64|WOW64/) || n.cpuClass === 'x64'
      ? 'x64'
      : 'x86'
  const text = 'textContent' in d ? 'textContent' : 'innerText'
  const buttons = d.querySelectorAll('.home-downloadbutton')
  const downloadHead = d.getElementById('home-downloadhead')
  let dlLocal

  function versionIntoHref(nodeList, filename) {
    const linkEls = Array.prototype.slice.call(nodeList)
    let version
    let el

    for (let i = 0; i < linkEls.length; i++) {
      version = linkEls[i].getAttribute('data-version')
      el = linkEls[i]

      // Windows 64-bit files for 0.x.x need to be prefixed with 'x64/'
      if (os === 'Win' && version[1] === '0' && arch === 'x64') {
        el.href += arch + '/'
      }

      el.href += filename.replace('%version%', version)
    }
  }

  if (downloadHead && buttons) {
    dlLocal = downloadHead.getAttribute('data-dl-local')
    switch (os) {
      case 'Mac':
        versionIntoHref(buttons, 'node-%version%.pkg')
        downloadHead[text] = dlLocal + ' macOS (x64)'
        break
      case 'Win':
        versionIntoHref(buttons, 'node-%version%-' + arch + '.msi')
        downloadHead[text] = dlLocal + ' Windows (' + arch + ')'
        break
      case 'Linux':
        versionIntoHref(buttons, 'node-%version%-linux-x64.tar.xz')
        downloadHead[text] = dlLocal + ' Linux (x64)'
        break
    }
  }

  // Windows button on download page
  const winButton = d.getElementById('windows-downloadbutton')
  if (winButton && os === 'Win') {
    const winText = winButton.getElementsByTagName('p')[0]
    winButton.href = winButton.href.replace(/x(86|64)/, arch)
    winText[text] = winText[text].replace(/x(86|64)/, arch)
  }
})(document, navigator)
