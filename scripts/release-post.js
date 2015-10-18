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
const url = require('url')

const downloads = require('./helpers/downloads')

function request (uri, method, cb) {
  return new Promise(function (resolve, reject) {
    // user-agent is required when by api.github.com
    const opts = extend({
      method,
      headers: {
        'user-agent': 'nodejs.org release blog post script'
      }
    }, url.parse(uri))

    let data = ''

    https.request(opts, function (res) {
      if (res.statusCode !== 200) {
        return reject(new Error(`Invalid status code (!= 200) while retrieving ${uri}: ${res.statusCode}`))
      }

      res.on('data', function (chunk) { data += chunk })
      res.on('end', function () { resolve(data) })
    }).on('error', function (err) {
      reject(new Error(`Error requesting URL ${uri}: ${err.message}`))
    }).end()
  })
}

function download (url) {
  return request(url, 'GET')
}

function explicitVersion (version) {
  return version ? Promise.resolve(version) : Promise.reject()
}

function findLatestVersion (cb) {
  return download('https://nodejs.org/dist/index.json')
    .then(JSON.parse)
    .then(function (versions) {
      return versions[0].version.substr(1)
    })
}

function fetchDocs (version) {
  return Promise.all([
    fetchChangelogBody(version),
    fetchAuthor(version),
    fetchVersionPolicy(version),
    fetchShasums(version),
    verifyDownloads(version)
  ]).then(function (results) {
    const changelog = results[0]
    const author = results[1]
    const versionPolicy = results[2]
    const shasums = results[3]
    const files = results[4]

    return {
      version,
      changelog,
      author,
      versionPolicy,
      shasums,
      files
    }
  })
}

function fetchAuthor (version) {
  return fetchChangelog(version)
    .then((section) => findAuthorLogin(version, section))
    .then((author) => download(`https://api.github.com/users/${author}`))
    .then(JSON.parse)
    .then((githubRes) => githubRes.name)
}

function fetchChangelog (version) {
  // matches a complete release section,
  // support release sections with headers like:
  // ## 2015-09-22, Version 4.1.1 (Stable), @rvagg
  // ## 2015-10-07, Version 4.2.0 'Argon' (LTS), @jasnell
  const rxSection = new RegExp(`## \\d{4}-\\d{2}-\\d{2}, Version ${version} ('\\w+' )?\\([^\\)]+\\)[\\s\\S]*?(?=## \\d{4})`)

  return download(`https://raw.githubusercontent.com/nodejs/node/v${version}/CHANGELOG.md`)
    .then((data) => {
      const matches = rxSection.exec(data)
      return matches ? matches[0] : Promise.reject(new Error(`Couldnt find matching changelog for ${version}`))
    })
}

function fetchChangelogBody (version) {
  const rxSectionBody = /### Notable changes[\s\S]*/g

  return fetchChangelog(version)
    .then(function (section) {
      const bodyMatch = rxSectionBody.exec(section)
      return bodyMatch
        ? bodyMatch[0]
        : Promise.reject(new Error(`Could not find changelog body of ${version} release`))
    })
}

function fetchVersionPolicy (version) {
  // matches the policy for a given version (Stable, LTS etc) in the changelog
  const rxPolicy = new RegExp(`^## \\d{4}-\\d{2}-\\d{2}, Version [^(].*\\(([^\\)]+)\\)`)

  return fetchChangelog(version)
    .then(function (section) {
      const matches = rxPolicy.exec(section)
      return matches
        ? matches[1]
        : Promise.reject(new Error(`Could not find version policy of ${version} in its changelog`))
    })
}

function fetchShasums (version) {
  return download(`https://nodejs.org/dist/v${version}/SHASUMS256.txt.asc`)
    .then(null, () => '[INSERT SHASUMS HERE]')
}

function verifyDownloads (version) {
  const allDownloads = downloads(version)
  const reqs = allDownloads.map(urlOrComingSoon)
  return Promise.all(reqs)
}

function findAuthorLogin (version, section) {
  const rxReleaseAuthor = /^## .*? \([^\)]+\), @(\S+)/g
  const matches = rxReleaseAuthor.exec(section)
  return matches ? matches[1] : Promise.reject(new Error(`Couldnt find @author of ${version} release :(`))
}

function urlOrComingSoon (binary) {
  return request(binary.url, 'HEAD').then(
    () => `${binary.title}: ${binary.url}`,
    () => `${binary.title}: *Coming soon*`)
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

exports.explicitVersion = explicitVersion
exports.fetchShasums = fetchShasums
exports.writeToFile = writeToFile
exports.findLatestVersion = findLatestVersion
exports.verifyDownloads = verifyDownloads
exports.fetchChangelog = fetchChangelog
exports.fetchChangelogBody = fetchChangelogBody
exports.fetchAuthor = fetchAuthor
exports.fetchVersionPolicy = fetchVersionPolicy

// when script is executed directly,
// not required by another module, e.g:
// $ node scripts/release-post.js
if (require.main === module) {
  explicitVersion(process.argv[2])
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
}

