'use strict'

module.exports = function anchorMarkdownHeadings (text, level, raw) {
  var escapedText = raw
    .replace(/(\[([^\]]+)\]\([^)]+\))/g, '$2')
    .replace(/[^\w]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/(^-|-$)/g, '')
    .toLowerCase()
  return '<h' + level + '>' + text + '<a name="' +
    escapedText + '" class="anchor" href="#' +
    escapedText + '"></a></h' + level + '>'
}
