#!/usr/bin/env node

'use strict';

const Path = require('path');
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

const debug = require('./plugins/debug.js');
const filterStylusPartials = require('./plugins/filter-stylus-partials.js');
const mapHandlebarsPartials = require('./plugins/map-handlebars-partials.js');


/**
 * Build.
 */
console.time('[metalsmith] Build finished');
let metalsmith = Metalsmith(__dirname);
metalsmith
    .metadata({
        // TODO: Import iojs meta data (check iojs templates for index/download)
        site: {
            title  : 'Node.js',
            author : 'Node.js Foundation',
            url    : 'https://new.nodejs.org'
        }
    })
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
    }));


if (process.argv[2] === 'serve') {
    metalsmith = metalsmith
        .use(serve({
            port: 8080,
            verbose: true
        }));
}

metalsmith.build(function (err) {

    if (err) { throw err; }
    console.timeEnd('[metalsmith] Build finished');
});
