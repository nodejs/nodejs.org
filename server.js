'use strict'

// The server where the site is exposed through a static file server
// while developing locally.

const path = require('path')
const st = require('st')
const http = require('http')
const chokidar = require('chokidar')
const mount = st({
  path: path.join(__dirname, 'build'),
  cache: false,
  index: 'index.html',
  passthrough: true
})

const build = require('./build')

const port = process.env.PORT || 8080

const selectedLocales = process.env.DEFAULT_LOCALE ? process.env.DEFAULT_LOCALE.toLowerCase().split(',') : process.env.DEFAULT_LOCALE
const preserveLocale = process.argv.includes('--preserveLocale')

// Watches for file changes in the locale, layout and static directories, and
// rebuilds the modified one.
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
const statics = chokidar.watch(path.join(__dirname, 'static'), opts)

// Gets the locale name by path.
function getLocale (filePath) {
  const pre = path.join(__dirname, 'locale')
  return filePath.slice(pre.length + 1, filePath.indexOf('/', pre.length + 1))
}

build.getSource((err, source) => {
  if (err) { throw err }

  locales.on('change', (filePath) => {
    const locale = getLocale(filePath)
    if (!selectedLocales || selectedLocales.includes(locale)) {
      build.buildLocale(source, locale)
    }
  })
  locales.on('add', (filePath) => {
    const locale = getLocale(filePath)
    if (!selectedLocales || selectedLocales.includes(locale)) {
      build.buildLocale(source, locale)
      locales.add(filePath)
    }
  })
})

layouts.on('change', () => build.fullBuild({ selectedLocales, preserveLocale }))
layouts.on('add', (filePath) => {
  layouts.add(filePath)
  build.fullBuild({ selectedLocales, preserveLocale })
})

statics.on('change', build.copyStatic)
statics.on('add', (filePath) => {
  statics.add(filePath)
  build.copyStatic()
})

const mainLocale = (selectedLocales && selectedLocales[0]) || 'en'

// Initializes the server and mounts it in the generated build directory.
http.createServer((req, res) => {
  // If we are accessing the root, it should be redirected to `/en` instead.
  // We shouldn't get a 404 page.

  if (req.url === '/') {
    req.url = `/${mainLocale}`
  }
  mount(req, res)
}).listen(port, () => console.log(`\x1B[32mServer running at http://localhost:${port}/${mainLocale}/\x1B[39m`))

// Start the initial build of static HTML pages
build.fullBuild({ selectedLocales, preserveLocale })
