'use strict'

const Handlebars = require('handlebars')

function traverse (obj, str) {
  return str.split('.').reduce((o, x) => {
    return o[x]
  }, obj)
}

module.exports = function () {
  let env, key

  // function(key, env)
  if (arguments.length === 2) {
    key = arguments[0]
    env = arguments[1]
  }
  // function(scope, key, env)
  if (arguments.length === 3) {
    key = `${arguments[0]}.${arguments[1]}`
    env = arguments[2]
  }

  const data = env.data.root
  const result = traverse(data.i18n, key)

  return new Handlebars.SafeString(result)
}
