'use strict'

const strftime = require('strftime')

module.exports = (date, format) => {
  const parsedDate = new Date(date)

  if (!(parsedDate instanceof Date && isFinite(parsedDate))) {
    // If date is invalid (but not undefined) log error for debugging
    if (date && process.env.NODE_ENV !== 'test') {
      console.error('[handlebars] strftime - Invalid date:', date)
    }
    return date
  }

  return strftime(
    typeof format === 'string' && format ? format : '%F',
    parsedDate
  )
}
