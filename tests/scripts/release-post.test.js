'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const nock = require('nock');
const proxyquire = require('proxyquire').noCallThru();
const path = require('path');

test('explicitVersion(<version>)', async (t) => {
  const releasePost = require('../../scripts/release-post');

  await t.test('resolves when given a string argument', async () => {
    const actualVersion = await releasePost.explicitVersion('4.1.1');
    assert.equal(actualVersion, '4.1.1');
  });

  await t.test('rejects when given an falsy argument', async () => {
    try {
      await releasePost.explicitVersion();
    } catch (err) {
      assert.equal(err.constructor, Error);
      assert.equal(err.message, 'Invalid "version" argument');
    }
  });
});

test('verifyDownloads(<version>)', async (t) => {
  const downloads = () => {
    return [
      {
        title: 'Source Code',
        url: 'https://nodejs.org/dist/v4.1.1/node-v4.1.1.tar.gz'
      },
      {
        title: 'ARMv6 32-bit Binary',
        url: 'https://nodejs.org/dist/v4.1.1/node-v4.1.1-linux-armv6l.tar.gz'
      }
    ];
  };

  const releasePost = proxyquire('../../scripts/release-post', {
    './helpers/downloads': downloads
  });

  await t.test(
    'resolves to "<binary title>: url" when HEAD request succeed',
    async () => {
      const nodejsorg = nock('https://direct.nodejs.org')
        .head('/dist/v4.1.1/node-v4.1.1.tar.gz')
        .reply(200, 'OK');

      const results = await releasePost.verifyDownloads('4.1.1');
      const sourceDownload = results[0];

      assert.equal(
        sourceDownload,
        'Source Code: https://nodejs.org/dist/v4.1.1/node-v4.1.1.tar.gz'
      );
      assert.ok(nodejsorg.isDone(), 'nodejs.org was requested');
    }
  );

  await t.test(
    'resolves to "<binary title>: *Coming soon*" when HEAD request fails',
    async () => {
      const nodejsorg = nock('https://direct.nodejs.org')
        .head('/dist/v4.1.1/node-v4.1.1-linux-armv6l.tar.gz')
        .reply(404, 'Not found');

      const results = await releasePost.verifyDownloads('4.1.1');
      const armDownload = results[1];

      assert.equal(armDownload, 'ARMv6 32-bit Binary: *Coming soon*');
      assert.ok(nodejsorg.isDone(), 'nodejs.org was requested');
    }
  );
});

test('fetchShasums(<version>)', async (t) => {
  const releasePost = require('../../scripts/release-post');

  await t.test(
    'resolves with content from response when succeeded',
    async () => {
      const nodejsorg = nock('https://nodejs.org')
        .get('/dist/v4.1.1/SHASUMS256.txt.asc')
        .reply(200, 'LIST OF SHASUMS HERE');

      const result = await releasePost.fetchShasums('4.1.1');
      assert.equal(result, 'LIST OF SHASUMS HERE');
      assert.ok(nodejsorg.isDone());
    }
  );

  await t.test(
    'rejects with [INSERT SHASUMS HERE] when response fails',
    async () => {
      const nodejsorg = nock('https://nodejs.org')
        .get('/dist/v4.1.1/SHASUMS256.txt.asc')
        .reply(404, 'Not found');

      const result = await releasePost.fetchShasums('4.1.1');
      assert.equal(result, '[INSERT SHASUMS HERE]');
      assert.ok(nodejsorg.isDone());
    }
  );
});

test('fetchChangelog(<version>)', async (t) => {
  const releasePost = require('../../scripts/release-post');

  const changelogFixture = path.resolve(__dirname, 'CHANGELOG.fixture.md');
  const changelogLegacyFixture = path.resolve(
    __dirname,
    'CHANGELOG.fixture.legacy.md'
  );

  await t.test(
    'resolves with section of changelog related to specified version',
    async () => {
      const github = nock('https://raw.githubusercontent.com')
        .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V4.md')
        .replyWithFile(200, changelogFixture);

      const changelog = await releasePost.fetchChangelog('4.1.1');
      assert.ok(changelog.charAt(changelog.length - 1) !== '\n');
      assert.ok(changelog.charAt(0) !== '\n');
      assert.ok(changelog.includes('Fixed a bug introduced in v4.1.0'));
      assert.ok(github.isDone());
    }
  );

  await t.test(
    'can fetch changelog of legacy versions of Node.js',
    async () => {
      const github = nock('https://raw.githubusercontent.com')
        .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V012.md')
        .replyWithFile(200, changelogLegacyFixture);

      const changelog = await releasePost.fetchChangelog('0.12.9');
      assert.ok(changelog.includes('Security Update'));
      assert.ok(github.isDone());
    }
  );

  await t.test(
    'rejects when a matching version section could not be found in changelog',
    async () => {
      const github = nock('https://raw.githubusercontent.com')
        .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V012.md')
        .reply(200, changelogLegacyFixture);

      try {
        await releasePost.fetchChangelog('0.12.1000');
      } catch (err) {
        assert.equal(err.constructor, Error);
        assert.equal(
          err.message,
          "Couldn't find matching changelog for 0.12.1000"
        );
        assert.ok(github.isDone());
      }
    }
  );
});

