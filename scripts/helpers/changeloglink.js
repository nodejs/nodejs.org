'use strict'

const semver = require('semver')

module.exports = function (version) {
  if (!version) { return '' }

  if (semver.satisfies(version, '>= 1.0.0'))
    return `https://github.com/nodejs/node/blob/${version}/CHANGELOG.md`

  return `https://github.com/nodejs/node-v0.x-archive/blob/${version}/ChangeLog`
}
