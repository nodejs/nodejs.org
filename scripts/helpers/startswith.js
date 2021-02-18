'use strict'

module.exports = function (v1, v2, options) {
  return v1 && v1.indexOf(v2) === 0 ? options.fn(this) : options.inverse(this)
}
