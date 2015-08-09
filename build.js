#!/usr/bin/env node

'use strict';

const Metalsmith = require('metalsmith');
const autoprefixer = require('autoprefixer-stylus');
const collections = require('metalsmith-collections');
const feed = require('metalsmith-feed');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const prism = require('metalsmith-prism');
const stylus = require('metalsmith-stylus');
const permalinks = require('metalsmith-permalinks');
const path = require('path');
const fs = require('fs');
const ncp = require('ncp');

const filterStylusPartials = require('./plugins/filter-stylus-partials.js');
const mapHandlebarsPartials = require('./plugins/map-handlebars-partials.js');

/** Build **/

// load template.json for given language, but use default language as fallback
// for properties which are not present in the given language
var Handlebars = require('handlebars');

const DEFAULT_LANG = 'en';
function i18nJSON(lang) {
  var defaultJSON = require(`./locale/${DEFAULT_LANG}/site.json`);
  var templateJSON = require(`./locale/${lang}/site.json`);
  var finalJSON = JSON.parse(JSON.stringify(defaultJSON));
  var merge = function(targetJSON, customJSON) {
    Object.keys(customJSON).forEach(function(key) {
      let value = customJSON[key];
      if (typeof value === "object") {
        merge(targetJSON[key], value);
      } else {
        targetJSON[key] = value;
      }
    });
  };
  merge(finalJSON, templateJSON)
  return finalJSON;
};

function traverse(obj, str) {
  return str.split(".").reduce(function(o, x) { return o[x] }, obj);
}

const source = {
  project: {
    versions: require('./source/versions.json')
  }
};

function buildlocale (locale) {
  console.time('[metalsmith] build/' + locale + ' finished');
    const siteJSON = path.join(__dirname, 'locale', locale, 'site.json');
    const metalsmith = Metalsmith(__dirname);
    metalsmith
    .metadata({
      site: require(siteJSON),
      project: source.project,
      i18n: i18nJSON(locale)
    })
    .source(path.join(__dirname, 'locale', locale))
    .use(collections({
      blog : {
        pattern: 'blog/**/*.md',
        sortBy: 'date',
        reverse: true,
        refer: false
      },
      tscMinutes: {
        pattern: 'foundation/tsc/minutes/*.md',
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
    .use(feed({
      collection: 'blog',
      destination: 'blog.xml',
      title: 'Node.js Blog'
    }))
    .use(feed({
      collection: 'tscMinutes',
      destination: 'tsc-minutes.xml',
      title: 'Node.js Technical Steering Committee meetings'
    }))
    .use(layouts({
      engine: 'handlebars',
      pattern: '**/*.html',
      partials: mapHandlebarsPartials(metalsmith, 'layouts', 'partials'),
      helpers: {
        equals: function (v1, v2, options) {
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        },
        i18n: function() {
          var env, key;

          // function(key, env)
          if (arguments.length === 2) {
            key = arguments[0];
            env = arguments[1];
          }
          // function(scope, key, env)
          if (arguments.length === 3) {
            key = arguments[0] + '.' + arguments[1];
            env = arguments[2];
          }

          var data = env.data.root;
          var result = traverse(data.i18n, key);

          return new Handlebars.SafeString(result);
        }
      }
    }))
    .destination(path.join(__dirname, 'build', locale));

    metalsmith.build(function (err) {
      if (err) { throw err; }
      console.timeEnd('[metalsmith] build/' + locale + ' finished');
    });
}

function copystatic () {
  console.time('[metalsmith] build/static finished');
  fs.mkdir(path.join(__dirname, 'build'), function () {
    fs.mkdir(path.join(__dirname, 'build', 'static'), function () {
      ncp(path.join(__dirname, 'static'), path.join(__dirname, 'build', 'static'), function (err) {
        if (err) { return console.error(err); }
        console.timeEnd('[metalsmith] build/static finished');
      });
    });
  });
}

function fullbuild () {
  copystatic();
  fs.readdir(path.join(__dirname, 'locale'), function (e, locales) {
    locales.forEach(function (locale) {
      buildlocale(locale);
    });
  });
}
fullbuild();

if (process.argv[2] === 'serve') {
  server();
}

function server () {
  /** Static file server **/
  const st = require('st');
  const http = require('http');
  const mount = st({
    path: path.join(__dirname, 'build'),
    cache: false,
    index: 'index.html'
  });
  http.createServer(
    function (req, res) { mount(req, res); }
  ).listen(8080,
    function () { console.log('http://localhost:8080/en/'); }
  );

  /** File Watches for Re-Builds **/
  const chokidar = require('chokidar');
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
  };
  const locales = chokidar.watch(path.join(__dirname, 'locale'), opts);
  const layouts = chokidar.watch(path.join(__dirname, 'layouts'), opts);
  const staticf = chokidar.watch(path.join(__dirname, 'static'), opts);

  function getlocale (p) {
    const pre = path.join(__dirname, 'locale');
    return p.slice(pre.length + 1, p.indexOf('/', pre.length + 1));
  }
  locales.on('change', function (p) {
    buildlocale(getlocale(p));
  });
  locales.on('add', function (p) {
    buildlocale(getlocale(p));
    locales.add(p);
  });

  layouts.on('change', fullbuild);
  layouts.on('add', function (p) { layouts.add(p); fullbuild(); });

  staticf.on('change', copystatic);
  staticf.on('add', function (p) { staticf.add(p); copystatic(); });
}
