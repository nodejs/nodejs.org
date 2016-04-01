'use strict'

const nodeGeocoder = require('node-geocoder')
const request = require('request')

const yml = require('./yaml-sync')
const pkg = require('../package')

const geocoder = nodeGeocoder('google', 'https', {
  apiKey: process.env.MAPS_TOKEN,
  formatter: null
})

request({
  headers: { 'user-agent': `${pkg.name}/${pkg.version}` },
  url: 'http://nodeschool.io/chapters/list.json',
  json: true
}, (err, resp, list) => {
  if (err || resp.statusCode !== 200) {
    throw (err || new Error(`Invalid status code (${resp.statusCode})`))
  }

  const chapters = []

  list.regions.forEach((reg) => {
    const store = yml.getRegion(reg.region)
    if (!store.nodeschools) {
      store.nodeschools = []
    }

    reg.chapters.forEach((chapter) => {
      delete chapter.region
      chapter.location = `${chapter.location}, ${chapter.country}`
      delete chapter.country
      yml.replace(store.nodeschools, 'name', chapter.name, chapter)
      chapters.push(chapter)
    })
  })

  function _geo () {
    if (chapters.length === 0) { return yml.save() }
    const chapter = chapters.shift()
    geocoder.geocode(chapter.location, (err, res) => {
      console.log(err, res)
      if (err || !res.length) { return _geo() }
      chapter.lat = res[0].latitude
      chapter.lon = res[0].longitude
      _geo()
    })
  }
  _geo()
})
