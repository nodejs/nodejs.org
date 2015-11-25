var request = require('request')
  , yml = require('./yaml-sync')
  ;

request('http://nodeschool.io/chapters/list.json', {json:true}, function (e, resp, list) {
  if (e || resp.statusCode !== 200) throw (e || new Error('response not 200'+resp.statusCode))
  list.regions.forEach(function (reg) {
    var store = yml.getRegion(reg.region)
    if (!store.nodeschools) {
      store.nodeschools = []
    }
    reg.chapters.forEach(function (chapter) {
      delete chapter.region
      chapter.location = chapter.location + ', ' + chapter.country
      delete chapter.country
      yml.replace(store.nodeschools, 'name', chapter.name, chapter)
    })
  })
  yml.save()
})
