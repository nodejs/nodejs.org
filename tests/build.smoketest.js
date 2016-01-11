'use strict'

const path = require('path')
const exec = require('child_process').exec
const test = require('tape')

const pathToBuild = path.resolve(__dirname, '../build.js')

test('build.js', (t) => {
  t.plan(1)

  t.test('should not generate error', (t) => {
    exec(`node ${pathToBuild}`, (err) => {
      t.equal(err, null)
      t.end()
    })
  })
})
