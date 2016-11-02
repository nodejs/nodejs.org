;
(function (d, n) {
  'use strict'

  // document.querySelectorAll polyfill for ancient IEs
  // https://gist.github.com/chrisjlee/8960575
  if (!document.querySelectorAll) {
    document.querySelectorAll = function (selectors) {
      var style = document.createElement('style')
      var elements = []
      var element

      document.documentElement.firstChild.appendChild(style)
      document._qsa = []

      style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}'
      window.scrollBy(0, 0)
      style.parentNode.removeChild(style)

      while (document._qsa.length) {
        element = document._qsa.shift()
        element.style.removeAttribute('x-qsa')
        elements.push(element)
      }
      document._qsa = null
      return elements
    }
  }

  var osMatch = n.platform.match(/(Win|Mac|Linux)/)
  var os = (osMatch && osMatch[1]) || ''
  var arch = n.userAgent.match(/x86_64|Win64|WOW64/) ||
    n.cpuClass === 'x64' ? 'x64' : 'x86'
  var text = 'textContent' in d ? 'textContent' : 'innerText'
  var buttons = d.querySelectorAll('.home-downloadbutton')
  var downloadHead = d.getElementById('home-downloadhead')
  var dlLocal

  function versionIntoHref (nodeList, filename) {
    var linkEls = Array.prototype.slice.call(nodeList)
    var version
    var el

    for (var i = 0; i < linkEls.length; i++) {
      version = linkEls[i].getAttribute('data-version')
      el = linkEls[i]

      // Windows 64-bit files for 0.x.x need to be prefixed with 'x64/'
      if (os === 'Win' && (version[1] === '0' && arch === 'x64')) {
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
        versionIntoHref(buttons, 'node-%version%-linux-' + arch + '.tar.xz')
        downloadHead[text] = dlLocal + ' Linux (' + arch + ')'
        break
    }
  }

  // Windows button on download page
  var winButton = d.getElementById('windows-downloadbutton')
  if (winButton && os === 'Win') {
    var winText = winButton.getElementsByTagName('p')[0]
    winButton.href = winButton.href.replace(/x(86|64)/, arch)
    winText[text] = winText[text].replace(/x(86|64)/, arch)
  }
})(document, navigator)
