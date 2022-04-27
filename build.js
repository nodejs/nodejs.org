#! /usr/bin/env node

'use strict';

// BUILD.JS: This file is responsible for building static HTML pages

const fs = require('fs');
const gracefulFs = require('graceful-fs');

// This is needed at least on Windows to prevent the `EMFILE: too many open files` error
// https://github.com/isaacs/node-graceful-fs#global-patching
gracefulFs.gracefulify(fs);

const path = require('path');
const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const feed = require('metalsmith-feed');
const layouts = require('metalsmith-layouts');
const markdown = require('@metalsmith/markdown');
const permalinks = require('@metalsmith/permalinks');
const pagination = require('metalsmith-yearly-pagination');
const defaultsDeep = require('lodash.defaultsdeep');
const autoprefixer = require('autoprefixer');
const { marked } = require('marked');
const postcss = require('postcss');
const sass = require('sass');
const ncp = require('ncp');
const junk = require('junk');
const semver = require('semver');
const replace = require('metalsmith-one-replace');
const glob = require('glob');
const Handlebars = require('handlebars');

const githubLinks = require('./scripts/plugins/githubLinks');
const navigation = require('./scripts/plugins/navigation');
const anchorMarkdownHeadings = require('./scripts/plugins/anchor-markdown-headings');
const loadVersions = require('./scripts/load-versions');
const latestVersion = require('./scripts/helpers/latestversion');

// Set the default language, also functions as a fallback for properties which
// are not defined in the given language.
const DEFAULT_LANG = 'en';

// The history links of nodejs versions at doc/index.md
const nodejsVersionsContent = fs
  .readFileSync('./source/nodejsVersions.md')
  .toString();

// Set up the Markdown renderer that we'll use for our Metalsmith build process.
const renderer = new marked.Renderer();
renderer.heading = anchorMarkdownHeadings;
const markedOptions = {
  renderer
};

// We are setting the output from `latestVersion` module here for future use.
// available props `latestVersionInfo` are `current` and `lts`
let latestVersionInfo = {};

// This function imports a given language file and uses the default language set
// in DEFAULT_LANG as a fallback to prevent any strings that aren't filled out
// from appearing as blank.
function i18nJSON(lang) {
  const defaultJSON = require(`./locale/${DEFAULT_LANG}/site.json`);
  const templateJSON = require(`./locale/${lang}/site.json`);

  return defaultsDeep({}, templateJSON, defaultJSON);
}

// This function imports language file for each given locale in array 'localesList'
// and based on it generating locales data, which includes full language name, english language name, locale and link
function generateLocalesData(localesList) {
  return localesList.map((localeEl) => {
    const {
      language,
      languageEnglishVersion,
      locale,
      url
    } = require(`./locale/${localeEl}/site.json`);
    return { language, locale, url, languageEnglishVersion };
  });
}

