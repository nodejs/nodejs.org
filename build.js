#! /usr/bin/env node

'use strict'

// BUILD.JS: This file is responsible for building static HTML pages

const Metalsmith = require('metalsmith')
const autoprefixer = require('autoprefixer-stylus')
const collections = require('metalsmith-collections')
const feed = require('metalsmith-feed')
const layouts = require('metalsmith-layouts')
const markdown = require('metalsmith-markdown')
const prism = require('metalsmith-prism')
const stylus = require('metalsmith-stylus')
const permalinks = require('metalsmith-permalinks')
const pagination = require('metalsmith-yearly-pagination')
const marked = require('marked')
const path = require('path')
const fs = require('fs')
const ncp = require('ncp')
const junk = require('junk')

const navigation = require('./scripts/plugins/navigation')
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
  const defaultJSON = require(`./locale/${DEFAULT_LANG}/site.json`)
  const templateJSON = require(`./locale/${lang}/site.json`)

  return Object.assign({}, defaultJSON, templateJSON)
}

// This is the function where the actual magic happens. This contains the main
// Metalsmith build cycle used for building a locale subsite, such as the
// english one.
function buildLocale (source, locale) {
  console.time(`[metalsmith] build/${locale} finished`)
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
    // Extracts the main menu and sub-menu links form locale's site.json and
    // adds them to the metadata. This data is used in the navigation template
    .use(navigation(source.project.latestVersions))
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
    .use(pagination({
      path: 'blog/year',
      iteratee: (post, idx) => ({
        post,
        displaySummary: idx < 10
      })
    }))
    .use(markdown(markedOptions))
    .use(githubLinks({ locale: locale }))
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
        copyright: require('./scripts/helpers/copyright-year.js'),
        equals: require('./scripts/helpers/equals.js'),
        startswith: require('./scripts/helpers/startswith.js'),
        i18n: require('./scripts/helpers/i18n.js'),
        changeloglink: require('./scripts/helpers/changeloglink.js'),
        strftime: require('./scripts/helpers/strftime.js'),
        apidocslink: require('./scripts/helpers/apidocslink.js'),
        majorapidocslink: require('./scripts/helpers/majorapidocslink.js'),
        summary: require('./scripts/helpers/summary.js')
      }
    }))
    // Pipes the generated files into their respective subdirectory in the build
    // directory.
    .destination(path.join(__dirname, 'build', locale))

  // This actually executes the build and stops the internal timer after
  // completion.
  metalsmith.build((err) => {
    if (err) { throw err }
    console.timeEnd(`[metalsmith] build/${locale} finished`)
  })
}

// This middleware adds "Edit on GitHub" links to every editable page
function githubLinks (options) {
  return (files, m, next) => {
    // add suffix (".html" or "/") to each part of regex
    // to ignore possible occurrences in titles (e.g. blog posts)
    const isEditable = /security\.html|about\/|docs\/|foundation\/|get\-involved\/|knowledge\//

    Object.keys(files).forEach((path) => {
      if (!isEditable.test(path)) {
        return
      }

      const file = files[path]
      const url = `https://github.com/nodejs/nodejs.org/edit/master/locale/${options.locale}/${path.replace('.html', '.md')}`

      const contents = file.contents.toString().replace(/<h1>(.+)<\/h1>/, ($1, $2) => {
        return `<a class="edit-link" href="${url}">Edit on GitHub</a> <h1>${$2}</h1>`
      })

      file.contents = new Buffer(contents)
    })

    next()
  }
}

// This function copies the rest of the static assets to their subfolder in the
// build directory.
function copyStatic () {
  console.time('[metalsmith] build/static finished')
  fs.mkdir(path.join(__dirname, 'build'), () => {
    fs.mkdir(path.join(__dirname, 'build', 'static'), () => {
      ncp(path.join(__dirname, 'static'), path.join(__dirname, 'build', 'static'), (err) => {
        if (err) { return console.error(err) }
        fs.writeFileSync(path.join(__dirname, 'build', 'static', 'event-geo.json'), JSON.stringify(eventGeo()))
        console.timeEnd('[metalsmith] build/static finished')
      })
    })
  })
}

function getSource (callback) {
  // Loads all node/io.js versions.
  loadVersions((err, versions) => {
    const source = {
      project: {
        versions,
        latestVersions: {
          current: latestVersion.current(versions),
          lts: latestVersion.lts(versions)
        },
        banner: {
          visible: true,
          content: 'Important <a href="/en/blog/vulnerability/june-2016-security-releases/">security upgrades</a> for recent V8 vulnerability'
        }
      }
    }

    callback(err, source)
  })
}

// This is where the build is orchestrated from, as indicated by the function
// name. It brings together all build steps and dependencies and executes them.
function fullBuild () {
  // Copies static files.
  copyStatic()
  getSource((err, source) => {
    if (err) { throw err }

    // Executes the build cycle for every locale.
    fs.readdir(path.join(__dirname, 'locale'), (e, locales) => {
      locales.filter(junk.not).forEach((locale) => {
        buildLocale(source, locale)
      })
    })
  })
}

// Starts the build if the file was executed from the command line
if (require.main === module) {
  fullBuild()
}

exports.getSource = getSource
exports.fullBuild = fullBuild
exports.buildLocale = buildLocale
exports.copyStatic = copyStatic
