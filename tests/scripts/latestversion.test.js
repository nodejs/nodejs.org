'use strict'

const test = require('tape')

const latestversion = require('../../scripts/helpers/latestversion')

test('latestversion.current()', (t) => {
  t.test('should be greater equal/greater than v5.0.0', (t) => {
    const currentVersion = latestversion.current([
      { version: 'v4.2.1', lts: true },
      { version: 'v0.12.7', lts: false }
    ])

    t.equal(currentVersion, undefined)
    t.end()
  })

  t.test('should not be an LTS release', (t) => {
    const currentVersion = latestversion.current([
      { version: 'v5.0.0', lts: false },
      { version: 'v4.2.1', lts: true },
      { version: 'v0.12.7', lts: false }
    ])

    t.equal(currentVersion, 'v5.0.0')
    t.end()
  })

  t.end()
})

test('latestversion.lts()', (t) => {
  t.test('should be an LTS release', (t) => {
    const ltsVersion = latestversion.lts([
      { version: 'v4.2.1', lts: true },
      { version: 'v0.12.7', lts: false }
    ])

    t.equal(ltsVersion, 'v4.2.1')
    t.end()
  })

  t.test('should pick latest LTS release', (t) => {
    const ltsVersion = latestversion.lts([
      { version: 'v5.0.0', lts: false },
      { version: 'v4.2.1', lts: true },
      { version: 'v4.2.0', lts: true },
      { version: 'v0.12.7', lts: false }
    ])

    t.equal(ltsVersion, 'v4.2.1')
    t.end()
  })

  t.end()
})