test('fetchChangelogBody(<version>)', async (t) => {
  const releasePost = require('../../scripts/release-post');

  await t.test(
    'does not include `## header` in matched version section',
    async () => {
      const changelogFixture = path.resolve(__dirname, 'CHANGELOG.fixture.md');

      const github = nock('https://raw.githubusercontent.com')
        .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V4.md')
        .replyWithFile(200, changelogFixture);

      const body = await releasePost.fetchChangelogBody('4.1.0');
      assert.ok(body.startsWith('### Notable changes'));
      assert.ok(github.isDone(), 'githubusercontent.com was requested');
    }
  );

  await t.test('does not include "```console', async () => {
    const changelogFixture = path.resolve(
      __dirname,
      'CHANGELOG.fixture.withconsole.md'
    );

    const githubWithConsole = nock('https://raw.githubusercontent.com')
      .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V15.md')
      .replyWithFile(200, changelogFixture);

    const body = await releasePost.fetchChangelogBody('15.1.0');
    assert.ok(!body.includes('```console'));
    assert.ok(
      githubWithConsole.isDone(),
      'githubusercontent.com was requested'
    );
  });
});

test('fetchVersionPolicy(<version>)', async (t) => {
  const releasePost = require('../../scripts/release-post');

  const changelogFixture = path.resolve(__dirname, 'CHANGELOG.fixture.md');
  const changelogLegacyFixture = path.resolve(
    __dirname,
    'CHANGELOG.fixture.legacy.md'
  );

  await t.test('finds "Current" version policy', async () => {
    const github = nock('https://raw.githubusercontent.com')
      .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V4.md')
      .replyWithFile(200, changelogFixture);

    const policy = await releasePost.fetchVersionPolicy('4.1.0');
    assert.equal(policy, 'Stable');
    assert.ok(github.isDone(), 'githubusercontent.com was requested');
  });

  await t.test('finds "LTS" version policy', async () => {
    const github = nock('https://raw.githubusercontent.com')
      .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V4.md')
      .replyWithFile(200, changelogFixture);

    const policy = await releasePost.fetchVersionPolicy('4.2.0');
    assert.equal(policy, 'LTS');
    assert.ok(github.isDone(), 'githubusercontent.com was requested');
  });

  await t.test('finds "LTS" version policy in legacy changelogs', async () => {
    const github = nock('https://raw.githubusercontent.com')
      .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V012.md')
      .replyWithFile(200, changelogLegacyFixture);

    const policy = await releasePost.fetchVersionPolicy('0.12.9');
    assert.equal(policy, 'LTS');
    assert.ok(github.isDone(), 'githubusercontent.com was requested');
  });
});

test('fetchAuthor(<version>)', async (t) => {
  const releasePost = require('../../scripts/release-post');

  const changelogFixture = path.resolve(__dirname, 'CHANGELOG.fixture.md');

  await t.test(
    'resolves with full name of release author via github.com',
    async () => {
      const github = nock('https://raw.githubusercontent.com')
        .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V4.md')
        .replyWithFile(200, changelogFixture);

      const api = nock('https://api.github.com')
        .get('/users/rvagg')
        .reply(200, {
          login: 'rvagg',
          name: 'Rod Vagg'
        });

      const author = await releasePost.fetchAuthor('4.1.1');
      assert.equal(author, 'Rod Vagg');
      assert.ok(github.isDone(), 'githubusercontent.com was requested');
      assert.ok(api.isDone(), 'api.github.com was requested');
    }
  );

  await t.test(
    'rejects when a matching version section could not be found in changelog',
    async () => {
      const github = nock('https://raw.githubusercontent.com')
        .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V4.md')
        .reply(200, 'A changelog without version sections...');

      try {
        await releasePost.fetchAuthor('4.1.1');
      } catch (err) {
        assert.equal(err.message, "Couldn't find matching changelog for 4.1.1");
        assert.ok(github.isDone(), 'githubusercontent.com was requested');
      }
    }
  );
});

test('findLatestVersion<version>', async (t) => {
  const releasePost = require('../../scripts/release-post');

  await t.test('fetches the latest version from nodejs.org', async () => {
    nock('https://nodejs.org')
      .get('/dist/index.json')
      .reply(200, [{ version: 'v4.1.1' }, { version: 'v4.1.0' }]);

    const version = await releasePost.findLatestVersion();
    assert.equal(version, '4.1.1');
  });
});

test('writeToFile<object>', async (t) => {
  let fileExists;

  const fs = {
    access: (_, __, cb) => cb(!fileExists && new Error('ENOENT')),
    writeFile: (_, __, cb) => cb()
  };

  const releasePost = proxyquire('../../scripts/release-post', { fs });

  const results = {
    version: '4.1.1',
    content: 'Lets pretend this is a changelog'
  };

  await t.test('rejects when blog post already exists', async () => {
    fileExists = true;

    try {
      await releasePost.writeToFile(results);
    } catch (err) {
      assert.equal(err.message, 'Release post for 4.1.1 already exists!');
    }
  });

  await t.test(
    'writes content to locale/en/blog/release/v<VERSION>.md',
    async () => {
      fileExists = false;

      const filepath = await releasePost.writeToFile(results);
      const expectedPath = path.resolve(
        __dirname,
        '..',
        '..',
        'locale',
        'en',
        'blog',
        'release',
        `v${results.version}.md`
      );
      assert.equal(filepath, expectedPath);
    }
  );
});
