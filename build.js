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

const debug = require('./plugins/debug.js');
const filterStylusPartials = require('./plugins/filter-stylus-partials.js');
const mapHandlebarsPartials = require('./plugins/map-handlebars-partials.js');

/** Build **/

fs.readdir(path.join(__dirname, 'locale'), function (e, locales) {
  locales.forEach(function (locale) {
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
  })
})

// TODO replace with st and a filewatcher.
// if (process.argv[2] === 'serve') {
//     metalsmith = metalsmith
//         .use(serve({
//             port: 8080,
//             verbose: true
//         }));
// }
