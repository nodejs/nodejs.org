#! /usr/bin/env node

'use strict'

// BUILD.JS: This file is responsible for building static HTML pages and a
// server for local development.

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
const eventGeo = require('./scripts/event-geo.js')

// Set the default language, also functions as a fallback for properties which
// are not defined in the given language.
const DEFAULT_LANG = 'en'

// Set up the Markdown renderer that we'll use for our Metalsmith build process,
// with the necessary adjustments that we need to make in order to have Prism
// work.
const renderer = new marked.Renderer()
renderer.heading = anchorMarkdownHeadings
const markedOptions = {
  langPrefix: 'language-',
  renderer: renderer
}

// This function imports a given language file and uses the default language set
// in DEFAULT_LANG as a fallback to prevent any strings that aren't filled out
// from appearing as blank.
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

// This is the function where the actual magic happens. This contains the main
// Metalsmith build cycle used for building a locale subsite, such as the
// english one.
function buildlocale (source, locale) {
  console.time('[metalsmith] build/' + locale + ' finished')
  const siteJSON = path.join(__dirname, 'locale', locale, 'site.json')
  const metalsmith = Metalsmith(__dirname)
  metalsmith
    // Sets global metadata imported from the locale's respective site.json.
    .metadata({
      site: require(siteJSON),
      project: source.project,
      i18n: i18nJSON(locale)
    })
    // Sets the build source as the locale folder.
    .source(path.join(__dirname, 'locale', locale))
    // Defines the blog post/guide collections used to internally group them for
    // easier future handling and feed generation.
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
    // Deletes Stylus partials since they'll be included in the main CSS file
    // anyways.
    .use(filterStylusPartials())
    .use(stylus({
      compress: true,
      paths: [path.join(__dirname, 'layouts', 'css')],
      use: [autoprefixer()]
    }))
    // Set pretty permalinks, we don't want .html suffixes everywhere.
    .use(permalinks({
      relative: false
    }))
    // Generates the feed XML files from their respective collections which were
    // defined earlier on.
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
    // Finally, this compiles the rest of the layouts present in ./layouts.
    // They're language-agnostic, but have to be regenerated for every locale
    // anyways.
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
        apidocslink: require('./scripts/helpers/apidocslink.js')
      }
    }))
    // Pipes the generated files into their respective subdirectory in the build
    // directory.
    .destination(path.join(__dirname, 'build', locale))

  // This actually executes the build and stops the internal timer after
  // completion.
  metalsmith.build(function (err) {
    if (err) { throw err }
    console.timeEnd('[metalsmith] build/' + locale + ' finished')
  })
}

// This function copies the rest of the static assets to their subfolder in the
// build directory.
function copystatic () {
  console.time('[metalsmith] build/static finished')
  fs.mkdir(path.join(__dirname, 'build'), function () {
    fs.mkdir(path.join(__dirname, 'build', 'static'), function () {
      ncp(path.join(__dirname, 'static'), path.join(__dirname, 'build', 'static'), function (err) {
        if (err) { return console.error(err) }
        fs.writeFileSync(path.join(__dirname, 'build', 'static', 'event-geo.json'), JSON.stringify(eventGeo()))
        console.timeEnd('[metalsmith] build/static finished')
      })
    })
  })
}

// This is where the build is orchestrated from, as indicated by the function
// name. It brings together all build steps and dependencies and executes them.
function fullbuild () {
  // Copies static files.
  copystatic()
  // Loads all node/io.js versions.
  loadVersions(function (err, versions) {
    if (err) { throw err }
    const source = {
      project: {
        versions,
        currentVersion: versions[0].version,
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

    // Executes the build cycle for every locale.
    fs.readdir(path.join(__dirname, 'locale'), function (e, locales) {
      locales.filter(junk.not).forEach(function (locale) {
        buildlocale(source, locale)
      })
    })
  })
}

// The server function, where the site is exposed through a static file server
// locally.
function server () {
  // Initializes the server and mounts it in the generated build directory.
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

  // Watches for file changes in the locale, layout and static directories, and
  // rebuilds the modified one.
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

  // Gets the locale name by path.
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

// Starts the build.
fullbuild()

// If the command-line option was provided, starts the static server.
if (process.argv[2] === 'serve') {
  server()
}
