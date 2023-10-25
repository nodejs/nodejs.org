#!/usr/bin/env node

/**
 * What's this?? It will help you create release blog
 * posts so you won't have to do the tedious work
 * of stitching together data from changelog, shasums etc,
 * but get a more or less complete release blog ready to go.
 *
 * Usage: $ node index.mjs [version]
 *
 * If the version argument is omitted, the latest version number
 * will be picked from https://nodejs.org/dist/index.json.
 *
 * It'll create a file with the blog post content
 * into ../../pages/en/blog/release/vX.md ready for you to commit
 * or possibly edit by hand before committing.
 *
 * Happy releasing!
 */

'use strict';

import { existsSync, readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import handlebars from 'handlebars';
import { format } from 'prettier';

import { downloadsTable } from './downloadsTable.mjs';
import prettierConfig from '../../.prettierrc.json' assert { type: 'json' };
import { getRelativePath } from '../../next.helpers.mjs';

const URLS = {
  NODE_DIST_JSON: 'https://nodejs.org/dist/index.json',
  GITHUB_PROFILE: author => `https://api.github.com/users/${author}`,
  NODE_CHANGELOG_MD: releaseLine =>
    `https://raw.githubusercontent.com/nodejs/node/main/doc/changelogs/CHANGELOG_V${releaseLine}.md`,
  NODE_SHASUM: version =>
    `https://nodejs.org/dist/v${version}/SHASUMS256.txt.asc`,
};

const ERRORS = {
  NO_VERSION_PROVIDED: new Error('No version provided'),
  RELEASE_EXISTS: version =>
    new Error(`Release post for ${version} already exists!`),
  NO_AUTHOR_FOUND: version =>
    new Error(`Couldn't find @author of ${version} release :(`),
  NO_VERSION_POLICY: version =>
    new Error(`Could not find version policy of ${version} in its changelog`),
  NO_CHANGELOG_FOUND: version =>
    new Error(`Couldn't find matching changelog for ${version}`),
  INVALID_STATUS_CODE: (url, status) =>
    new Error(`Invalid status (!= 200) while retrieving ${url}: ${status}`),
  FAILED_FILE_FORMATTING: reason =>
    new Error(`Failed to format Release post: Reason: ${reason}`),
  FAILED_FILE_CREATION: reason =>
    new Error(`Failed to write Release post: Reason: ${reason}`),
};

const ARGS = {
  CURRENT_PATH: process.argv[1],
  SPECIFIC_VERSION: process.argv[2] && process.argv[2].replace('--force', ''),
  SHOULD_FORCE: (process.argv[3] || process.argv[2]) === '--force',
};

// this allows us to get the current module working directory
const __dirname = getRelativePath(import.meta.url);

const request = options => {
  return fetch(options.url, options).then(resp => {
    if (resp.status !== 200) {
      throw ERRORS.INVALID_STATUS_CODE(options.url, resp.status);
    }

    return options.json ? resp.json() : resp.text();
  });
};

const explicitVersion = version =>
  new Promise((resolve, reject) =>
    version && version.length > 0
      ? resolve(version)
      : reject(ERRORS.NO_VERSION_PROVIDED)
  );

const findLatestVersion = () =>
  request({ url: URLS.NODE_DIST_JSON, json: true })
    .then(versions => versions.length && versions[0])
    .then(({ version }) => version.substr(1));

const fetchDocs = version => {
  const blogPostPieces = [
    fetchChangelogBody(version),
    fetchAuthor(version),
    fetchVersionPolicy(version),
    fetchShasums(version),
    verifyDownloads(version),
  ];

  return Promise.all(blogPostPieces).then(
    ([changelog, author, versionPolicy, shasums, files]) => ({
      version,
      changelog,
      author,
      versionPolicy,
      shasums,
      files,
    })
  );
};

const fetchAuthor = version => {
  return fetchChangelog(version)
    .then(section => findAuthorLogin(version, section))
    .then(author => request({ url: URLS.GITHUB_PROFILE(author), json: true }))
    .then(githubRes => githubRes.name);
};

const fetchChangelog = version => {
  const parts = version.split('.');
  const releaseLine = parts[0] === '0' ? parts.slice(0, 2).join('') : parts[0];

  return request({ url: URLS.NODE_CHANGELOG_MD(releaseLine) }).then(data => {
    // matches a complete release section
    const rxSection = new RegExp(
      `<a id="${version}"></a>\\n([\\s\\S]+?)(?:\\n<a id="|$)`
    );

    const matches = rxSection.exec(data);

    return new Promise((resolve, reject) =>
      matches && matches.length && matches[1]
        ? resolve(matches[1].trim())
        : reject(ERRORS.NO_CHANGELOG_FOUND(version))
    );
  });
};

const fetchChangelogBody = version => {
  return fetchChangelog(version).then(section => {
    const replaceAsteriskLists = str =>
      str.replace(/^([ ]{0,4})(\* )/gm, '$1- ');

    return new Promise(resolve =>
      resolve(replaceAsteriskLists(section.trim()))
    );
  });
};

const fetchVersionPolicy = version => {
  return fetchChangelog(version).then(section => {
    // matches the policy for a given version (Stable, LTS etc) in the changelog
    // ## 2015-10-07, Version 4.2.0 'Argon' (LTS), @jasnell
    // ## 2015-12-04, Version 0.12.9 (LTS), @rvagg
    const rxPolicy = /^## ?\d{4}-\d{2}-\d{2}, Version [^(].*\(([^)]+)\)/;
    const matches = rxPolicy.exec(section);

    return new Promise((resolve, reject) =>
      matches && matches.length && matches[1]
        ? resolve(matches[1])
        : reject(ERRORS.NO_VERSION_POLICY(version))
    );
  });
};

const fetchShasums = version =>
  request({ url: URLS.NODE_SHASUM(version) }).then(
    result => result.trim(),
    () => '[INSERT SHASUMS HERE]'
  );

const verifyDownloads = version =>
  Promise.all(downloadsTable(version).map(urlOrComingSoon));

const findAuthorLogin = (version, section) => {
  // looking for the @author part of the release header, eg:
  // ## 2016-03-08, Version 5.8.0 (Stable). @Fishrock123
  // ## 2015-10-13, Version 4.2.1 'Argon' (LTS), @jasnell
  // ## 2015-09-08, Version 4.0.0 (Stable), @rvagg
  const rxReleaseAuthor = /^## .*? \([^)]+\)[,.] @(\S+)/;
  const matches = rxReleaseAuthor.exec(section);

  return new Promise((resolve, reject) =>
    matches && matches.length && matches[1]
      ? resolve(matches[1])
      : reject(ERRORS.RELEASE_EXISTS(version))
  );
};

const urlOrComingSoon = binary => {
  return request({ url: binary.url, method: 'HEAD' }).then(
    () => `${binary.title}: ${binary.url}`,
    () => `${binary.title}: *Coming soon*`
  );
};

const renderPost = results => {
  const blogTemplateSource = readFileSync(
    resolve(__dirname, 'template.hbs'),
    'utf8'
  );

  const template = handlebars.compile(blogTemplateSource, { noEscape: true });

  const templateParameters = {
    date: new Date().toISOString(),
    versionSlug: slugify(results.version),
    ...results,
  };

  return { content: template(templateParameters), ...results };
};

const formatPost = results => {
  return new Promise((resolve, reject) => {
    format(results.content, { ...prettierConfig, parser: 'markdown' })
      .then(content => resolve({ ...results, content }))
      .catch(error => reject(ERRORS.FAILED_FILE_FORMATTING(error.message)));
  });
};

const writeToFile = results => {
  const blogPostPath = resolve(
    __dirname,
    '../../pages/en/blog/release',
    `v${results.version}.md`
  );

  return new Promise((resolve, reject) => {
    if (existsSync(blogPostPath) && !ARGS.SHOULD_FORCE) {
      reject(ERRORS.RELEASE_EXISTS(results.version));
      return;
    }

    writeFile(blogPostPath, results.content)
      .then(() => resolve(blogPostPath))
      .catch(error => reject(ERRORS.FAILED_FILE_CREATION(error.message)));
  });
};

const slugify = str => str.replace(/\./g, '-');

export {
  explicitVersion,
  fetchShasums,
  writeToFile,
  findLatestVersion,
  verifyDownloads,
  fetchChangelog,
  fetchChangelogBody,
  fetchAuthor,
  fetchVersionPolicy,
};

// This allows us to verify that the script is being run directly from node.js/cli
if (import.meta.url.startsWith('file:')) {
  if (ARGS.CURRENT_PATH === `${__dirname}index.mjs`) {
    explicitVersion(ARGS.SPECIFIC_VERSION)
      .then(null, findLatestVersion)
      .then(fetchDocs)
      .then(renderPost)
      .then(formatPost)
      .then(writeToFile)
      .then(
        filepath => console.log('Release post created:', filepath),
        error => console.error('Some error occurred here!', error.stack)
      );
  }
}
