'use strict'

const github = require('octonode')
const https = require('https')
const path = require('path')
const fs = require('fs')

const basePath = path.join(__dirname, '..', '..', 'locale', 'en', 'blog', 'weekly-updates')
const repo = github.client().repo('nodejs/evangelism')

/* Currently proof-of-concept work. Outstanding:
 * ================
 * - [ ] gulpify
 * - [ ] add to local boot process or trigger at key times
 * - [ ] support other content patterns (meeting notes, release notes, etc.)
 * - [ ] support similar patterns for other locales
 * - [ ] prepend predictable markdown metadata on download
 */

function checkOrFetchFile (file) {
  const filePath = path.join(basePath, file.name)

  fs.access(filePath, function (err) {
    if (!err) {
      console.log(`Weekly Update ${filePath} exists. (No SHA check, yet.)`)
      return
    }

    console.log(`Weekly Update ${filePath} does not exist. Downloading.`)

    https.get(file.download_url, function (response) {
      console.log(`Weekly Update ${filePath} downloaded.`)

      const ws = fs.createWriteStream(filePath)
      ws.on('error', function (err) {
        console.error(err.stack)
      })
      response.pipe(ws)
    }).on('error', function (err) {
      console.error(err.stack)
    })
  })
}

repo.contents('weekly-updates', function (err, files) {
  if (err) { throw err }
  files.forEach(checkOrFetchFile)
})
