;(function (d, n) {
  'use strict'

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
        versionIntoHref(buttons, 'node-%version%-linux-x64.tar.xz')
        downloadHead[text] = dlLocal + ' Linux (x64)'
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
