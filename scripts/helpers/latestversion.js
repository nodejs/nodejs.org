'use strict'

const semver = require('semver')

exports.stable = (versions) => {
  const matched = versions.find((version) => typeof version.lts === 'undefined').version
  return semver.gte(matched, '5.0.0') ? matched : undefined
}

exports.lts = (versions) => versions.find((version) => typeof version.lts !== 'undefined').version
