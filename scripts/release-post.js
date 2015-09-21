#!/usr/bin/env node

/**
 * What's this?? It will help you create release blog
 * posts so you wont have to do the tedious work
 * of stitching together data from changelog, shasums etc,
 * but get a more or less complete release blog ready to go.
 *
 * Usage: $ node release-post.js [version]
 *
 * If the version argument is omitted, the latest version number
 * will be picked from https://nodejs.org/dist/index.json.
 *
 * It'll create a file with the blog post content
 * into ../locale/en/blog/release/vX.md ready for you to commit
 * or possibly edit by hand before commiting.
 *
 * Happy releasing!
 */

'use strict'

const https = require('https')
const fs = require('fs')
const path = require('path')
const extend = require('util')._extend
const Handlebars = require('handlebars')

function download (url, cb) {
  return new Promise(function (resolve, reject) {
    let data = ''
    https.get(url, function (res) {
      if (res.statusCode !== 200) {
        return reject(new Error('Invalid status code (!= 200) while retrieving ' + url + ': ' + res.statusCode))
      }

      res.on('data', function (chunk) { data += chunk })
      res.on('end', function () { resolve(data) })
    }).on('error', function (err) {
      reject(new Error('Error downloading file from %s: %s', url, err.message))
    })
  })
}

// matches a complete release section, support both old node and iojs releases:
// ## 2015-07-09, Version 0.12.7 (Stable)
// ## 2015-08-04, Version 3.0.0, @rvagg
const rxReleaseSection = /## \d{4}-\d{2}-\d{2}, Version ([^,( ]+)[\s\S]*?(?=## \d{4})/g

function explicitVersion () {
  const versionArg = process.argv[2]
  return versionArg ? Promise.resolve(versionArg) : Promise.reject()
}

function findLatestVersion (cb) {
  return download('https://nodejs.org/dist/index.json')
    .then(JSON.parse)
    .then(function (versions) {
      return versions[0].version.substr(1)
    })
}

function fetchDocs (version) {
  return Promise.all([ fetchChangelog(version), fetchShasums(version) ]).then(function (results) {
    const changelog = results[0]
    const shasums = results[1]

    return {
      version,
      changelog,
      shasums
    }
  })
}

function fetchChangelog (version) {
  return download(`https://raw.githubusercontent.com/nodejs/node/v${version}/CHANGELOG.md`)
    .then(function (data) {
      let matches

      /* eslint-disable no-cond-assign */
      while (matches = rxReleaseSection.exec(data)) {
        const releaseVersion = matches[1]
        if (releaseVersion === version) {
          return matches[0]
        }
      }
      /* eslint-enable no-cond-assign */

      return Promise.reject(new Error('Couldnt find matching changelog for ' + version))
    })
}

function fetchShasums (version) {
  return download(`https://nodejs.org/dist/v${version}/SHASUMS256.txt.asc`)
    .then(null, () => '[INSERT SHASUMS HERE]')
}

function renderPost (results) {
  const templateStr = fs.readFileSync(path.resolve(__dirname, 'release.hbs')).toString('utf8')
  const template = Handlebars.compile(templateStr, { noEscape: true })
  const view = extend({
    date: new Date().toISOString(),
    versionSlug: slugify(results.version)
  }, results)

  return extend({
    content: template(view)
  }, results)
}

function writeToFile (results) {
  const filepath = path.resolve(__dirname, '..', 'locale', 'en', 'blog', 'release', `v${results.version}.md`)

  if (fs.existsSync(filepath)) {
    return Promise.reject(new Error(`Release post for ${results.version} already exists!`))
  }

  fs.writeFileSync(filepath, results.content)
  return Promise.resolve(filepath)
}

function slugify (str) {
  return str.replace(/\./g, '-')
}

explicitVersion()
  .then(null, findLatestVersion)
  .then(fetchDocs)
  .then(renderPost)
  .then(writeToFile)
  .then(function (filepath) {
    console.log('Release post created:', filepath)
  }, function (err) {
    console.error('Some error occured here!', err.stack)
    process.exit(1)
  })
