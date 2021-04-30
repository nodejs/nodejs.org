#!/usr/bin/env node

'use strict'

const childProcess = require('child_process')
const vnu = require('vnu-jar')

childProcess.exec('java -version', (error, stdout, stderr) => {
  if (error) {
    console.error('Skipping vnu-jar test; Java is missing.')
    return
  }

  const is32bitJava = !/64-Bit/.test(stderr)

  // vnu-jar accepts multiple ignores joined with a `|`.
  // Also note that the ignores are regular expressions.
  const ignores = [
    // Low priority warnings
    'Section lacks heading.*',
    // This seems to happen due to some Unicode characters
    'Text run is not in Unicode Normalization Form C.',
    // These happen due to the commented out English HTML code some translations have...
    // They should be removed at some point
    'The document is not mappable to XML 1.0 due to two consecutive hyphens in a comment.'
  ].join('|')

  const args = [
    '-jar',
    `"${vnu}"`,
    '--asciiquotes',
    '--skip-non-html',
    // Ignore the language code warnings
    '--no-langdetect',
    '--Werror',
    '--errors-only',
    `--filterpattern "${ignores}"`,
    'build/'
  ]

  // For the 32-bit Java we need to pass `-Xss512k`
  if (is32bitJava) {
    args.splice(0, 0, '-Xss512k')
  }

  return childProcess.spawn('java', args, {
    shell: true,
    stdio: 'inherit'
  })
    .on('exit', process.exit)
})
