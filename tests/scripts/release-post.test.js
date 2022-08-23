'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const nock = require('nock');
const proxyquire = require('proxyquire').noCallThru();
const path = require('path');

test('explicitVersion(<version>)', async (t) => {
  const releasePost = require('../../scripts/release-post');

  await t.test('resolves when given a string argument', (_, done) => {
    releasePost.explicitVersion('4.1.1').then((version) => {
      assert.equal(version, '4.1.1');
      done();
    });
  });

  await t.test('rejects when given an falsy argument', (_, done) => {
    releasePost.explicitVersion().then(null, (err) => {
      assert.equal(err.constructor, Error);
      assert.equal(err.message, 'Invalid "version" argument');
      done();
    });
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
    (_, done) => {
      const nodejsorg = nock('https://direct.nodejs.org')
        .head('/dist/v4.1.1/node-v4.1.1.tar.gz')
        .reply(200, 'OK');

      releasePost.verifyDownloads('4.1.1').then((results) => {
        const sourceDownload = results[0];

        assert.equal(
          sourceDownload,
          'Source Code: https://nodejs.org/dist/v4.1.1/node-v4.1.1.tar.gz'
        );
        assert.ok(nodejsorg.isDone(), 'nodejs.org was requested');

        done();
      });
    }
  );

  await t.test(
    'resolves to "<binary title>: *Coming soon*" when HEAD request fails',
    (_, done) => {
      const nodejsorg = nock('https://direct.nodejs.org')
        .head('/dist/v4.1.1/node-v4.1.1-linux-armv6l.tar.gz')
        .reply(404, 'Not found');

      releasePost.verifyDownloads('4.1.1').then((results) => {
        const armDownload = results[1];

        assert.equal(armDownload, 'ARMv6 32-bit Binary: *Coming soon*');
        assert.ok(nodejsorg.isDone(), 'nodejs.org was requested');
        done();
      });
    }
  );
});

test('fetchShasums(<version>)', async (t) => {
  const releasePost = require('../../scripts/release-post');

  await t.test(
    'resolves with content from response when succeeded',
    (_, done) => {
      const nodejsorg = nock('https://nodejs.org')
        .get('/dist/v4.1.1/SHASUMS256.txt.asc')
        .reply(200, 'LIST OF SHASUMS HERE');

      releasePost.fetchShasums('4.1.1').then((result) => {
        assert.equal(result, 'LIST OF SHASUMS HERE');
        assert.ok(nodejsorg.isDone());
        done();
      });
    }
  );

  await t.test(
    'rejects with [INSERT SHASUMS HERE] when response fails',
    (_, done) => {
      const nodejsorg = nock('https://nodejs.org')
        .get('/dist/v4.1.1/SHASUMS256.txt.asc')
        .reply(404, 'Not found');

      releasePost.fetchShasums('4.1.1').then((result) => {
        assert.equal(result, '[INSERT SHASUMS HERE]');
        assert.ok(nodejsorg.isDone());
        done();
      });
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
    (_, done) => {
      const github = nock('https://raw.githubusercontent.com')
        .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V4.md')
        .replyWithFile(200, changelogFixture);

      releasePost.fetchChangelog('4.1.1').then((changelog) => {
        assert.ok(changelog.charAt(changelog.length - 1) !== '\n');
        assert.ok(changelog.charAt(0) !== '\n');
        assert.ok(changelog.includes('Fixed a bug introduced in v4.1.0'));
        assert.ok(github.isDone());
        done();
      });
    }
  );

  await t.test(
    'can fetch changelog of legacy versions of Node.js',
    (_, done) => {
      const github = nock('https://raw.githubusercontent.com')
        .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V012.md')
        .replyWithFile(200, changelogLegacyFixture);

      releasePost.fetchChangelog('0.12.9').then((changelog) => {
        assert.ok(changelog.includes('Security Update'));
        assert.ok(github.isDone());
        done();
      });
    }
  );

  await t.test(
    'rejects when a matching version section could not be found in changelog',
    (_, done) => {
      const github = nock('https://raw.githubusercontent.com')
        .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V012.md')
        .reply(200, changelogLegacyFixture);

      releasePost.fetchChangelog('0.12.1000').then(t.fail, (err) => {
        assert.equal(
          err.message,
          "Couldn't find matching changelog for 0.12.1000"
        );
        assert.ok(github.isDone());
        done();
      });
    }
  );
});

test('fetchChangelogBody(<version>)', async (t) => {
  const releasePost = require('../../scripts/release-post');

  await t.test(
    'does not include `## header` in matched version section',
    (_, done) => {
      const changelogFixture = path.resolve(__dirname, 'CHANGELOG.fixture.md');

      const github = nock('https://raw.githubusercontent.com')
        .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V4.md')
        .replyWithFile(200, changelogFixture);

      releasePost.fetchChangelogBody('4.1.0').then((body) => {
        assert.ok(body.startsWith('### Notable changes'));
        assert.ok(github.isDone(), 'githubusercontent.com was requested');
        done();
      }, t.fail);
    }
  );

  await t.test('does not include "```console', (_, done) => {
    const changelogFixture = path.resolve(
      __dirname,
      'CHANGELOG.fixture.withconsole.md'
    );

    const githubWithConsole = nock('https://raw.githubusercontent.com')
      .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V15.md')
      .replyWithFile(200, changelogFixture);

    releasePost.fetchChangelogBody('15.1.0').then((body) => {
      assert.ok(!body.includes('```console'));
      assert.ok(
        githubWithConsole.isDone(),
        'githubusercontent.com was requested'
      );
      done();
    });
  });
});

test('fetchVersionPolicy(<version>)', async (t) => {
  const releasePost = require('../../scripts/release-post');

  const changelogFixture = path.resolve(__dirname, 'CHANGELOG.fixture.md');
  const changelogLegacyFixture = path.resolve(
    __dirname,
    'CHANGELOG.fixture.legacy.md'
  );

  await t.test('finds "Current" version policy', (_, done) => {
    const github = nock('https://raw.githubusercontent.com')
      .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V4.md')
      .replyWithFile(200, changelogFixture);

    releasePost.fetchVersionPolicy('4.1.0').then((policy) => {
      assert.equal(policy, 'Stable');
      assert.ok(github.isDone(), 'githubusercontent.com was requested');
      done();
    }, t.fail);
  });

  await t.test('finds "LTS" version policy', (_, done) => {
    const github = nock('https://raw.githubusercontent.com')
      .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V4.md')
      .replyWithFile(200, changelogFixture);

    releasePost.fetchVersionPolicy('4.2.0').then((policy) => {
      assert.equal(policy, 'LTS');
      assert.ok(github.isDone(), 'githubusercontent.com was requested');
      done();
    });
  });

  await t.test('finds "LTS" version policy in legacy changelogs', (_, done) => {
    const github = nock('https://raw.githubusercontent.com')
      .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V012.md')
      .replyWithFile(200, changelogLegacyFixture);

    releasePost.fetchVersionPolicy('0.12.9').then((policy) => {
      assert.equal(policy, 'LTS');
      assert.ok(github.isDone(), 'githubusercontent.com was requested');
      done();
    });
  });
});

test('fetchAuthor(<version>)', async (t) => {
  const releasePost = require('../../scripts/release-post');

  const changelogFixture = path.resolve(__dirname, 'CHANGELOG.fixture.md');

  await t.test(
    'resolves with full name of release author via github.com',
    (_, done) => {
      const github = nock('https://raw.githubusercontent.com')
        .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V4.md')
        .replyWithFile(200, changelogFixture);

      const api = nock('https://api.github.com')
        .get('/users/rvagg')
        .reply(200, {
          login: 'rvagg',
          name: 'Rod Vagg'
        });

      releasePost.fetchAuthor('4.1.1').then((author) => {
        assert.equal(author, 'Rod Vagg');
        assert.ok(github.isDone(), 'githubusercontent.com was requested');
        assert.ok(api.isDone(), 'api.github.com was requested');
        done();
      });
    }
  );

  await t.test(
    'rejects when a matching version section could not be found in changelog',
    (_, done) => {
      const github = nock('https://raw.githubusercontent.com')
        .get('/nodejs/node/main/doc/changelogs/CHANGELOG_V4.md')
        .reply(200, 'A changelog without version sections...');

      releasePost.fetchAuthor('4.1.1').then(null, (err) => {
        assert.equal(err.message, "Couldn't find matching changelog for 4.1.1");
        assert.ok(github.isDone(), 'githubusercontent.com was requested');
        done();
      });
    }
  );
});

test('findLatestVersion<version>', async (t) => {
  const releasePost = require('../../scripts/release-post');

  await t.test('fetches the latest version from nodejs.org', (_, done) => {
    nock('https://nodejs.org')
      .get('/dist/index.json')
      .reply(200, [{ version: 'v4.1.1' }, { version: 'v4.1.0' }]);

    releasePost.findLatestVersion().then((version) => {
      assert.equal(version, '4.1.1');
      done();
    });
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

  await t.test('rejects when blog post already exists', (_, done) => {
    fileExists = true;

    releasePost.writeToFile(results).then(t.fail, (err) => {
      assert.equal(err.message, 'Release post for 4.1.1 already exists!');
      done();
    });
  });

  await t.test(
    'writes content to locale/en/blog/release/v<VERSION>.md',
    (_, done) => {
      fileExists = false;

      releasePost.writeToFile(results).then((filepath) => {
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
        done();
      });
    }
  );
});
