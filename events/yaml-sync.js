'use strict'

const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

const p = path.join(__dirname, '..', 'locale', 'en', 'get-involved', 'events.md')
const lines = fs.readFileSync(p).toString().split('\n')
const begin = lines.indexOf('---') + 1
const end = lines.indexOf('---', begin)
const store = yaml.safeLoad(lines.slice(begin, end).join('\n'))

function getRegion (region) {
  let reg
  for (reg in store.regions) {
    if (store.regions[reg].region === region) return store.regions[reg]
  }
  reg = { region: region }
  store.regions.push(reg)
  return reg
}

function isSoT (region, city, name) {
  let meetups = region.meetups
  for (const i in meetups) {
    if (meetups[i].city === city && meetups[i].name === name) {
      if (meetups[i].source_of_truth) {
        return true
      }
      return false
    }
  }
  return false
}

function removeEmpty (dict) {
  for (const i in dict) {
    if (!dict[i]) delete dict[i]
  }
}

function replace (list, key, keyValue, value) {
  removeEmpty(value)
  for (let i = 0; i < list.length; i++) {
    if (list[i][key] === keyValue) {
      list[i] = value
      return
    }
  }
  list.push(value)
}

function save () {
  const str = ['---', yaml.dump(store), '---'].join('\n')
  fs.writeFileSync(p, str)
}

exports.removeEmpty = removeEmpty
exports.getRegion = getRegion
exports.replace = replace
exports.save = save
exports.isSoT = isSoT
