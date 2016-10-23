'use strict'

const test = require('tape')

const latestversion = require('../../scripts/helpers/latestversion')

test('latestversion.current()', (t) => {
  t.test('should be undefined when latest LTS is v6 and v7 has not been released', (t) => {
    const currentVersion = latestversion.current([
      { version: 'v6.8.1', lts: true },
      { version: 'v5.7.1', lts: false }
    ])

    t.equal(currentVersion, undefined)
    t.end()
  })

  t.test('should be latest current release greather than latest LTS major', (t) => {
    const currentVersion = latestversion.current([
      { version: 'v5.0.0', lts: false },
      { version: 'v4.2.1', lts: true },
      { version: 'v0.12.7', lts: false }
    ])

    t.equal(currentVersion.node, 'v5.0.0')
    t.end()
  })

  t.end()
})

test('latestversion.upcomingCurrent()', (t) => {
  t.test('should be undefined when there is an active current release', (t) => {
    const upcoming = latestversion.upcomingCurrent([
      { version: 'v4.2.1', lts: true },
      { version: 'v5.0.0', lts: false }
    ])

    t.equal(upcoming, undefined)
    t.end()
  })

  t.test('should be v7.0.0 when latest LTS is v6.x', (t) => {
    const upcoming = latestversion.upcomingCurrent([
      { version: 'v6.8.1', lts: true },
      { version: 'v5.7.1', lts: false }
    ])

    t.same(upcoming, { node: 'v7.0.0' })
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

    t.equal(ltsVersion.node, 'v4.2.1')
    t.end()
  })

  t.test('should pick latest LTS release', (t) => {
    const ltsVersion = latestversion.lts([
      { version: 'v5.0.0', lts: false },
      { version: 'v4.2.1', lts: true },
      { version: 'v4.2.0', lts: true },
      { version: 'v0.12.7', lts: false }
    ])

    t.equal(ltsVersion.node, 'v4.2.1')
    t.end()
  })

  t.end()
})
