'use strict'

const semver = require('semver')

module.exports = (version) => {
  if (!version) {
    return ''
  }

  if (semver.satisfies(version, '>=0.3.1 <0.5.1')) {
    return `https://nodejs.org/docs/${version}/api/`
  }

  if (semver.satisfies(version, '>=0.1.14 <0.3.1')) {
    return `https://nodejs.org/docs/${version}/api.html`
  }

  return semver.satisfies(version, '>=1.0.0 <4.0.0')
    ? `https://iojs.org/dist/${version}/docs/api/`
    : `https://nodejs.org/dist/${version}/docs/api/`
}
