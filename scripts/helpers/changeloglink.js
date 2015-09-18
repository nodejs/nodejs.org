'use strict'

const semver = require('semver')

module.exports = function (version) {
  if (!version) { return '' }

  return semver.gte(version, '1.0.0')
    ? `https://github.com/nodejs/io.js/blob/${version}/CHANGELOG.md`
    : `https://github.com/joyent/node/blob/${version}/ChangeLog`
}
