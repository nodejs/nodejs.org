'use strict'

module.exports = function anchorMarkdownHeadings (text, level, raw) {
  const escapedText = raw
    .replace(/(\[([^\]]+)\]\([^)]+\))/g, '$2')
    .replace(/[^\w]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/(^-|-$)/g, '')
    .toLowerCase()
  return '<h' + level + ' id="header-' + escapedText + '">' + text + '<a name="' +
    escapedText + '" class="anchor" href="#' +
    escapedText + '" aria-labelledby="header-' +
    escapedText + '"></a></h' + level + '>'
}
