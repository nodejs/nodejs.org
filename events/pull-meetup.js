var request = require('request').defaults({json:true, headers:{'user-agent':'pull-meeting-0.1'}})
  , url = 'https://api.meetup.com/2/groups'
  , auth = process.env.MEETUP_TOKEN
  , qs = require('querystring')
  , yml = require('./yaml-sync')
  , opts =
    { topic: 'nodejs'
    , category: 34
    , upcoming_events: true
    , key: auth
    }
  , allresults = []
  , u = url+'?'+qs.stringify(opts)
  ;

var countryMap =
 { ES: 'Africa'
 , MU: 'Africa'
 , NG: 'Africa'
 , KE: 'Africa'
 , ZA: 'Africa'
 , IL: 'Asia'
 , TH: 'Asia'
 , KR: 'Asia'
 , RU: 'Asia'
 , ID: 'Asia'
 , PH: 'Asia'
 , IN: 'Asia'
 , HK: 'Asia'
 , GR: 'Europe'
 , DE: 'Europe'
 , RO: 'Europe'
 , MT: 'Europe'
 , GH: 'Europe'
 , IE: 'Europe'
 , FI: 'Europe'
 , SE: 'Europe'
 , UA: 'Europe'
 , AT: 'Europe'
 , HU: 'Europe'
 , CH: 'Europe'
 , IS: 'Europe'
 , GB: 'Europe'
 , DK: 'Europe'
 , EE: 'Europe'
 , BE: 'Europe'
 , NO: 'Europe'
 , NL: 'Europe'
 , FR: 'Europe'
 , PL: 'Europe'
 , SK: 'Europe'
 , CA: 'North America'
 , US: 'North America'
 , AR: 'Latin America'
 , PE: 'Latin America'
 , MX: 'Latin America'
 , BR: 'Latin America'
 , VE: 'Latin America'
 , CL: 'Latin America'
 , AU: 'South Pacific'
 , SG: 'South Pacific'
 , NZ: 'South Pacific'
 }

function clean (event) {
  delete event.topics
  delete event.urlname
  delete event.category
  delete event.id
}

function finish (events) {
  events.forEach(function(event) {
    if (!countryMap[event.country]) {
      throw new Error("Do not have map for "+event.country)
    }
    var region = yml.getRegion(countryMap[event.country])
    if (!region.meetups) region.meetups = []
    clean(event)
    yml.replace(region.meetups, 'name', event.name, event)
  })
  yml.save()
}
// This is nice when testing if you cache the response
// finish(JSON.parse(require('fs').readFileSync('./meetup.json').toString()))

function _go (u) {
  request(u, function (e, resp, body) {
    var results = body.results
    results.forEach(function (result) {
      if (result.name.toLowerCase().indexOf('node') !== -1) allresults.push(result)
    })
    if (body.meta.next) {
      _go(body.meta.next)
    } else {
      finish(allresults)
    }
  })
}
_go(u)
