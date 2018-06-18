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

// Redirect mechanism meant as a fix for languages where some pages
// have not been translated yet, therefore redirect to the english equivalent,
// which isn't the correct language, but better than a 404-page
function redirectToEnglishUrl (req, res) {
  return () => {
    // Union the Url to lower case (ignore the case sensitive)
    // E.g: `zh-cn` equals to `zh-CN`
    const url = req.url.toLowerCase()

    const isAlreadyEnglish = url.startsWith('/en')
    const urlContainsLanguage = url.split('/').length > 2

    if (isAlreadyEnglish || !urlContainsLanguage) {
      res.writeHead(404, 'Not found')
      return res.end()
    }

    const englishUrl = url.replace(/^\/\w+\//, '/en/')

    res.writeHead(302, {
      location: englishUrl
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
  mount(req, res, redirectToEnglishUrl(req, res))
}).listen(port, () => console.log(`http://localhost:${port}/en/`))

// Start the initial build of static HTML pages
build.fullBuild()
