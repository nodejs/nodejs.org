'use strict'
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
let p = path.join(__dirname, '..', 'locale', 'en', 'get-involved', 'events.md')
let htmlToText = require('html-to-text')

function load () {
  let buf = fs.readFileSync(p)
  let lines = buf.toString().split('\n')
  let str = lines.slice(lines.indexOf('---') + 1, lines.indexOf('---', lines.indexOf('---') + 1)).join('\n')
  let store = yaml.safeLoad(str)

  return store
}

// { type: 'Feature',
//   geometry: {
//     type: 'Point',
//     // coordinates here are in longitude, latitude order because
//     // x, y is the standard for GeoJSON and many formats
//     coordinates: [
//       -77.03221142292,
//       38.913371603574
//     ]
//   },
//   properties: {
//     title: 'Peregrine Espresso',
//     description: '1718 14th St NW, Washington, DC',
//     // one can customize markers by adding simplestyle properties
//     // https://www.mapbox.com/guides/an-open-platform/#simplestyle
//     'marker-size': 'large',
//     'marker-color': '#BE9A6B',
//     'marker-symbol': 'cafe'
//     }
//   }
// }

function _meetup (ev) {
  if (!ev.lat) return
  var desc
  if (ev.description) {
    if (ev.description[0] !== '<') {
      ev.description = `<p>${ev.description}</p>`
    }
    var regex = /<br\s*[\/]?>/gi
    desc = htmlToText.fromString(ev.description).replace(regex, '\n')
  }

  var ret =
  { type: 'Feature',
    geometry:
    { type: 'Point',
      coordinates: [ev.lon, ev.lat]
    },
    properties:
    { title: ev.name,
      description: desc,
      'marker-size': 'medium',
      'marker-symbol': 'star',
      'marker-color': '#80bd01'
    }
  }
  return ret
}
function _conference (ev) {
  if (!ev.lat) return
  var ret =
  { type: 'Feature',
    geometry:
    { type: 'Point',
      coordinates: [ev.lon, ev.lat]
    },
    properties:
    { title: ev.name,
      description: ev.desc,
      'marker-size': 'medium',
      'marker-symbol': 'triangle',
      'marker-color': '#3887be'
    }
  }
  return ret
}
function _nodeschool (ev) {
  if (!ev.lat) return
  var ret =
  { type: 'Feature',
    geometry:
    { type: 'Point',
      coordinates: [ev.lon, ev.lat]
    },
     properties:
     { title: ev.name,
       description: `${ev.name} ${ev.repo || ''} ${ev.website || ''}`,
       'marker-size': 'medium',
       'marker-symbol': 'star-stroked',
       'marker-color': '#f7da03'
    }
  }
  return ret
}

module.exports = function () {
  var markers = []
  load().regions.forEach(function (reg) {
    if (reg.meetups) {
      reg.meetups.forEach(function (ev) { markers.push(_meetup(ev)) })
    }
    if (reg.conferences) {
      reg.conferences.forEach(function (ev) { markers.push(_conference(ev)) })
    }
    if (reg.nodeschools) {
      reg.nodeschools.forEach(function (ev) { markers.push(_nodeschool(ev)) })
    }
  })
  return { type: 'FeatureCollection', features: markers.filter(function (x) { return x }) }
}
