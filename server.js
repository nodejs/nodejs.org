'use strict'

// The server where the site is exposed through a static file server
// while developing locally.

const fs = require('fs')
const http = require('http')
const path = require('path')
const chokidar = require('chokidar')
const junk = require('junk')
const st = require('st')
const build = require('./build')

const mount = st({
  path: path.join(__dirname, 'build'),
  cache: false,
  index: 'index.html',
  passthrough: true
})

const port = process.env.PORT || 8080
const selectedLocales = process.env.DEFAULT_LOCALE
  ? process.env.DEFAULT_LOCALE.toLowerCase().split(',')
  : process.env.DEFAULT_LOCALE
const preserveLocale = process.argv.includes('--preserveLocale')
const serveOnly = process.argv.includes('--serve-only')

// Watches for file changes in the locale, layout and static directories, and
// rebuilds the modified one.
const opts = {
  ignoreInitial: true,
  usePolling: true
}
const locales = chokidar.watch(path.join(__dirname, 'locale'), opts)
const css = chokidar.watch(path.join(__dirname, 'layouts/css/**/*.scss'), opts)
const layouts = chokidar.watch(path.join(__dirname, 'layouts/**/*.hbs'), opts)
const staticFiles = chokidar.watch(path.join(__dirname, 'static'), opts)

// Gets the locale name by path.
function getLocale(filePath) {
  const pre = path.join(__dirname, 'locale')
  return filePath.slice(
    pre.length + 1,
    filePath.indexOf(path.sep, pre.length + 1)
  )
}

// This function has two meanings:
// 1. Build for the specific language.
// 2. Choose what languages for the menu.
function dynamicallyBuildOnLanguages(source, locale) {
  if (!selectedLocales || selectedLocales.length === 0) {
    fs.readdir(path.join(__dirname, 'locale'), (err, locales) => {
      if (err) {
        throw err
      }

      const filteredLocales = locales.filter((file) => junk.not(file))
      const localesData = build.generateLocalesData(filteredLocales)
      build.buildLocale(source, locale, { preserveLocale, localesData })
    })
  } else {
    const localesData = build.generateLocalesData(selectedLocales)
    build.buildLocale(source, locale, { preserveLocale, localesData })
  }
}

build.getSource((err, source) => {
  if (err) {
    throw err
  }

  locales.on('change', (filePath) => {
    const locale = getLocale(filePath)

    if (!selectedLocales || selectedLocales.includes(locale)) {
      console.log(
        `The language ${locale} is changed, '${filePath}' is modified.`
      )
      dynamicallyBuildOnLanguages(source, locale)
    }
  })

  locales.on('add', (filePath) => {
    const locale = getLocale(filePath)

    if (!selectedLocales || selectedLocales.includes(locale)) {
      console.log(`The language ${locale} is changed, '${filePath}' is added.`)
      dynamicallyBuildOnLanguages(source, locale)
      locales.add(filePath)
    }
  })
})

css.on('change', () => build.buildCSS())
css.on('add', (filePath) => {
  css.add(filePath)
  build.buildCSS()
})

layouts.on('change', () => build.fullBuild({ selectedLocales, preserveLocale }))
layouts.on('add', (filePath) => {
  layouts.add(filePath)
  build.fullBuild({ selectedLocales, preserveLocale })
})

staticFiles.on('change', build.copyStatic)
staticFiles.on('add', (filePath) => {
  staticFiles.add(filePath)
  build.copyStatic()
})

const mainLocale = (selectedLocales && selectedLocales[0]) || 'en'

// Initializes the server and mounts it in the generated build directory.
http
  .createServer((req, res) => {
    // If we are accessing the root, it should be redirected to the default language,
    // We shouldn't get a 404 page.

    if (req.url === '/') {
      req.url = `/${mainLocale}`
    }
    mount(req, res)
  })
  .listen(port, () => {
    console.log(
      `\x1B[32mServer running at http://localhost:${port}/${mainLocale}/\x1B[39m`
    )
  })

if (!serveOnly) {
  // Start the initial build of static HTML pages
  build.copyStatic()
  build.buildCSS()
  build.fullBuild({ selectedLocales, preserveLocale })
}
