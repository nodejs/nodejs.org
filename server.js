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
  index: 'index.html'
})

const build = require('./build')

const port = process.env.PORT || 8080

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

locales.on('change', (filePath) => {
  build.buildLocale(filePath, getLocale(filePath))
})
locales.on('add', (filePath) => {
  build.buildLocale(filePath, getLocale(filePath))
  locales.add(filePath)
})

layouts.on('change', build.fullBuild)
layouts.on('add', (filePath) => {
  layouts.add(filePath)
  build.fullBuild()
})

statics.on('change', build.copyStatic)
statics.on('add', (filePath) => {
  statics.add(filePath)
  build.copyStatic()
})

// Initializes the server and mounts it in the generated build directory.
http.createServer(mount).listen(port, () => console.log(`http://localhost:${port}/en/`))

// Start the initial build of static HTML pages
build.fullBuild()
