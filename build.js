#!/usr/bin/env node

'use strict';

const Metalsmith = require('metalsmith');
const autoprefixer = require('autoprefixer-stylus');
const collections = require('metalsmith-collections');
const feed = require('metalsmith-feed');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const prism = require('metalsmith-prism');
const serve = require('metalsmith-serve');
const stylus = require('metalsmith-stylus');
const permalinks = require('metalsmith-permalinks');
const path = require('path');
const fs = require('fs');
const ncp = require('ncp');

const debug = require('./plugins/debug.js');
const filterStylusPartials = require('./plugins/filter-stylus-partials.js');
const mapHandlebarsPartials = require('./plugins/map-handlebars-partials.js');

/** Build **/

function buildlocale (locale) {
  console.time('[metalsmith] build/'+locale+' finished');
  let metalsmith = Metalsmith(__dirname);
  metalsmith
  .metadata({site:require(path.join(__dirname, 'locale', locale, 'site.json'))})
  .source(path.join(__dirname, 'locale', locale))
  .use(collections({
    blog : {
      pattern: 'blog/**/*.md',
      sortBy: 'date',
      reverse: true,
      refer: false
    }
  }))
  .use(markdown({ langPrefix: 'language-' }))
  .use(prism())
  .use(filterStylusPartials())
  .use(stylus({
    compress: true,
    paths:[path.join(__dirname, 'layouts', 'css')],
    use: [autoprefixer()]
  }))
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars',
    partials: mapHandlebarsPartials(metalsmith, 'layouts', 'partials'),
    helpers: {
      equals: function (v1, v2, options) {
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      }
    }
  }))
  .use(feed({
    collection: 'blog',
    destionation: 'blog.xml'
  }))
  .destination(path.join(__dirname, 'build', locale));

  metalsmith.build(function (err) {
    if (err) { throw err; }
    console.timeEnd('[metalsmith] build/'+locale+' finished');
  });
}

function copystatic () {
  console.time('[metalsmith] build/static finished');
  fs.mkdir(path.join(__dirname, 'build', 'static'), function () {
    ncp(path.join(__dirname, 'static'), path.join(__dirname, 'build', 'static'), function (err) {
      if (err) return console.error(err);
      console.timeEnd('[metalsmith] build/static finished');
    });
  })
}

function fullbuild () {
  copystatic()
  fs.readdir(path.join(__dirname, 'locale'), function (e, locales) {
    locales.forEach(function (locale) {
      buildlocale(locale)
    })
  })
}
fullbuild()

if (process.argv[2] === 'serve') {
  server()
}

function server () {
  /** Static file server **/
  let st = require('st');
  let http = require('http');
  var mount = st({
    path: path.join(__dirname, 'build'),
    cache: false
  });
  http.createServer(
    function (req, res) {mount(req, res)}
  ).listen(8080,
    function () {console.log('http://localhost:8080/')}
  );

  /** File Watches for Re-Builds **/
  let chokidar = require('chokidar');
  let opts = {
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
  let locales = chokidar.watch(path.join(__dirname, 'locale'), opts);
  let layouts = chokidar.watch(path.join(__dirname, 'layouts'), opts);
  let staticf = chokidar.watch(path.join(__dirname, 'static'), opts);

  function getlocale (p) {
    let pre = path.join(__dirname, 'locale');
    let locale = p.slice(pre.length+1, p.indexOf('/', pre.length+1));
  }
  locales.on('change', function (p) {
    buildlocale(getlocale(p))
  })
  locales.on('add', function (p) {
    buildlocale(getlocale(p))
    locales.add(p)
  })

  layouts.on('change', fullbuild)
  layouts.on('add', function (p) {layouts.add(p); fullbuild()} )

  staticf.on('change', copystatic)
  staticf.on('add', function (p) {staticf.add(p); copystatic()})
}
