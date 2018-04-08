'use strict'

module.exports = context => {
  const result = context.map(item => ({
    title: item.title,
    date: item.date,
    local: true,
    path: item.path.replace(/\\/, '/')
  }))
  return JSON.stringify(result)
}
