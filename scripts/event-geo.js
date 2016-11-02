'use strict'

const htmlToText = require('html-to-text')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

const p = path.join(__dirname, '..', 'locale', 'en', 'get-involved', 'events.md')

function load () {
  // Slice the file contents to get the YAML source code.
  const contents = fs.readFileSync(p, { encoding: 'utf8' }).trim().slice(3, -3)
  return yaml.safeLoad(contents)
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
  let desc
  if (ev.description) {
    if (ev.description[0] !== '<') {
      ev.description = `<p>${ev.description}</p>`
    }
    const regex = /<br\s*[\/]?>/gi
    desc = htmlToText.fromString(ev.description).replace(regex, '\n')
  }

  const ret =
  { type: 'Feature',
    geometry:
    { type: 'Point',
      coordinates: [ev.lon, ev.lat]
    },
    properties:
    { title: ev.name,
      description: desc,
      link: ev.link,
      image: ev.group_photo ? ev.group_photo.photo_link : '',
      'marker-size': 'medium',
      'marker-symbol': 'star',
      'marker-color': '#80bd01'
    }
  }
  return ret
}
function _conference (ev) {
  if (!ev.lat) return
  const ret =
  { type: 'Feature',
    geometry:
    { type: 'Point',
      coordinates: [ev.lon, ev.lat]
    },
    properties:
    { title: ev.name,
      description: ev.desc,
      link: ev.link,
      image: ev.image,
      'marker-size': 'medium',
      'marker-symbol': 'triangle',
      'marker-color': '#3887be'
    }
  }
  return ret
}
function _nodeschool (ev) {
  if (!ev.lat) return
  const ret =
  { type: 'Feature',
    geometry:
    { type: 'Point',
      coordinates: [ev.lon, ev.lat]
    },
     properties:
     { title: ev.name,
       link: ev.website || ev.repo,
       image: ev.image,
       description: `${ev.name} ${ev.repo || ''} ${ev.website || ''}`,
       'marker-size': 'medium',
       'marker-symbol': 'star-stroked',
       'marker-color': '#f7da03'
    }
  }
  return ret
}

module.exports = () => {
  const markers = []
  load().regions.forEach((reg) => {
    if (reg.meetups) {
      reg.meetups.forEach((ev) => markers.push(_meetup(ev)))
    }
    if (reg.conferences) {
      reg.conferences.forEach((ev) => markers.push(_conference(ev)))
    }
    if (reg.nodeschools) {
      reg.nodeschools.forEach((ev) => markers.push(_nodeschool(ev)))
    }
  })
  return { type: 'FeatureCollection', features: markers.filter((x) => x) }
}
