#!/usr/bin/env node

/**
 * What is this? With this small JavaScript file we want
 * to block the upload of modified files in the "locale"
 * folder to the repository through a git hook generated
 * with the Husky library.
 *
 * Usage: $ node .git-hook/locale.js
 *
 * Happy releasing!
 */

'use strict'

/*
 * Check Github Action Default environment variables.
 * More info: https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables
 */
if (process.env.CI) process.exit()

// Require main dependences.
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Execute Git Diff for get all files with changes.
const results = execSync('git diff --cached --name-only locale/ :!locale/en')

// Create array with all files.
const arrayResults = results.toString().trim().split('\n')

// Define array files to not change.
const changedLocalizedFiles = []

function gitHook () {
  // Iterate in array for search if RegExp is true or not.
  arrayResults.forEach(file => {
    // Control for search if exist or not file.
    const filepath = path.join(__dirname, '../..', file)
    if (fs.existsSync(filepath) && reg.test(filepath)) {
      // Include path reference into array for resolve result console.
      changedLocalizedFiles.push({
        Path: filepath
      })
    }
  })

  // Show an error and log table with the list of modified files in the "locale" folder.
  if (changedLocalizedFiles.length !== 0) {
    console.error('\n ❌ Translations are handled via Crowdin, and direct changes are not allowed. Read more in https://github.com/nodejs/nodejs.org/blob/master/TRANSLATION.md\nPlease revert changes to the following files before committing:')
    console.table(changedLocalizedFiles)
    process.exit(1)
  }
}

// Launch for locale folder.
gitHook()
