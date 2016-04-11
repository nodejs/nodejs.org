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

function finish (events) {
  events.forEach((event) => {
    if (!countryMap[event.country]) {
      console.log(event)
      throw new Error('Do not have map for ' + event.country)
    }
    const region = yml.getRegion(countryMap[event.country])
    if (!region.meetups) region.meetups = []
    if (!yml.isSoT(region.meetups, event.city, event.name)) {
      yml.replace(region.meetups, 'name', event.name, event)
    }
  })
  yml.save()
}

function pull (opts) {
  request(opts, (err, resp, body) => {
    if (err || resp.statusCode !== 200) {
      throw (err || new Error(`Invalid status code (${resp.statusCode})`))
    }

    body.results.forEach((result) => {
      const title = result.name.toLowerCase()

      if (
        title.includes('find a tech job') ||
        title.includes('nodeschool') ||
        / mongodb (?:user group|meet ?up)$/.test(title) ||
        title.startsWith('mongodb ')
      ) return

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
    only: 'city,country,description,group_photo.photo_link,lat,link,lon,name',
    key: process.env.MEETUP_TOKEN,
    topic: 'nodeJS',
    category_id: 34 // tech
  }
}, defaults))
