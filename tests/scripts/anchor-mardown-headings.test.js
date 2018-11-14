'use strict'

const test = require('tape')

test('anchorMarkdownHeadings', (t) => {
  const anchorMarkdownHeadings = require('../../scripts/plugins/anchor-markdown-headings')

  t.plan(4)
  t.test('Correctly pharses markdown heading without links', (t) => {
    const text = 'Simple title'
    const level = 1
    const raw = 'Simple title'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected = '<h1 id="header-simple-title">Simple title' +
      '<a name="simple-title" class="anchor" ' +
      'href="#simple-title" aria-labelledby="header-simple-title"></a></h1>'

    t.plan(1)
    t.equal(output, expected)
  })

  t.test('Correctly pharses markdown heading with a single link', (t) => {
    const text = 'Title with <a href="#">link</a>'
    const level = 3
    const raw = 'Title with [link](#)'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected = '<h3 id="header-title-with-link">Title with ' +
      '<a href="#">link</a>' +
      '<a name="title-with-link" class="anchor" href="#title-with-link" ' +
      'aria-labelledby="header-title-with-link"></a></h3>'

    t.plan(1)
    t.equal(output, expected)
  })

  t.test('Correctly pharses markdown heading with multiple links', (t) => {
    const text = 'a <a href="b">b</a> c<a href="d">d</a>e'
    const level = 2
    const raw = 'a [b](b) c[d](d)e'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected = '<h2 id="header-a-b-cde">a <a href="b">b</a> c' +
      '<a href="d">d</a>e' +
      '<a name="a-b-cde" class="anchor" href="#a-b-cde" ' +
      'aria-labelledby="header-a-b-cde"></a></h2>'

    t.plan(1)
    t.equal(output, expected)
  })

  t.test('Makes pretty slugs', (t) => {
    const text = '$$$ WIN BIG! $$$'
    const level = 4
    const raw = '$$$ WIN BIG! $$$'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected = '<h4 id="header-win-big">$$$ WIN BIG! $$$' +
      '<a name="win-big" class="anchor" href="#win-big" ' +
      'aria-labelledby="header-win-big"></a></h4>'

    t.plan(1)
    t.equal(output, expected)
  })
})
