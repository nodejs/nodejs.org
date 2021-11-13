#!/usr/bin/env node

'use strict'

const fs = require('fs')
const nodeVersionData = require('node-version-data')
const path = require('path')

module.exports = nodeVersionData

if (require.main === module) {
  nodeVersionData((err, versions) => {
    if (err) {
      console.error('Aborting due to download error from node or iojs')
      console.error(err.stack)
      return process.exit(1)
    }

    fs.writeFileSync(
      path.join(__dirname, '..', 'source', 'versions.json'),
      JSON.stringify(versions, null, 2)
    )
  })
}
