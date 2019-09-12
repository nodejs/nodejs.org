'use strict'

const path = require('path')

module.exports = function filterStylusPartials () {
  return (files, metalsmith, done) => {
    Object.keys(files).forEach((filename) => {
      const isPartial = (/^_.*\.styl(us)?/).test(path.basename(filename))
      if (isPartial) {
        delete files[filename]
      }
    })

    done()
  }
}
