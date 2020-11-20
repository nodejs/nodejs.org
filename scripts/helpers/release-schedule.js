'use strict'

const schedule = require('../../source/schedule.json')

const today = new Date()
const datify = (release, key) => new Date(schedule[release][key])

module.exports = (context) => {
  const statuses = context.data.root.statuses

  const header = context.data.root.columns
    .map((column) => `<th>${column}</th>\n`)
    .join('')

  let content = ''

  Object.keys(schedule)
    .filter((release) => datify(release, 'end') > today)
    .forEach((release) => {
      const codename = schedule[release].codename
      const codenameLink = codename
        ? `<a href="https://nodejs.org/download/release/latest-${codename.toLowerCase()}/">${codename}</a>`
        : ''

      const releaseLink =
        datify(release, 'start') < today
          ? `<a href="https://nodejs.org/download/release/latest-${release}.x/">${release}</a>`
          : release

      let status

      if (datify(release, 'start') > today) {
        status = statuses.pending
      } else if (!schedule[release].lts || datify(release, 'lts') > today) {
        status = statuses.current
      } else if (datify(release, 'maintenance') < today) {
        status = statuses.maintenance
      } else if (datify(release, 'lts') < today) {
        status = statuses.active
      }

      content += `<tr>
        <td>${releaseLink}</td>
        <td>${status}</td>
        <td>${codenameLink}</td>
        <td>${schedule[release].start || ''}</td>
        <td>${schedule[release].lts || ''}</td>
        <td>${schedule[release].maintenance || ''}</td>
        <td>${schedule[release].end || ''}</td>
      </tr>`
    })

  return `
    <table class="release-schedule">
      <thead>
        <tr>${header}</tr>
      </thead>
      <tbody>
        ${content}
      </tbody>
    </table>
  `
}
