'use strict'

module.exports = function anchorMarkdownHeadings (text, level, raw) {
  const escapedText = raw
    .replace(/(\[([^\]]+)]\([^)]+\))/g, '$2')
    .replace(/[^\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\w]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/(^-|-$)/g, '')
    .toLowerCase()
  return '<h' + level + ' id="header-' + escapedText + '">' + text + '<a name="' +
    escapedText + '" class="anchor" href="#' +
    escapedText + '" aria-labelledby="header-' +
    escapedText + '"></a></h' + level + '>'
}
