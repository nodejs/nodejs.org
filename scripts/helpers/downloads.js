'use strict'

const semver = require('semver')

const allDownloads = [
  {
    title: 'Windows 32-bit Installer',
    templateUrl: 'https://nodejs.org/dist/v%version%/node-v%version%-x86.msi'
  },
  {
    title: 'Windows 64-bit Installer',
    templateUrl: 'https://nodejs.org/dist/v%version%/node-v%version%-x64.msi'
  },
  {
    title: 'Windows 32-bit Binary',
    templateUrl: 'https://nodejs.org/dist/v%version%/win-x86/node.exe'
  },
  {
    title: 'Windows 64-bit Binary',
    templateUrl: 'https://nodejs.org/dist/v%version%/win-x64/node.exe'
  },
  {
    title: 'macOS 64-bit Installer',
    templateUrl: 'https://nodejs.org/dist/v%version%/node-v%version%.pkg'
  },
  {
    title: 'macOS 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-darwin-x64.tar.gz'
  },
  {
    title: 'Linux 32-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-x86.tar.xz'
  },
  {
    title: 'Linux 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-x64.tar.xz'
  },
  {
    title: 'Linux PPC LE 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-ppc64le.tar.xz'
  },
  {
    title: 'Linux PPC BE 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-ppc64.tar.xz'
  },
  {
    title: 'Linux s390x 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-s390x.tar.xz'
  },
  {
    title: 'AIX 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-aix-ppc64.tar.gz'
  },
  {
    title: 'SmartOS 32-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-sunos-x86.tar.xz'
  },
  {
    title: 'SmartOS 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-sunos-x64.tar.xz'
  },
  {
    title: 'ARMv6 32-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-armv6l.tar.xz'
  },
  {
    title: 'ARMv7 32-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-armv7l.tar.xz'
  },
  {
    title: 'ARMv8 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-arm64.tar.xz'
  },
  {
    title: 'Source Code',
    templateUrl: 'https://nodejs.org/dist/v%version%/node-v%version%.tar.gz'
  }
]

// v0.x of Node.js
const legacyDownloads = [
  {
    title: 'Windows 32-bit Installer',
    templateUrl: 'https://nodejs.org/dist/v%version%/node-v%version%-x86.msi'
  },
  {
    title: 'Windows 64-bit Installer',
    templateUrl:
      'https://nodejs.org/dist/v%version%/x64/node-v%version%-x64.msi'
  },
  {
    title: 'Windows 32-bit Binary',
    templateUrl: 'https://nodejs.org/dist/v%version%/node.exe'
  },
  {
    title: 'Windows 64-bit Binary',
    templateUrl: 'https://nodejs.org/dist/v%version%/x64/node.exe'
  },
  {
    title: 'macOS Universal Installer',
    templateUrl: 'https://nodejs.org/dist/v%version%/node-v%version%.pkg'
  },
  {
    title: 'macOS 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-darwin-x64.tar.gz'
  },
  {
    title: 'macOS 32-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-darwin-x86.tar.gz'
  },
  {
    title: 'Linux 32-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-x86.tar.gz'
  },
  {
    title: 'Linux 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-x64.tar.gz'
  },
  {
    title: 'SmartOS 32-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-sunos-x86.tar.gz'
  },
  {
    title: 'SmartOS 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-sunos-x64.tar.gz'
  },
  {
    title: 'Source Code',
    templateUrl: 'https://nodejs.org/dist/v%version%/node-v%version%.tar.gz'
  }
]

const resolveUrl = (item, version) => {
  const url = item.templateUrl.replace(/%version%/g, version)
  return Object.assign({ url }, item)
}

const resolveDownloads = (version) => {
  let downloads = allDownloads

  if (semver.satisfies(version, '< 1.0.0')) {
    return legacyDownloads
  }

  if (semver.satisfies(version, '>= 8.0.0')) {
    downloads = downloads.filter(
      (ver) => ver.title !== 'Linux PPC BE 64-bit Binary'
    )
  }

  if (semver.satisfies(version, '>= 10.0.0')) {
    downloads = downloads.filter(
      (ver) =>
        ver.title !== 'Linux 32-bit Binary' &&
        ver.title !== 'SmartOS 32-bit Binary'
    )
  }

  if (semver.satisfies(version, '>= 12.0.0')) {
    downloads = downloads.filter((ver) => ver.title !== 'ARMv6 32-bit Binary')
  }

  if (semver.satisfies(version, '>= 14.0.0')) {
    downloads = downloads.filter((ver) => ver.title !== 'SmartOS 64-bit Binary')
  }

  return downloads
}

module.exports = (version) =>
  resolveDownloads(version).map((item) => resolveUrl(item, version))
