#!/usr/bin/env node

'use strict'

const fs = require('fs').promises
const path = require('path')
const linkinator = require('linkinator')

const runLinkinator = (locale) => new Promise((resolve, reject) => {
  linkinator.check({
    path: `http://localhost:8080/${locale}/`,
    // port: 8080,
    recurse: true,
    linksToSkip: [
      /^(?!http:\/\/localhost)/
    ]
  }).then((result) => resolve(result))
    .catch((error) => reject(error))
})

const main = async () => {
  try {
    const dirs = await fs.readdir(path.join(__dirname, '../locale/'))
    const result = await Promise.all(dirs.map(dir => runLinkinator(dir)))

    console.log(`Scanned a total of ${result.map((res) => res.links.length)} links!`)
    console.log(`Passed: ${result.map((res) => res.passed)}`)
  } catch (error) {
    console.log('ERROR:', error)
  }
}

main()
