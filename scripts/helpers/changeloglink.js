'use strict'

const semver = require('semver')

module.exports = function (version) {
  if (!version) { return '' }

  const legacyLink = semver.satisfies(version, '>=1.0.0 <4.0.0')
    ? `https://github.com/nodejs/node/blob/${version}/CHANGELOG.md`
    : `https://github.com/nodejs/node-v0.x-archive/blob/${version}/ChangeLog`

  return semver.gte(version, '4.0.0')
    ? `https://github.com/nodejs/node/blob/${version}/CHANGELOG.md`
    : legacyLink
}
