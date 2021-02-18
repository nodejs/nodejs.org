'use strict'

const marked = require('marked')
const test = require('tape')
const anchorMarkdownHeadings = require('../../scripts/plugins/anchor-markdown-headings')

test('anchorMarkdownHeadings', (t) => {
  t.plan(8)

  t.test('correctly parses markdown heading without links', (t) => {
    const text = 'Simple title'
    const level = 1
    const raw = 'Simple title'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected =
      '<h1 id="header-simple-title">Simple title' +
      '<a id="simple-title" class="anchor" href="#simple-title" ' +
      'aria-labelledby="header-simple-title"></a></h1>'

    t.plan(1)
    t.equal(output, expected)
  })

  t.test('correctly parses markdown heading with a single link', (t) => {
    const text = 'Title with <a href="#">link</a>'
    const level = 3
    const raw = 'Title with [link](#)'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected =
      '<h3 id="header-title-with-link">Title with ' +
      '<a href="#">link</a>' +
      '<a id="title-with-link" class="anchor" href="#title-with-link" ' +
      'aria-labelledby="header-title-with-link"></a></h3>'

    t.plan(1)
    t.equal(output, expected)
  })

  t.test('correctly parses markdown heading with multiple links', (t) => {
    const text = 'a <a href="b">b</a> c<a href="d">d</a>e'
    const level = 2
    const raw = 'a [b](b) c[d](d)e'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected =
      '<h2 id="header-a-b-cde">a <a href="b">b</a> c' +
      '<a href="d">d</a>e' +
      '<a id="a-b-cde" class="anchor" href="#a-b-cde" ' +
      'aria-labelledby="header-a-b-cde"></a></h2>'

    t.plan(1)
    t.equal(output, expected)
  })

  t.test('makes pretty slugs', (t) => {
    const text = '$$$ WIN BIG! $$$'
    const level = 4
    const raw = '$$$ WIN BIG! $$$'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected =
      '<h4 id="header-win-big">$$$ WIN BIG! $$$' +
      '<a id="win-big" class="anchor" href="#win-big" ' +
      'aria-labelledby="header-win-big"></a></h4>'

    t.plan(1)
    t.equal(output, expected)
  })

  t.test(
    'correctly parses markdown heading with non-English characters',
    (t) => {
      const text = '这是<a href="b">链接</a>的<a href="d">测试！</a>'
      const level = 2
      const raw =
        '<!-- anchor-With-Non-English-Characters -->这是[链接](b)c[测试！](d)'
      const output = anchorMarkdownHeadings(text, level, raw)
      const expected =
        '<h2 id="header-anchor-with-non-english-characters">' +
        '这是<a href="b">链接</a>的<a href="d">测试！</a>' +
        '<a id="anchor-with-non-english-characters" class="anchor" ' +
        'href="#anchor-with-non-english-characters" ' +
        'aria-labelledby="header-anchor-with-non-english-characters"></a></h2>'

      t.plan(1)
      t.equal(output, expected)
    }
  )

  t.test('correctly parses markdown heading with empty spaces', (t) => {
    const text = '这是<a href="b">链接</a>的<a href="d">测试！</a>'
    const level = 2
    const raw = '<!-- empty  spaces - id -->这是[链接](b)c[测试！](d)'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected =
      '<h2 id="header-empty-spaces-id">' +
      '这是<a href="b">链接</a>的<a href="d">测试！</a>' +
      '<a id="empty-spaces-id" class="anchor" ' +
      'href="#empty-spaces-id" ' +
      'aria-labelledby="header-empty-spaces-id"></a></h2>'

    t.plan(1)
    t.equal(output, expected)
  })

  t.test('does not generate empty anchors', (t) => {
    const text = 'إنضم إلينا'
    const level = 2
    const raw = 'إنضم إلينا'
    const output = anchorMarkdownHeadings(text, level, raw)
    const expected = '<h2>إنضم إلينا</h2>'

    t.plan(1)
    t.equal(output, expected)
  })

  t.test('does not generate duplicate IDs', (t) => {
    const renderer = new marked.Renderer()
    renderer.heading = anchorMarkdownHeadings

    const text = '# Title\n# Title'
    const output = marked(text, { renderer })
    const expected =
      '<h1 id="header-title">Title' +
      '<a id="title" class="anchor" ' +
      'href="#title" aria-labelledby="header-title"></a></h1>' +
      '<h1 id="header-title-1">Title' +
      '<a id="title-1" class="anchor" ' +
      'href="#title-1" aria-labelledby="header-title-1"></a></h1>'

    t.plan(1)
    t.equal(output, expected)
  })
})
