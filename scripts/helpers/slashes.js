'use strict'

module.exports = function (str) {
  return process.platform === 'win32' && str.replace(/\\/g, '/')
}
