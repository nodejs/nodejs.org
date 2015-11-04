#!/usr/bin/env node

'use strict'

const Metalsmith = require('metalsmith')
const autoprefixer = require('autoprefixer-stylus')
const collections = require('metalsmith-collections')
const feed = require('metalsmith-feed')
const layouts = require('metalsmith-layouts')
const markdown = require('metalsmith-markdown')
const prism = require('metalsmith-prism')
const stylus = require('metalsmith-stylus')
const permalinks = require('metalsmith-permalinks')
const marked = require('marked')
const path = require('path')
const fs = require('fs')
const ncp = require('ncp')
const junk = require('junk')

const filterStylusPartials = require('./scripts/plugins/filter-stylus-partials')
const anchorMarkdownHeadings = require('./scripts/plugins/anchor-markdown-headings')
const loadVersions = require('./scripts/load-versions')
const latestVersion = require('./scripts/helpers/latestversion')

/** Build **/

// load template.json for given language, but use default language as fallback
// for properties which are not present in the given language
const DEFAULT_LANG = 'en'

const renderer = new marked.Renderer()
renderer.heading = anchorMarkdownHeadings

const markedOptions = {
  langPrefix: 'language-',
  renderer: renderer
}

function i18nJSON (lang) {
  var defaultJSON = require(`./locale/${DEFAULT_LANG}/site.json`)
  var templateJSON = require(`./locale/${lang}/site.json`)
  var finalJSON = JSON.parse(JSON.stringify(defaultJSON))
  var merge = function (targetJSON, customJSON) {
    Object.keys(customJSON).forEach(function (key) {
      let value = customJSON[key]
      if (typeof value === 'object') {
        merge(targetJSON[key], value)
      } else {
        targetJSON[key] = value
      }
    })
  }
  merge(finalJSON, templateJSON)
  return finalJSON
}

function buildlocale (source, locale) {
  console.time('[metalsmith] build/' + locale + ' finished')
  const siteJSON = path.join(__dirname, 'locale', locale, 'site.json')
  const metalsmith = Metalsmith(__dirname)
  metalsmith
    .metadata({
      site: require(siteJSON),
      project: source.project,
      i18n: i18nJSON(locale)
    })
    .source(path.join(__dirname, 'locale', locale))
    .use(collections({
      blog: {
        pattern: 'blog/**/*.md',
        sortBy: 'date',
        reverse: true,
        refer: false
      },
      blogAnnounce: {
        pattern: 'blog/announcements/*.md',
        sortBy: 'date',
        reverse: true,
        refer: false
      },
      blogReleases: {
        pattern: 'blog/release/*.md',
        sortBy: 'date',
        reverse: true,
        refer: false
      },
      blogVulnerability: {
        pattern: 'blog/vulnerability/*.md',
        sortBy: 'date',
        reverse: true,
        refer: false
      },
      lastWeekly: {
        pattern: 'blog/weekly-updates/*.md',
        sortBy: 'date',
        reverse: true,
        refer: false,
        limit: 1
      },
      tscMinutes: {
        pattern: 'foundation/tsc/minutes/*.md',
        sortBy: 'date',
        reverse: true,
        refer: false
      },
      knowledgeBase: {
        pattern: 'knowledge/**/*.md',
        refer: false
      },
      guides: {
        pattern: 'docs/guides/!(index).md',
        refer: false
      }
    }))
    .use(markdown(markedOptions))
    .use(prism())
    .use(filterStylusPartials())
    .use(stylus({
      compress: true,
      paths: [path.join(__dirname, 'layouts', 'css')],
      use: [autoprefixer()]
    }))
    .use(permalinks({
      relative: false
    }))
    .use(feed({
      collection: 'blog',
      destination: 'feed/blog.xml',
      title: 'Node.js Blog'
    }))
    .use(feed({
      collection: 'blogAnnounce',
      destination: 'feed/announce.xml',
      title: 'Node.js Announcements'
    }))
    .use(feed({
      collection: 'blogReleases',
      destination: 'feed/releases.xml',
      title: 'Node.js Blog: Releases'
    }))
    .use(feed({
      collection: 'blogVulnerability',
      destination: 'feed/vulnerability.xml',
      title: 'Node.js Blog: Vulnerability Reports'
    }))
    .use(feed({
      collection: 'tscMinutes',
      destination: 'feed/tsc-minutes.xml',
      title: 'Node.js Technical Steering Committee meetings'
    }))
    .use(layouts({
      engine: 'handlebars',
      pattern: '**/*.html',
      partials: 'layouts/partials',
      helpers: {
        equals: require('./scripts/helpers/equals.js'),
        startswith: require('./scripts/helpers/startswith.js'),
        i18n: require('./scripts/helpers/i18n.js'),
        changeloglink: require('./scripts/helpers/changeloglink.js'),
        strftime: require('./scripts/helpers/strftime.js'),
        apidocslink: require('./scripts/helpers/apidocslink.js'),
        majorapidocslink: require('./scripts/helpers/majorapidocslink.js')
      }
    }))
    .destination(path.join(__dirname, 'build', locale))

  metalsmith.build(function (err) {
    if (err) { throw err }
    console.timeEnd('[metalsmith] build/' + locale + ' finished')
  })
}

