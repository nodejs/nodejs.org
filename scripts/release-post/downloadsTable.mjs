'use strict';

import semVer from 'semver';

const downloadOptions = [
  {
    title: 'Windows 32-bit Installer',
    templateUrl: 'https://nodejs.org/dist/v%version%/node-v%version%-x86.msi',
  },
  {
    title: 'Windows 64-bit Installer',
    templateUrl: 'https://nodejs.org/dist/v%version%/node-v%version%-x64.msi',
  },
  {
    title: 'Windows ARM 64-bit Installer',
    templateUrl: 'https://nodejs.org/dist/v%version%/node-v%version%-arm64.msi',
  },
  {
    title: 'Windows 32-bit Binary',
    templateUrl: 'https://nodejs.org/dist/v%version%/win-x86/node.exe',
  },
  {
    title: 'Windows 64-bit Binary',
    templateUrl: 'https://nodejs.org/dist/v%version%/win-x64/node.exe',
  },
  {
    title: 'Windows ARM 64-bit Binary',
    templateUrl: 'https://nodejs.org/dist/v%version%/win-arm64/node.exe',
  },
  {
    title: 'macOS 64-bit Installer',
    templateUrl: 'https://nodejs.org/dist/v%version%/node-v%version%.pkg',
  },
  {
    title: 'macOS Apple Silicon 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-darwin-arm64.tar.gz',
  },
  {
    title: 'macOS Intel 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-darwin-x64.tar.gz',
  },
  {
    title: 'Linux 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-x64.tar.xz',
  },
  {
    title: 'Linux PPC LE 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-ppc64le.tar.xz',
  },
  {
    title: 'Linux s390x 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-s390x.tar.xz',
  },
  {
    title: 'AIX 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-aix-ppc64.tar.gz',
  },
  {
    title: 'ARMv7 32-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-armv7l.tar.xz',
  },
  {
    title: 'ARMv8 64-bit Binary',
    templateUrl:
      'https://nodejs.org/dist/v%version%/node-v%version%-linux-arm64.tar.xz',
  },
  {
    title: 'Source Code',
    templateUrl: 'https://nodejs.org/dist/v%version%/node-v%version%.tar.gz',
  },
];

const resolveUrl = (item, version) => {
  const url = item.templateUrl.replace(/%version%/g, version);
  return Object.assign({ url }, item);
};

const resolveDownloads = version => {
  let downloads = downloadOptions;

  if (semVer.satisfies(version, '< 16.0.0')) {
    downloads = downloads.filter(
      ver => ver.title !== 'macOS Apple Silicon 64-bit Binary'
    );
  }

  if (semVer.satisfies(version, '< 19.9.0')) {
    downloads = downloads.filter(
      ver =>
        ver.title !== 'Windows ARM 64-bit Installer' &&
        ver.title !== 'Windows ARM 64-bit Binary'
    );
  }

  return downloads;
};

export const downloadsTable = version =>
  resolveDownloads(version).map(item => resolveUrl(item, version));
