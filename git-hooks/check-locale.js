/**
 * Require main dependences.
 */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Execute Git Diff for get all files with changes.
const results = execSync('git diff --cached --name-only')

// Create array with all files.
const arrayResults = results.toString().split('\n')
// Remove last element.
arrayResults.pop()

// Define array files to not change.
const filesNoChange = []

const reg = new RegExp('/locale/', 'g')
arrayResults.forEach(file => {
  if (fs.existsSync(path.join(__dirname, '..', file)) && reg.test(path.join(__dirname, '..', file))) {
    filesNoChange.push({
      Path: path.join(__dirname, '..', file)
    })
  }
})

if (filesNoChange.length !== 0) {
  console.error('\x1b[31m', '\n ❌ You can not commit changes of the following files:', '\x1b[0m')
  console.table(filesNoChange)
  process.exit(1)
}
