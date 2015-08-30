#!/usr/bin/env node

'use strict';

const fs = require('fs');
const semver = require('semver')
const https = require('https');

function download (url, cb) {
    let data = '';
    https.get(url, function (res) {
        res.on('data', function (chunk) { data += chunk; });
        res.on('end', function () { cb(null, data); });
    }).on('error', function (e) {
        console.error('Error downloading file from %s: %s', url, e.message);
        cb(e);
    });
}

download('https://new.nodejs.org/dist/index.json', function (nodeErr, nodeVersions) {
    download('https://iojs.org/dist/index.json', function (iojsErr, iojsVersions) {

        if (nodeErr || iojsErr) {
            console.error('Aborting due to download error from node or iojs');
            return process.exit(1);
        }

        let allVersions = [];
        try {
            nodeVersions = JSON.parse(nodeVersions);
            iojsVersions = JSON.parse(iojsVersions);

            allVersions = nodeVersions.concat(iojsVersions);
        } catch(e) {
            console.error('Error parsing json', e);
            return process.exit(1);
        }

        allVersions.sort(function (a, b) {
            return semver.compare(b.version, a.version);
        });

        fs.writeFileSync('source/versions.json', JSON.stringify(allVersions, null, ' '));
    })
})

