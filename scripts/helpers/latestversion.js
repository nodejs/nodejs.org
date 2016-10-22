'use strict'

const semver = require('semver')

const map = (release) => release && {
  node: release.version,
  npm: release.npm,
  v8: release.v8,
  openssl: release.openssl
}

exports.current = (releases) => {
  const match = releases.find((release) => !release.lts && semver.gte(release.version, '5.0.0'))
  return map(match)
}

exports.lts = (releases) => map(releases.find((release) => release.lts))
