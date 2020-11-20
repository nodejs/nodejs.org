'use strict'

const Util = require('util')

module.exports = function debug() {
  return (files, metalsmith, done) => {
    console.log('\n\n')
    console.log(
      Util.inspect(metalsmith.metadata(), { showHidden: false, depth: null })
    )
    console.log(Util.inspect(files, { showHidden: false, depth: null }))
    console.log('\n\n')
    done()
  }
}
