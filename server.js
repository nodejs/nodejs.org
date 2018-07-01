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
const fs = require('fs')
// Read all the langs under `locale`
const SUPPORTED_LANGUAGES = new Set(fs.readdirSync(path.join(__dirname, 'locale')))

// Redirect mechanism meant as a fix for languages where some pages
// have not been translated yet, therefore redirect to the english equivalent,
// which isn't the correct language, but better than a 404-page
function redirectToEnglishUrl (req, res) {
  return () => {
    // Url should be case insensitive.(e.g: zh-CN = zh-cn),
    // So we should make a convert to the lower case and check the route values.
    let url = req.url.toLowerCase()
    const splitedValues = url.split('/')
    // For urls like `/blog`, add `en` before that
    if (splitedValues.length === 2) {
      splitedValues[0] = 'en'
      url = splitedValues.join('/').trim()
    } else if (splitedValues[1] !== 'en' && SUPPORTED_LANGUAGES.has(splitedValues[1])) {
      // For urls like `/lang/docs/`.
      // If we found the lang in our set, this means the specific lang
      // doesn't have proper translated pages yet, so force the default
      // lang to `en`.
      splitedValues[1] = 'en'
      url = splitedValues.join('/').trim()
    }

    res.writeHead(302, {
      location: url
    })
    res.end()
  }
}

// Gets the locale name by path.
function getLocale (filePath) {
  const pre = path.join(__dirname, 'locale')
  return filePath.slice(pre.length + 1, filePath.indexOf('/', pre.length + 1))
}

build.getSource((err, source) => {
  if (err) { throw err }

  locales.on('change', (filePath) => {
    build.buildLocale(source, getLocale(filePath))
  })
  locales.on('add', (filePath) => {
    build.buildLocale(source, getLocale(filePath))
    locales.add(filePath)
  })
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
http.createServer((req, res) => {
  // If we are accessing the root, it should be redirected to `/en` instead.
  // We shouldn't get a 404 page.
  if (req.url === '/') {
    req.url = '/en'
  }
  mount(req, res, redirectToEnglishUrl(req, res))
}).listen(port, () => console.log(`http://localhost:${port}/en/`))

// Start the initial build of static HTML pages
build.fullBuild()
