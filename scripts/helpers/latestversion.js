'use strict'

const semver = require('semver')

const map = (release) => release && {
  node: release.version,
  npm: release.npm,
  v8: release.v8,
  openssl: release.openssl
}

exports.lts = (releases) => {
  const match = releases.find((release) => release.lts && semver.lte(release.version, '5.0.0'))
  return map(match)
}

exports.current = (releases) => map(releases.find((release) => release.lts))
