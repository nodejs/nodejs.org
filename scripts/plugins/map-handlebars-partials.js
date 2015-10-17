'use strict'

const Fs = require('fs')
const Path = require('path')

/**
 * Map handlebars partials as { $partialName: $partialPath/$partialName }
 */
module.exports = function mapHandlebarsPartials (metalsmith, layoutPath, partialPath) {
  const fullPath = metalsmith.path(layoutPath, partialPath)
  let partials = {}

  Fs.readdirSync(fullPath).forEach(function (file) {
    if (Path.extname(file) !== '.hbs') { return }
    const partialName = Path.basename(file, '.hbs')
    partials[partialName] = Path.join(partialPath, partialName)
  })

  return partials
}
