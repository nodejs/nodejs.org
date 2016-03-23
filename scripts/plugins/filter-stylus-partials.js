'use strict'

const Path = require('path')

module.exports = function filterStylusPartials () {
  return (files, metalsmith, done) => {
    Object.keys(files).forEach((filename) => {
      const isPartial = (/^_.*\.styl(us)?/).test(Path.basename(filename))
      if (isPartial) {
        delete files[filename]
      }
    })

    done()
  }
}
