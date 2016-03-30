'use strict'

const request = require('request')

const countryMap = require('./country-map')
const yml = require('./yaml-sync')
const pkg = require('../package')

const defaults = {
  headers: { 'user-agent': `${pkg.name}/${pkg.version}` },
  json: true
}
const results = []

function clean (event) {
  delete event.topics
  delete event.urlname
  delete event.category
  delete event.id
}

function finish (events) {
  // return console.log(JSON.stringify(events))
  events.forEach((event) => {
    if (!countryMap[event.country]) {
      console.log(event)
      throw new Error('Do not have map for ' + event.country)
    }
    const region = yml.getRegion(countryMap[event.country])
    if (!region.meetups) region.meetups = []
    clean(event)
    if (!yml.isSoT(region.meetups, event.city, event.name)) {
      yml.replace(region.meetups, 'name', event.name, event)
    }
  })
  yml.save()
}
// This is nice when testing if you cache the response
// finish(JSON.parse(require('fs').readFileSync('./meetup.json').toString()))

function pull (opts) {
  request(opts, (err, resp, body) => {
    if (err || resp.statusCode !== 200) {
      throw (err || new Error(`Invalid status code (${resp.statusCode})`))
    }

    body.results.forEach((result) => {
      const title = result.name.toLowerCase()

      if (title.includes('nodeschool')) return
      if (title.includes('mongodb') && title.includes('node')) return
      if (title.includes('find a tech job') && title.includes('node')) return

      results.push(result)
    })

    if (body.meta.next) {
      pull(Object.assign({ url: body.meta.next }, defaults))
    } else {
      finish(results)
    }
  })
}

pull(Object.assign({
  url: 'https://api.meetup.com/2/groups',
  qs: {
    key: process.env.MEETUP_TOKEN,
    upcoming_events: true,
    topic: 'nodejs',
    category: 34
  }
}, defaults))