function copystatic () {
  console.time('[metalsmith] build/static finished')
  fs.mkdir(path.join(__dirname, 'build'), function () {
    fs.mkdir(path.join(__dirname, 'build', 'static'), function () {
      ncp(path.join(__dirname, 'static'), path.join(__dirname, 'build', 'static'), function (err) {
        if (err) { return console.error(err) }
        console.timeEnd('[metalsmith] build/static finished')
      })
    })
  })
}

function fullbuild () {
  copystatic()
  loadVersions(function (err, versions) {
    if (err) { throw err }
    const source = {
      project: {
        versions,
        currentVersions: {
          stable: latestVersion.stable(versions),
          lts: latestVersion.lts(versions)
        },
        banner: {
          visible: false,
          content: '<a href="https://nodejs.org/en/blog/release/v4.2.1/">Long Term Support Release</a>'
        }
      }
    }

    fs.readdir(path.join(__dirname, 'locale'), function (e, locales) {
      locales.filter(junk.not).forEach(function (locale) {
        buildlocale(source, locale)
      })
    })
  })
}

function server () {
  /** Static file server **/
  const st = require('st')
  const http = require('http')
  const mount = st({
    path: path.join(__dirname, 'build'),
    cache: false,
    index: 'index.html'
  })
  http.createServer(
    function (req, res) { mount(req, res) }
  ).listen(8080,
    function () { console.log('http://localhost:8080/en/') }
  )

  /** File Watches for Re-Builds **/
  const chokidar = require('chokidar')
  const opts = {
    persistent: true,
    ignoreInitial: true,
    followSymlinks: true,
    usePolling: true,
    alwaysStat: false,
    depth: undefined,
    interval: 100,
    ignorePermissionErrors: false,
    atomic: true
  }
  const locales = chokidar.watch(path.join(__dirname, 'locale'), opts)
  const layouts = chokidar.watch(path.join(__dirname, 'layouts'), opts)
  const staticf = chokidar.watch(path.join(__dirname, 'static'), opts)

  function getlocale (p) {
    const pre = path.join(__dirname, 'locale')
    return p.slice(pre.length + 1, p.indexOf('/', pre.length + 1))
  }
  locales.on('change', function (p) {
    buildlocale(p, getlocale(p))
  })
  locales.on('add', function (p) {
    buildlocale(p, getlocale(p))
    locales.add(p)
  })

  layouts.on('change', fullbuild)
  layouts.on('add', function (p) { layouts.add(p); fullbuild() })

  staticf.on('change', copystatic)
  staticf.on('add', function (p) { staticf.add(p); copystatic() })
}

fullbuild()

if (process.argv[2] === 'serve') {
  server()
}
