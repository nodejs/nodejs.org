#! /usr/bin/env node

'use strict'

// BUILD.JS: This file is responsible for building static HTML pages

const Metalsmith = require('metalsmith')
const autoprefixer = require('autoprefixer-stylus')
const collections = require('metalsmith-collections')
const feed = require('metalsmith-feed')
const discoverHelpers = require('metalsmith-discover-helpers')
const discoverPartials = require('metalsmith-discover-partials')
const layouts = require('metalsmith-layouts')
const markdown = require('metalsmith-markdown')
const prism = require('metalsmith-prism')
const stylus = require('metalsmith-stylus')
const permalinks = require('metalsmith-permalinks')
const pagination = require('metalsmith-yearly-pagination')
const defaultsDeep = require('lodash.defaultsdeep')
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

  return defaultsDeep({}, templateJSON, defaultJSON)
}

// This function imports language file for each given locale in array 'localesList'
// and based on it generating locales data, which includes full language name, english language name, locale and link
function generateLocalesData (localesList) {
  return localesList.map(localeEl => {
    const { language, languageEnglishVersion, locale, url } = require(`./locale/${localeEl}/site.json`)
    return { language, locale, url, languageEnglishVersion }
  })
}

// This is the function where the actual magic happens. This contains the main
// Metalsmith build cycle used for building a locale subsite, such as the
// english one.
function buildLocale (source, locale, opts) {
  console.log(`[metalsmith] build/${locale} started`)
  const labelForBuild = `[metalsmith] build/${locale} finished`
  console.time(labelForBuild)
  const metalsmith = Metalsmith(__dirname)
  metalsmith
  // Sets global metadata imported from the locale's respective site.json.
    .metadata({
      site: i18nJSON(locale),
      project: source.project,
      locales: opts.localesData
    })
  // Sets the build source as the locale folder.
    .source(path.join(__dirname, 'locale', locale))
    .use(withPreserveLocale(opts && opts.preserveLocale))
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
      knowledgeBase: {
        pattern: 'knowledge/**/*.md',
        refer: false
      },
      guides: {
        pattern: 'docs/guides/!(index).md'
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
    .use(githubLinks({ locale: locale, site: i18nJSON(locale) }))
    .use(prism())
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
    // Finally, this compiles the rest of the layouts present in ./layouts.
    // They're language-agnostic, but have to be regenerated for every locale
    // anyways.
    .use(discoverPartials({
      directory: 'layouts/partials',
      pattern: /\.hbs$/
    }))
    .use(discoverHelpers({
      directory: 'scripts/helpers',
      pattern: /\.js$/
    }))
    .use(layouts())
    // Pipes the generated files into their respective subdirectory in the build
    // directory.
    .destination(path.join(__dirname, 'build', locale))

  // This actually executes the build and stops the internal timer after
  // completion.
  metalsmith.build((err) => {
    if (err) { throw err }
    console.timeEnd(labelForBuild)
  })
}

// This plugin reads the files present in the english locale that are missing
// in the current locale being built (requires preserveLocale flag)
function withPreserveLocale (preserveLocale) {
  return (files, m, next) => {
    if (preserveLocale) {
      var path = m.path('locale/en')
      m.read(path, (err, newfiles) => {
        if (err) {
          console.error(err)
          return next(err)
        }

        Object.keys(newfiles).forEach((key) => {
          if (!files[key]) {
            files[key] = newfiles[key]
          }
        })
        next()
      })
    } else {
      next()
    }
  }
}

// This middleware adds "Edit on GitHub" links to every editable page
function githubLinks (options) {
  return (files, m, next) => {
    // add suffix (".html" or "/") to each part of regex
    // to ignore possible occurrences in titles (e.g. blog posts)
    const isEditable = /security\.html|about\/|docs\/|foundation\/|get-involved\/|knowledge\//

    Object.keys(files).forEach((path) => {
      if (!isEditable.test(path)) {
        return
      }

      const file = files[path]
      const url = `https://github.com/nodejs/nodejs.org/edit/master/locale/${options.locale}/${path.replace('.html', '.md')}`
      const editText = options.site.editOnGithub || 'Edit on GitHub'

      const contents = file.contents.toString().replace(/<h1(.*?)>(.*?)<\/h1>/, (match, $1, $2) => {
        return `<a class="edit-link" href="${url}">${editText}</a> <h1${$1}>${$2}</h1>`
      })

      file.contents = Buffer.from(contents)
    })

    next()
  }
}

// This function builds the layouts folder for all the Stylus files.
function buildLayouts () {
  console.log('[metalsmith] build/layouts started')
  const labelForBuild = '[metalsmith] build/layouts finished'
  console.time(labelForBuild)

  fs.mkdir(path.join(__dirname, 'build'), () => {
    fs.mkdir(path.join(__dirname, 'build', 'layouts'), () => {
      const metalsmith = Metalsmith(__dirname)
      metalsmith
        // Sets the build source as /layouts/css.
        .source(path.join(__dirname, 'layouts', 'css'))
        // Deletes Stylus partials since they'll be included in the main CSS
        // file anyways.
        .use(filterStylusPartials())
        .use(stylus({
          compress: true,
          paths: [path.join(__dirname, 'layouts', 'css')],
          use: [autoprefixer()]
        }))
        // Pipes the generated files into /build/layouts/css.
        .destination(path.join(__dirname, 'build', 'layouts', 'css'))

      // This actually executes the build and stops the internal timer after
      // completion.
      metalsmith.build((err) => {
        if (err) { throw err }
        console.timeEnd(labelForBuild)
      })
    })
  })
}

// This function copies the rest of the static assets to their subfolder in the
// build directory.
function copyStatic () {
  console.log('[metalsmith] build/static started')
  console.time('[metalsmith] build/static finished')
  fs.mkdir(path.join(__dirname, 'build'), () => {
    fs.mkdir(path.join(__dirname, 'build', 'static'), () => {
      ncp(path.join(__dirname, 'static'), path.join(__dirname, 'build', 'static'), (err) => {
        if (err) { return console.error(err) }
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
          visible: false,
          text: 'New security releases now available for all release lines',
          link: '/en/blog/vulnerability/february-2019-security-releases/'
        }
      }
    }

    callback(err, source)
  })
}

// This is where the build is orchestrated from, as indicated by the function
// name. It brings together all build steps and dependencies and executes them.
function fullBuild (opts) {
  const { preserveLocale, selectedLocales } = opts
  // Build static files.
  copyStatic()
  // Build layouts
  buildLayouts()
  getSource((err, source) => {
    if (err) { throw err }

    // Executes the build cycle for every locale.
    fs.readdir(path.join(__dirname, 'locale'), (e, locales) => {
      const filteredLocales = locales.filter(file => junk.not(file) && (selectedLocales ? selectedLocales.includes(file) : true))
      const localesData = generateLocalesData(filteredLocales)
      filteredLocales.forEach((locale) => {
        buildLocale(source, locale, { preserveLocale, localesData })
      })
    })
  })
}

// Starts the build if the file was executed from the command line
if (require.main === module) {
  const preserveLocale = process.argv.includes('--preserveLocale')
  const selectedLocales = process.env.DEFAULT_LOCALE ? process.env.DEFAULT_LOCALE.toLowerCase().split(',') : process.env.DEFAULT_LOCALE
  fullBuild({ selectedLocales, preserveLocale })
}

exports.getSource = getSource
exports.fullBuild = fullBuild
exports.buildLocale = buildLocale
exports.copyStatic = copyStatic
