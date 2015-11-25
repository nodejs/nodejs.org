var yaml = require('js-yaml')
  , fs = require('fs')
  , path = require('path')
  , p = path.join(__dirname, '..', 'locale', 'en', 'get-involved', 'events.md')
  , buf = fs.readFileSync(p)
  , lines = buf.toString().split('\n')
  , str = lines.slice(lines.indexOf('---')+1, lines.indexOf('---', lines.indexOf('---')+1)).join('\n')
  , store = yaml.safeLoad(str)
  ;

exports.getRegion = function (region) {
  for (var reg in store.regions) {
    if (store.regions[reg].region === region) return store.regions[reg]
  }
  var reg = {region:region}
  store.regions.push(reg)
  return reg
}

exports.removeEmpty = function (dict) {
  for (var i in dict) {
    if (!dict[i]) delete dict[i]
  }
}

exports.replace = function (list, key, keyValue, value) {
  exports.removeEmpty(value)
  for (var i=0;i<list.length;i++) {
    if (list[i][key] === keyValue) {
      list[i] = value
      return
    }
  }
  list.push(value)
}

exports.save = function () {
  var str = ['---', yaml.dump(store), '---'].join('\n')
  fs.writeFileSync(p, str)
}
