#!/usr/bin/env node

var fs = require("fs");
var lockfile = require("@yarnpkg/lockfile");

function fetchVulnerabilities() {
    fs.readFile("./audit.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("Error reading a file from disk:", err);
            return;
        }
        try {
            audit_data = JSON.parse(jsonString);
            vulnerabilities_list = Object.values(audit_data["advisories"]);
            var high_vulnerabilities = Array();
            for (let vulnerability of vulnerabilities_list) {
                if (vulnerability["severity"] === "high") {
                    high_vulnerabilities.push(vulnerability);
                }
            }
            return filterOpenDnsModules(high_vulnerabilities);
        } catch (err) {
            console.log("Error parsing JSON file:", err);
        }
    });
}

function filterOpenDnsModules(high_vulnerabilities) {
    let file_data = fs.readFileSync("yarn.lock", "utf8");
    let json_data = lockfile.parse(file_data);
    let opendns_packages = Object.keys(json_data["object"]);
    let filtered_output = Array();
    for (let index in opendns_packages) {
        if (opendns_packages[index][0] === "@") {
            filtered_output.push(opendns_packages[index].split("@")[1]);
        } else {
            filtered_output.push(opendns_packages[index].split("@")[0]);
        }
    }

    native_vulnerability = Array();
    for (let index in high_vulnerabilities) {
        if (!filtered_output.includes("https-proxy-agent")) {
            native_vulnerability.push(high_vulnerabilities[index]);
        }
    }
    if (native_vulnerability === Array()) {
        process.exit(1);
    } else {
        process.exit();
    }
}

fetchVulnerabilities();