// This is the function where the actual magic happens. This contains the main
// Metalsmith build cycle used for building a locale subsite, such as the
// english one.
function buildLocale(source, locale, opts) {
  console.log(`[metalsmith] build/${locale} started`);
  const labelForBuild = `[metalsmith] build/${locale} finished`;
  console.time(labelForBuild);
  const metalsmith = Metalsmith(__dirname);

  metalsmith
    // Sets global metadata imported from the locale's respective site.json.
    .metadata({
      site: i18nJSON(locale),
      project: source.project,
      locales: opts.localesData
    })
    // Sets the build source as the locale folder.
    .source(path.join(__dirname, 'locale', locale))
    // site.json files aren't needed in the output dir
    .ignore('site.json')
    .use(withPreserveLocale(opts && opts.preserveLocale))
    // Extracts the main menu and sub-menu links form locale's site.json and
    // adds them to the metadata. This data is used in the navigation template
    .use(navigation(source.project.latestVersions))
    // Defines the blog post/guide collections used to internally group them for
    // easier future handling and feed generation.
    .use(
      collections({
        blog: {
          pattern: 'blog/**/*.md',
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
        knowledgeBase: {
          pattern: 'knowledge/**/*.md',
          refer: false
        },
        guides: {
          pattern: 'docs/guides/!(index).md'
        }
      })
    )
    .use(
      pagination({
        path: 'blog/year',
        iteratee: (post, idx) => ({
          post
        })
      })
    )
    .use(
      replace({
        actions: [
          {
            type: 'var',
            varValues: {
              currentVersion: `latest-${latestVersionInfo.lts.nodeMajor}`,
              nodeVersionLinks: nodejsVersionsContent
            }
          }
        ]
      })
    )
    .use(markdown(markedOptions))
    .use(githubLinks({ locale, site: i18nJSON(locale) }))
    // Set pretty permalinks, we don't want .html suffixes everywhere.
    .use(
      permalinks({
        relative: false
      })
    )
    // Generates the feed XML files from their respective collections which were
    // defined earlier on.
    .use(
      feed({
        collection: 'blog',
        destination: 'feed/blog.xml',
        title: 'Node.js Blog'
      })
    )
    .use(
      feed({
        collection: 'blogReleases',
        destination: 'feed/releases.xml',
        title: 'Node.js Blog: Releases'
      })
    )
    .use(
      feed({
        collection: 'blogVulnerability',
        destination: 'feed/vulnerability.xml',
        title: 'Node.js Blog: Vulnerability Reports'
      })
    )
    // Finally, this compiles the rest of the layouts present in ./layouts.
    // They're language-agnostic, but have to be regenerated for every locale
    // anyways.
    .use((files, metalsmith, done) => {
      const fsPromises = require('fs/promises');
      glob(
        `${metalsmith.path('layouts/partials')}/**/*.hbs`,
        {},
        async (err, matches) => {
          if (err) {
            throw err;
          }
          await Promise.all(
            matches.map(async (file) => {
              const contents = await fsPromises.readFile(file, 'utf8');
              const id = path.basename(file, path.extname(file));
              return Handlebars.registerPartial(id, contents);
            })
          );
          done();
        }
      );
    })
    .use((files, metalsmith, done) => {
      glob(
        `${metalsmith.path('scripts/helpers')}/**/*.js`,
        {},
        (err, matches) => {
          if (err) {
            throw err;
          }
          matches.forEach((file) => {
            const fn = require(path.resolve(file));
            const id = path.basename(file, path.extname(file));
            return Handlebars.registerHelper(id, fn);
          });
          done();
        }
      );
    })
    .use(layouts())
    // Pipes the generated files into their respective subdirectory in the build
    // directory.
    .destination(path.join(__dirname, 'build', locale));

  // This actually executes the build and stops the internal timer after
  // completion.
  metalsmith.build((err) => {
    if (err) {
      throw err;
    }
    console.timeEnd(labelForBuild);
  });
}

// This plugin reads the files present in the english locale that are missing
// in the current locale being built (requires preserveLocale flag)
function withPreserveLocale(preserveLocale) {
  return (files, m, next) => {
    if (preserveLocale) {
      const path = m.path('locale/en');
      m.read(path, (err, newfiles) => {
        if (err) {
          console.error(err);
          return next(err);
        }

        Object.keys(newfiles).forEach((key) => {
          if (!files[key]) {
            files[key] = newfiles[key];
          }
        });
        next();
      });
    } else {
      next();
    }
  };
}

// This function builds the static/css folder for all the Sass files.
async function buildCSS() {
  console.log('[sass] static/css started');
  const labelForBuild = '[sass] static/css finished';
  console.time(labelForBuild);

  const src = path.join(__dirname, 'layouts/css/styles.scss');
  const dest = path.join(__dirname, 'build/static/css/styles.css');

  const sassOpts = {
    outputStyle:
      process.env.NODE_ENV !== 'development' ? 'compressed' : 'expanded'
  };

  const graceFulFsPromise = gracefulFs.promises;

  await graceFulFsPromise.mkdir(path.join(__dirname, 'build/static/css'), {
    recursive: true
  });

  const result = await sass.compileAsync(src, sassOpts);

  postcss([autoprefixer])
    .process(result.css, { from: src })
    .then(async (res) => {
      res.warnings().forEach((warn) => {
        console.warn(warn.toString());
      });

      await graceFulFsPromise.writeFile(dest, res.css);
      console.timeEnd(labelForBuild);
    });
}

// This function copies the rest of the static assets to their subfolder in the
// build directory.
async function copyStatic() {
  console.log('[ncp] build/static started');
  const labelForBuild = '[ncp] build/static finished';
  console.time(labelForBuild);

  const graceFulFsPromise = gracefulFs.promises;

  await graceFulFsPromise.mkdir(path.join(__dirname, 'build/static'), {
    recursive: true
  });

  ncp(
    path.join(__dirname, 'static'),
    path.join(__dirname, 'build/static'),
    (error) => {
      if (error) {
        return console.error(error);
      }

      ncp(
        path.join(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
        path.join(__dirname, 'build/static/js/jquery.min.js'),
        (error) => {
          if (error) {
            return console.error(error);
          }

          ncp(
            path.join(
              __dirname,
              'node_modules/jquery.fancytable/dist/fancyTable.min.js'
            ),
            path.join(__dirname, 'build/static/js/fancyTable.min.js'),
            (error) => {
              if (error) {
                return console.error(error);
              }
              console.timeEnd(labelForBuild);
            }
          );
        }
      );
    }
  );
}

function getSource(callback) {
  // Loads all node/io.js versions.
  loadVersions((err, versions) => {
    latestVersionInfo = {
      current: latestVersion.current(versions),
      lts: latestVersion.lts(versions)
    };
    const source = {
      project: {
        versions,
        latestVersions: latestVersionInfo
      }
    };
    if (
      semver.gt(
        source.project.latestVersions.lts.node,
        source.project.latestVersions.current.node
      )
    ) {
      // If LTS is higher than Current hide it from the main page
      source.project.latestVersions.hideCurrent = true;
    }

    callback(err, source);
  });
}

// This is where the build is orchestrated from, as indicated by the function
// name. It brings together all build steps and dependencies and executes them.
function fullBuild(opts) {
  const { selectedLocales, preserveLocale } = opts;
  getSource(async (err, source) => {
    if (err) {
      throw err;
    }

    const graceFulFsPromise = gracefulFs.promises;
    const locales = await graceFulFsPromise.readdir(
      path.join(__dirname, 'locale')
    );

    const filteredLocales = locales.filter(
      (file) =>
        junk.not(file) &&
        (selectedLocales ? selectedLocales.includes(file) : true)
    );
    const localesData = generateLocalesData(filteredLocales);
    filteredLocales.forEach((locale) => {
      buildLocale(source, locale, { preserveLocale, localesData });
    });
  });
}

// Starts the build if the file was executed from the command line
if (require.main === module) {
  const preserveLocale = process.argv.includes('--preserveLocale');
  const selectedLocales = process.env.DEFAULT_LOCALE
    ? process.env.DEFAULT_LOCALE.toLowerCase().split(',')
    : process.env.DEFAULT_LOCALE;
  // Copy static files
  copyStatic();
  // Build CSS
  buildCSS();
  fullBuild({ selectedLocales, preserveLocale });
}

exports.getSource = getSource;
exports.fullBuild = fullBuild;
exports.buildCSS = buildCSS;
exports.buildLocale = buildLocale;
exports.copyStatic = copyStatic;
exports.generateLocalesData = generateLocalesData;
