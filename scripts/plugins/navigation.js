'use strict'

// Extracts the main menu and sub-menu links form locale's site.json and
// adds them to the metadata. This data is used in the navigation template
module.exports = function buildNavigation () {
  return function (files, metalsmith, done) {
    const meta = metalsmith.metadata()
    meta.nav = {}
    generateNavigation(meta.site, 'main')
    metalsmith.metadata(meta)
    done()
    function generateNavigation (obj, level) {
      const parent = []
      if (obj.link && obj.text) {
        parent.push(obj)
      }
      Object.keys(obj).forEach(function (key) {
        if (obj[key].link && obj[key].text) {
          meta.nav[level] = meta.nav[level] || parent
          meta.nav[level].push(obj[key])
          generateNavigation(obj[key], key)
        }
      })
    }
  }
}
