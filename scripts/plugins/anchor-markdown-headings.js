'use strict'

/**
 * This module will automatically replace the header style words
 * (such as `#`,`##`...ect) to an anchor name.
 *
 * This processor will make all the English characters (26 letters)
 * into their lower case, for others in the middle of words,
 * they will become `-` in default.
 *
 * If your title has some non-English characters, please use
 * `<!---->` to quote your English anchor name inside, with your
 * own title beside it.
 */
module.exports = function anchorMarkdownHeadings (text, level, raw) {
  // Check whether we've got the comment matches
  // <!--comment-->, <!--comment --> and even <!-- comment-->
  // (20 hex = 32 dec = space character)
  const ANCHOR_COMMENTREG = /<!--\x20?([\w|-]+)\x20?-->/gi

  let anchorTitle = null

  // If we've checked the title has a comment symbol,
  // we reguard it as the forcely-assigned anchor link name
  // for titles with non-English characters
  const anchorTitleArray = ANCHOR_COMMENTREG.exec(raw)
  if (anchorTitleArray !== null) {
    anchorTitle = anchorTitleArray[1]
  } else {
    // For others, directly replace all non-English characters
    // to '-' in the middle, only keep the English characters
    anchorTitle = raw
      .replace(/(\[([^\]]+)]\([^)]+\))/g, '$2')
      .replace(/[^\w]+/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  anchorTitle = anchorTitle.toLowerCase()

  return '<h' + level + ' id="header-' + anchorTitle + '">' + text + '<a name="' +
    anchorTitle + '" class="anchor" href="#' +
    anchorTitle + '" aria-labelledby="header-' +
    anchorTitle + '"></a></h' + level + '>'
}
