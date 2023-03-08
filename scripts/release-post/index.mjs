#!/usr/bin/env node

/**
 * What's this?? It will help you create release blog
 * posts so you won't have to do the tedious work
 * of stitching together data from changelog, shasums etc,
 * but get a more or less complete release blog ready to go.
 *
 * Usage: $ node index.js [version]
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

import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import { fileURLToPath } from 'node:url';

import downloadsTable from './downloadsTable.mjs';
import { getRelativePath } from '../next-data/_helpers.mjs';

// this allows us to get the current module working directory
const __dirname = getRelativePath(import.meta.url);

const sendRequest = opts => {
  const options = {
    headers: { 'User-Agent': 'nodejs.org release blog post script' },
    ...opts,
  };

  return fetch(options.url, options).then(resp => {
    if (resp.status !== 200) {
      throw new Error(
        `Invalid status code (!= 200) while retrieving ${options.url}: ${resp.status}`
      );
    }

    return options.json ? resp.json() : resp.text();
  });
};

const explicitVersion = version => {
  return version
    ? Promise.resolve(version)
    : Promise.reject(new Error('Invalid "version" argument'));
};

const findLatestVersion = () => {
  return sendRequest({
    url: 'https://nodejs.org/dist/index.json',
    json: true,
  }).then(versions => versions[0].version.substr(1));
};

const fetchDocs = version => {
  return Promise.all([
    fetchChangelogBody(version),
    fetchAuthor(version),
    fetchVersionPolicy(version),
    fetchShasums(version),
    verifyDownloads(version),
  ]).then(results => {
    const [changelog, author, versionPolicy, shasums, files] = results;

    return {
      version,
      changelog,
      author,
      versionPolicy,
      shasums,
      files,
    };
  });
};

const fetchAuthor = version => {
  return fetchChangelog(version)
    .then(section => findAuthorLogin(version, section))
    .then(author =>
      sendRequest({ url: `https://api.github.com/users/${author}`, json: true })
    )
    .then(githubRes => githubRes.name);
};

const fetchChangelog = version => {
  const parts = version.split('.');
  const releaseLine = parts[0] === '0' ? parts.slice(0, 2).join('') : parts[0];

  return sendRequest({
    url: `https://raw.githubusercontent.com/nodejs/node/main/doc/changelogs/CHANGELOG_V${releaseLine}.md`,
  }).then(data => {
    // matches a complete release section
    const rxSection = new RegExp(
      `<a id="${version}"></a>\\n([\\s\\S]+?)(?:\\n<a id="|$)`
    );

    const matches = rxSection.exec(data);

    return matches
      ? matches[1].trim()
      : Promise.reject(
          new Error(`Couldn't find matching changelog for ${version}`)
        );
  });
};

const fetchChangelogBody = version => {
  return fetchChangelog(version).then(section => {
    const rxSectionBody = /(### Notable [\s\S]*)/;

    // Make sure that all the console has been replaced
    // by "```shell-session" for metalsmith-prism's check to pass
    const rxSectionConsole = /```console/gim;
    const matches = rxSectionBody.exec(section);

    return matches
      ? matches[1].trim().replace(rxSectionConsole, '```shell-session')
      : Promise.reject(
          new Error(`Could not find changelog body of ${version} release`)
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
    return matches
      ? matches[1]
      : Promise.reject(
          new Error(
            `Could not find version policy of ${version} in its changelog`
          )
        );
  });
};

const fetchShasums = version => {
  return sendRequest({
    url: `https://nodejs.org/dist/v${version}/SHASUMS256.txt.asc`,
  }).then(null, () => '[INSERT SHASUMS HERE]');
};

const verifyDownloads = version => {
  const allDownloads = downloadsTable(version);
  const reqs = allDownloads.map(urlOrComingSoon);

  return Promise.all(reqs);
};

const findAuthorLogin = (version, section) => {
  // looking for the @author part of the release header, eg:
  // ## 2016-03-08, Version 5.8.0 (Stable). @Fishrock123
  // ## 2015-10-13, Version 4.2.1 'Argon' (LTS), @jasnell
  // ## 2015-09-08, Version 4.0.0 (Stable), @rvagg
  const rxReleaseAuthor = /^## .*? \([^)]+\)[,.] @(\S+)/;
  const matches = rxReleaseAuthor.exec(section);

  return matches
    ? matches[1]
    : Promise.reject(
        new Error(`Couldn't find @author of ${version} release :(`)
      );
};

const urlOrComingSoon = binary => {
  const url = binary.url.replace('nodejs.org', 'direct.nodejs.org');

  return sendRequest({ url, method: 'HEAD' }).then(
    () => `${binary.title}: ${binary.url}`,
    () => {
      console.log(`\x1B[32m "${binary.title}" is Coming soon...\x1B[39m`);
      return `${binary.title}: *Coming soon*`;
    }
  );
};

const renderPost = results => {
  const templateStr = fs
    .readFileSync(path.resolve(__dirname, 'template.hbs'))
    .toString('utf8');

  const template = handlebars.compile(templateStr, { noEscape: true });

  const view = Object.assign(
    {
      date: new Date().toISOString(),
      versionSlug: slugify(results.version),
    },
    results
  );

  return Object.assign(
    {
      content: template(view),
    },
    results
  );
};

const writeToFile = results => {
  const filepath = path.resolve(
    __dirname,
    '..',
    '..',
    'pages',
    'en',
    'blog',
    'release',
    `v${results.version}.md`
  );

  return new Promise((resolve, reject) => {
    if (fs.existsSync(filepath) && process.argv[3] !== '--force') {
      return reject(
        new Error(`Release post for ${results.version} already exists!`)
      );
    }

    try {
      fs.writeFileSync(filepath, results.content);
    } catch (error) {
      return reject(
        new Error(`Failed to write Release post: Reason: ${error.message}`)
      );
    }

    resolve(filepath);
  });
};

const slugify = str => {
  return str.replace(/\./g, '-');
};

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
  const modulePath = fileURLToPath(import.meta.url);

  if (process.argv[1] === modulePath) {
    explicitVersion(process.argv[2])
      .then(null, findLatestVersion)
      .then(fetchDocs)
      .then(renderPost)
      .then(writeToFile)
      .then(
        filepath => {
          console.log('Release post created:', filepath);
        },
        err => {
          console.error('Some error occurred here!', err.stack);
          process.exit(1);
        }
      );
  }
}
