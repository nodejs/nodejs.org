'use strict'

// This middleware adds "Edit on GitHub" links to every editable page
function githubLinks(options) {
  return (files, m, next) => {
    // add suffix (".html" or "/" or "\" for Windows) to each part of regex
    // to ignore possible occurrences in titles (e.g. blog posts)
    const isEditable = /security\.html|about(\/|\\)|docs(\/|\\)|foundation(\/|\\)|get-involved(\/|\\)|knowledge(\/|\\)/

    Object.keys(files).forEach((path) => {
      if (!isEditable.test(path)) {
        return
      }

      const file = files[path]
      const url = `https://github.com/nodejs/nodejs.org/edit/master/locale/${
        options.locale
      }/${path.replace('.html', '.md').replace(/\\/g, '/')}`
      const editText = options.site.editOnGithub || 'Edit on GitHub'

      const contents = file.contents
        .toString()
        .replace(/<h1(.*?)>(.*?)<\/h1>/, (match, $1, $2) => {
          return `<a class="edit-link" href="${url}">${editText}</a> <h1${$1}>${$2}</h1>`
        })

      file.contents = Buffer.from(contents)
    })

    next()
  }
}

module.exports = githubLinks
