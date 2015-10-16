#!/usr/bin/env node

'use strict'

const fs = require('fs')
const semver = require('semver')
const map = require('map-async')
const https = require('https')

function loadVersions (callback) {
  map(
    [ 'https://nodejs.org/dist/index.json', 'https://iojs.org/dist/index.json' ],
    download,
    function (err, versions) {
      if (err) { return callback(err) }
      versions = munge(versions)
      callback(null, versions)
    }
  )
}

function download (url, cb) {
  let data = ''
  https.get(url, function (res) {
    res.on('data', function (chunk) { data += chunk })
    res.on('end', function () {
      try {
        cb(null, JSON.parse(data))
      } catch (e) {
        return cb(e)
      }
    })
  }).on('error', function (e) {
    console.error('Error downloading file from %s: %s', url, e.message)
    cb(e)
  })
}

function munge (versions) {
  versions[0].forEach(function (v) {
    v.url = 'https://nodejs.org/dist/' + v.version + '/'
    v.name = 'Node.js'
  })
  versions[1].forEach(function (v) {
    v.url = 'https://iojs.org/dist/' + v.version + '/'
    v.name = 'io.js'
  })

  let allVersions = versions[0].concat(versions[1])

  allVersions.sort(function (a, b) {
    return semver.compare(b.version, a.version)
  })

  return allVersions
}

module.exports = loadVersions

if (require.main === module) {
  loadVersions(function (err, versions) {
    if (err) {
      console.error('Aborting due to download error from node or iojs')
      console.error(err.stack)
      return process.exit(1)
    }

    fs.writeFileSync(__dirname + '/../source/versions.json', JSON.stringify(versions, null, 2))
  })
}
