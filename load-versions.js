#!/usr/bin/env node

'use strict';

const fs = require('fs');
const semver = require('semver')


function download (url, cb) {
    let data = '';
    const request = require('https').get(url, function (res) {

        res.on('data', function (chunk) { data += chunk; });
        res.on('end', function () { cb(null, data); });
    });

    request.on('error', function (e) {
        console.error('Error downloading file:', e.message);
        cb(e.message);
    });
}

download('https://new.nodejs.org/dist/index.json', function (err, nodeVersions) {
    download('https://iojs.org/dist/index.json', function (err, iojsVersions) {

        let allVersions = [];
        try {
            nodeVersions = JSON.parse(nodeVersions);
            iojsVersions = JSON.parse(iojsVersions);

            allVersions = nodeVersions.concat(iojsVersions);
        } catch(e) {
            console.error('Error parsing json', e);
        }

        allVersions.sort(function (a, b) {
            return semver.compare(b.version, a.version);
        });

        fs.writeFileSync('source/versions.json', JSON.stringify(allVersions, null, ' '));
    })
})

