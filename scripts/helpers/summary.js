'use strict'

const cheerio = require('cheerio')

const SUMMARY_MAX_LENGTH = 300
const IGNORE_SELECTORS = [
  '.blogpost-header',
  '.anchor',
  'h1',
  'h2',
  'h3',
  'blockquote'
]

/**
 * Due to the nature of metalsmith and
 * how the metalsmith-paginate plugin operates,
 * this helper has to handle two different types of
 * HTML contents:
 *  - clean blog posts converted from markdown to HTML,
 *    seen on the first page of blog posts
 *  - the remaining paginated pages has gone
 *    through the handlebars process and therefore has the
 *    entire page layout (w/<html>, <head> and <body> etc)
 *    wrapped around the actual blog contents :(
 */

module.exports = (contents, locale, path) => {
  const $ = cheerio.load(contents)
  const $body = $('body')
  const hasBody = $body.length > 0
  const $elements = hasBody ? $body.find('article > *') : $('*')

  let summary = ''

  $elements
    .not((i, elem) => IGNORE_SELECTORS.some((selector) => $(elem).is(selector)))
    .each((i, elem) => {
      if (summary.length > SUMMARY_MAX_LENGTH) {
        summary += `<p><a href="/${locale}/${path.replace(
          /\\/g,
          '/'
        )}/">Read more...</a></p>`
        return false
      }

      // Don't re-add nested elements when extracting summary
      // from blog posts not contained in a complete HTML document
      if (!hasBody && elem.parent) {
        return
      }

      summary += $.html(elem)
    })

  return summary
}
