'use strict'

const request = require('request'),
  yml = require('./yaml-sync'),
  nodeGeocoder = require('node-geocoder'),
  geoOpts = {
    apiKey: process.env.MAPS_TOKEN,
    formatter: null
  },
  geocoder = nodeGeocoder('google', 'https', geoOpts)

request('http://nodeschool.io/chapters/list.json', {json: true}, (e, resp, list) => {
  if (e || resp.statusCode !== 200) throw (e || new Error('response not 200' + resp.statusCode))
  let count = 0
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
      count += 1
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
