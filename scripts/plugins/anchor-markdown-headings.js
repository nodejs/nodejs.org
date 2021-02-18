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

// Check whether we've got the comment matches
// <!--comment-->, <!--comment --> and even <!-- comment-->
// (20 hex = 32 dec = space character)
// Only need to find one that matches the Regex, we cannot use
// 'g' here because it will continue searching for the rest string,
// and you have to reset the lastIndex, which isn't a necessary for
// our current situation.
// For more, you can see:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex#Description
const ANCHOR_COMMENTREG = /<!--\x20?([\w\x20-]+)\x20?-->/

module.exports = function anchorMarkdownHeadings(text, level, raw, slugger) {
  let anchorTitle = null

  // If we've checked the title has a comment symbol,
  // we reguard it as the forcely-assigned anchor link name
  // for titles with non-English characters
  const anchorTitleArray = ANCHOR_COMMENTREG.exec(raw)
  if (anchorTitleArray !== null) {
    anchorTitle = anchorTitleArray[1]
  } else {
    anchorTitle = raw
  }

  anchorTitle = anchorTitle
    .replace(/(\[([^\]]+)]\([^)]+\))/g, '$2')
    .replace(/[^\w]+/g, '-')
    .replace(/[\x20]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/(^-|-$)/g, '')

  if (!anchorTitle) {
    return `<h${level}>${text}</h${level}>`
  }

  anchorTitle = anchorTitle.toLowerCase()

  const anchorId = `${slugger ? slugger.slug(anchorTitle) : anchorTitle}`
  const headerId = `header-${anchorId}`

  return `<h${level} id="${headerId}">${text}<a id="${anchorId}" class="anchor" href="#${anchorId}" aria-labelledby="${headerId}"></a></h${level}>`
}
