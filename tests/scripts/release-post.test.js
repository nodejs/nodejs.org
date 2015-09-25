'use strict'

const test = require('tape')
const nock = require('nock')
const proxyquire = require('proxyquire').noCallThru()
const sinon = require('sinon')
const path = require('path')

test('explicitVersion(<version>)', (t) => {
  const releasePost = require('../../scripts/release-post')

  t.test('resolves when given a string argument', (t) => {
    releasePost.explicitVersion('4.1.1').then((version) => {
      t.equal(version, '4.1.1')
      t.end()
    })
  })

  t.test('rejects when given an falsy argument', (t) => {
    releasePost.explicitVersion().then(null, t.end)
  })

  t.end()
})

test('verifyDownloads(<version>)', (t) => {
  const downloads = () => {
    return [
      {
        'title': 'Source Code',
        'url': 'https://nodejs.org/dist/v4.1.1/node-v4.1.1.tar.gz'
      },
      {
        'title': 'ARMv6 32-bit Binary',
        'url': 'https://nodejs.org/dist/v4.1.1/node-v4.1.1-linux-armv6l.tar.gz'
      }
    ]
  }

  const releasePost = proxyquire('../../scripts/release-post', {
    './helpers/downloads': downloads
  })

  t.test('resolves to "<binary title>: url" when HEAD request succeed', (t) => {
    const nodejsorg = nock('https://nodejs.org')
      .head('/dist/v4.1.1/node-v4.1.1.tar.gz')
      .reply(200, 'OK')

    releasePost.verifyDownloads('4.1.1').then((results) => {
      const sourceDownload = results[0]

      t.equal(sourceDownload, 'Source Code: https://nodejs.org/dist/v4.1.1/node-v4.1.1.tar.gz')
      t.true(nodejsorg.isDone(), 'nodejs.org was requested')

      t.end()
    })
  })

  t.test('resolves to "<binary title>: *Coming soon*" when HEAD request fails', (t) => {
    const nodejsorg = nock('https://nodejs.org')
      .head('/dist/v4.1.1/node-v4.1.1-linux-armv6l.tar.gz')
      .reply(404, 'Not found')

    releasePost.verifyDownloads('4.1.1').then((results) => {
      const armDownload = results[1]

      t.equal(armDownload, 'ARMv6 32-bit Binary: *Coming soon*')
      t.true(nodejsorg.isDone(), 'nodejs.org was requested')

      t.end()
    })
  })

  t.end()
})

test('fetchShasums(<version>)', (t) => {
  const releasePost = require('../../scripts/release-post')

  t.test('resolves with content from response when succeeded', (t) => {
    const nodejsorg = nock('https://nodejs.org')
      .get('/dist/v4.1.1/SHASUMS256.txt.asc')
      .reply(200, 'LIST OF SHASUMS HERE')

    releasePost.fetchShasums('4.1.1').then((result) => {
      t.equal(result, 'LIST OF SHASUMS HERE')
      t.true(nodejsorg.isDone(), 'nodejs.org was requested')

      t.end()
    })
  })

  t.test('rejects with [INSERT SHASUMS HERE] when response fails', (t) => {
    const nodejsorg = nock('https://nodejs.org')
      .get('/dist/v4.1.1/SHASUMS256.txt.asc')
      .reply(404, 'Not found')

    releasePost.fetchShasums('4.1.1').then((result) => {
      t.equal(result, '[INSERT SHASUMS HERE]')
      t.true(nodejsorg.isDone(), 'nodejs.org was requested')

      t.end()
    })
  })

  t.end()
})

test('fetchChangelog(<version>)', (t) => {
  const releasePost = require('../../scripts/release-post')

  const changelogFixture = path.resolve(__dirname, 'CHANGELOG.fixture.md')

  t.test('resolves with section of changelog related to specified version', (t) => {
    const github = nock('https://raw.githubusercontent.com')
      .get('/nodejs/node/v4.1.1/CHANGELOG.md')
      .replyWithFile(200, changelogFixture)

    releasePost.fetchChangelog('4.1.1').then((changelog) => {
      t.true(changelog.includes('Fixed a bug introduced in v4.1.0'))
      t.true(github.isDone(), 'githubusercontent.com was requested')

      t.end()
    })
  })

  t.test('rejects when a matching version section could not be found in changelog', (t) => {
    const github = nock('https://raw.githubusercontent.com')
      .get('/nodejs/node/v4.1.1/CHANGELOG.md')
      .reply(200, 'A changelog without version sections...')

    releasePost.fetchChangelog('4.1.1').then(null, (err) => {
      t.equal(err.message, 'Couldnt find matching changelog for 4.1.1')
      t.true(github.isDone(), 'githubusercontent.com was requested')

      t.end()
    })
  })

  t.end()
})

test('findLatestVersion<version>', (t) => {
  const releasePost = require('../../scripts/release-post')

  t.test('fetches the latest version from nodejs.org', (t) => {
    nock('https://nodejs.org')
      .get('/dist/index.json')
      .reply(200, [
        { version: 'v4.1.1' },
        { version: 'v4.1.0' }
      ])

    releasePost.findLatestVersion().then((version) => {
      t.equal(version, '4.1.1')
      t.end()
    })
  })

  t.end()
})

test('writeToFile<object>', (t) => {
  let fileExists
  const fs = {
    existsSync: () => fileExists,
    writeFileSync: sinon.spy()
  }

  const releasePost = proxyquire('../../scripts/release-post', { fs })

  const results = {
    version: '4.1.1',
    content: 'Lets pretend this is a changelog'
  }

  t.test('rejects when blog post already exists', (t) => {
    fileExists = true

    releasePost.writeToFile(results).then(null, (err) => {
      t.equal(err.message, 'Release post for 4.1.1 already exists!')
      t.end()
    })
  })

  t.test('writes content to locale/en/blog/release/v<VERSION>.md', (t) => {
    fileExists = false

    releasePost.writeToFile(results).then(() => {
      const expectedPath = path.resolve(__dirname, '..', '..', 'locale', 'en', 'blog', 'release', `v${results.version}.md`)

      t.true(fs.writeFileSync.calledWith(expectedPath, 'Lets pretend this is a changelog'))
      t.end()
    }, t.fail)
  })

  t.end()
})

