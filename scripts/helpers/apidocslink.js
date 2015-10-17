'use strict'

const semver = require('semver')

module.exports = function (version) {
  if (!version) { return '' }

  return semver.satisfies(version, '>=1.0.0 <4.0.0')
    ? `https://iojs.org/dist/${version}/docs/api/`
    : `https://nodejs.org/dist/${version}/docs/api/`
}
