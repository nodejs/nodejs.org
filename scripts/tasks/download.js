'use strict'

const github = require('octonode')
const request = require('request')
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

  fs.access(filePath, (err) => {
    if (!err) {
      console.log(`Weekly Update ${filePath} exists. (No SHA check, yet.)`)
      return
    }

    console.log(`Weekly Update ${filePath} does not exist. Downloading.`)
    const uri = file.download_url

    request
      .get(uri)
      .on('error', (err) => console.error(err.stack))
      .on('response', function (response) {
        if (response.statusCode !== 200) {
          this.emit('error', new Error(
            `Invalid status code (!= 200) while retrieving ${uri}: ${response.statusCode}`
          ))
          return
        }

        const ws = fs.createWriteStream(filePath)

        ws.on('error', this.emit.bind(this, 'error'))
        ws.on('finish', () => console.log(`Weekly Update ${filePath} downloaded.`))

        response.pipe(ws)
      })
  })
}

repo.contents('weekly-updates', (err, files) => {
  if (err) { throw err }
  files.forEach(checkOrFetchFile)
})
