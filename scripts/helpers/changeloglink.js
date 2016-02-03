'use strict'

const semver = require('semver')

module.exports = function (version) {
  if (!version) { return '' }

  if (semver.satisfies(version, '>= 1.0.0')) {
    return `https://github.com/nodejs/node/blob/${version}/CHANGELOG.md`
  }

  // 0.12.8+ and 0.10.41+ releases come from the new repo
  if (semver.satisfies(version, '~0.12.8 || ~0.10.41')) {
    return `https://github.com/nodejs/node/blob/${version}/ChangeLog`
  }

  return `https://github.com/nodejs/node-v0.x-archive/blob/${version}/ChangeLog`
}
