'use strict';

var github = require('octonode');
var client = github.client();
var evRepo = client.repo('nodejs/evangelism');

var https = require('https');
var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

/* Currently proof-of-concept work. Outstanding:
 * ================
 * - [ ] gulpify
 * - [ ] add to local boot process or trigger at key times
 * - [ ] support other content patterns (meeting notes, release notes, etc.)
 * - [ ] support similar patterns for other locales
 * - [ ] prepend predictable markdown metadata on download
 */

function checkOrFetchFile (file) {
  let name = file.name;
  let downloadUrl = file.download_url;
  let sha = file.sha;

  let localPath = path.join(__dirname, '..', '..', 'locale', 'en', 'blog', 'weekly-updates', name);
  if (fs.existsSync(localPath)) {
    console.log(`Weekly Update ${name} exists. (No SHA check, yet.)`)
    return;
  }

  console.log(`Weekly Update ${name} does not exist. Downloading.`);

  var file = fs.createWriteStream(localPath);
  var request = https.get(downloadUrl, function (response) {
    response.pipe(file);
  });
}

evRepo.contents('weekly-updates', function (err, files) {
  files.forEach(checkOrFetchFile);
})
