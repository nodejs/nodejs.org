'use strict'

const test = require('tape')

test('anchorMarkdownHeadings', (t) => {
  const anchorMarkdownHeadings = require('../../scripts/plugins/anchor-markdown-headings')

  t.timeoutAfter(500)
  t.plan(4)
  t.test('correctly pharses markdown heading without links', (t) => {
    const text = 'Simple title'
    const level = 1
    const raw = 'Simple title'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected = '<h1>Simple title<a name="simple-title" class="anchor" ' +
      'href="#simple-title"></a></h1>'

    t.plan(1)
    t.equal(output, expected)
  })

  t.test('correctly pharses markdown heading with a single link', (t) => {
    const text = 'Title with <a href="#">link</a>'
    const level = 3
    const raw = 'Title with [link](#)'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected = '<h3>Title with <a href="#">link</a>' +
      '<a name="title-with-link" class="anchor" href="#title-with-link"></a></h3>'

    t.plan(1)
    t.equal(output, expected)
  })

  t.test('correctly pharses markdown heading with multiple links', (t) => {
    const text = 'a <a href="b">b</a> c<a href="d">d</a>e'
    const level = 2
    const raw = 'a [b](b) c[d](d)e'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected = '<h2>a <a href="b">b</a> c<a href="d">d</a>e' +
      '<a name="a-b-cde" class="anchor" href="#a-b-cde"></a></h2>'

    t.plan(1)
    t.equal(output, expected)
  })

  t.test('makes pretty slugs', (t) => {
    const text = '$$$ WIN BIG! $$$'
    const level = 4
    const raw = '$$$ WIN BIG! $$$'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected = '<h4>$$$ WIN BIG! $$$' +
      '<a name="win-big" class="anchor" href="#win-big"></a></h4>'

    t.plan(1)
    t.equal(output, expected)
  })
})
