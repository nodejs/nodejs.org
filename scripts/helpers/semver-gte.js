'use strict'

const semver = require('semver')

module.exports = function (a, b, options) {
  if (arguments.length === 2) {
    options = b
    b = options.hash.compare
  }
  return semver.gte(a, b) ? options.fn(this) : options.inverse(this)
}
