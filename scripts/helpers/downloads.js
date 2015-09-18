const extend = require('util')._extend

const downloads = [
  {
    'title': 'Windows 32-bit Installer',
    'templateUrl': 'https://nodejs.org/dist/v%version%/node-v%version%-x86.msi'
  },
  {
    'title': 'Windows 64-bit Installer',
    'templateUrl': 'https://nodejs.org/dist/v%version%/node-v%version%-x64.msi'
  },
  {
    'title': 'Windows 32-bit Binary',
    'templateUrl': 'https://nodejs.org/dist/v%version%/win-x86/node.exe'
  },
  {
    'title': 'Windows 64-bit Binary',
    'templateUrl': 'https://nodejs.org/dist/v%version%/win-x64/node.exe'
  },
  {
    'title': 'Mac OS X 64-bit Installer',
    'templateUrl': 'https://nodejs.org/dist/v%version%/node-v%version%.pkg'
  },
  {
    'title': 'Mac OS X 64-bit Binary',
    'templateUrl': 'https://nodejs.org/dist/v%version%/node-v%version%-darwin-x64.tar.gz'
  },
  {
    'title': 'Linux 32-bit Binary',
    'templateUrl': 'https://nodejs.org/dist/v%version%/node-v%version%-linux-x86.tar.gz'
  },
  {
    'title': 'Linux 64-bit Binary',
    'templateUrl': 'https://nodejs.org/dist/v%version%/node-v%version%-linux-x64.tar.gz'
  },
  {
    'title': 'SunOS 32-bit Binary',
    'templateUrl': 'https://nodejs.org/dist/v%version%/node-v%version%-sunos-x86.tar.gz'
  },
  {
    'title': 'SunOS 64-bit Binary',
    'templateUrl': 'https://nodejs.org/dist/v%version%/node-v%version%-sunos-x64.tar.gz'
  },
  {
    'title': 'ARMv6 32-bit Binary',
    'templateUrl': 'https://nodejs.org/dist/v%version%/node-v%version%-linux-armv6l.tar.gz'
  },
  {
    'title': 'ARMv7 32-bit Binary',
    'templateUrl': 'https://nodejs.org/dist/v%version%/node-v%version%-linux-armv7l.tar.gz'
  },
  {
    'title': 'ARMv8 64-bit Binary',
    'templateUrl': 'https://nodejs.org/dist/v%version%/node-v%version%-linux-arm64.tar.gz'
  },
  {
    'title': 'Source Code',
    'templateUrl': 'https://nodejs.org/dist/v%version%/node-v%version%.tar.gz'
  }
]

function resolveUrl (item, version) {
  const url = item.templateUrl.replace(/%version%/g, version)
  return extend({url}, item)
}

module.exports = (version) => {
  return downloads.map((item) => resolveUrl(item, version))
}
