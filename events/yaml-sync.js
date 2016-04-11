'use strict'

const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

const p = path.join(__dirname, '..', 'locale', 'en', 'get-involved', 'events.md')

//
// Slice the file contents to get the YAML source code.
//
const contents = fs.readFileSync(p, { encoding: 'utf8' }).trim().slice(4, -4)
const store = yaml.safeLoad(contents)

store.regions || (store.regions = [])

function getRegion (name) {
  let region = store.regions.find((reg) => reg.region === name)

  if (!region) {
    region = { region: name }
    store.regions.push(region)
  }

  return region
}

/**
 * This function checks if an event has been manually edited to prevent it
 * from being overwritten the next time event scripts are run.
 *
 * See https://github.com/nodejs/nodejs.org/pull/398.
 */
function isSoT (meetups, city, name) {
  const meetup = meetups.find((evt) => evt.city === city && evt.name === name)
  return meetup && meetup.source_of_truth
}

function removeEmpty (dict) {
  for (const i in dict) {
    if (!dict[i]) delete dict[i]
  }
}

function replace (list, key, keyValue, value) {
  const index = list.findIndex((elem) => elem[key] === keyValue)

  removeEmpty(value)

  if (index !== -1) {
    list[index] = value
  } else {
    list.push(value)
  }
}

function save () {
  fs.writeFileSync(p, [
    '---',
    yaml.safeDump(store, { lineWidth: Infinity }),
    '---'
  ].join('\n'))
}

exports.removeEmpty = removeEmpty
exports.getRegion = getRegion
exports.replace = replace
exports.save = save
exports.isSoT = isSoT
