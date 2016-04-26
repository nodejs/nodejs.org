'use strict'

const semver = require('semver')

exports.current = (releases) => {
  const match = releases.find((release) => !release.lts && semver.gte(release.version, '5.0.0'))
  return match && match.version
}

exports.lts = (releases) => releases.find((release) => release.lts).version
