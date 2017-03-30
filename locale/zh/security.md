---
layout: security.hbs
title: Security
---
# Security

## Reporting a Bug

All security bugs in Node.js are taken seriously and should be reported by emailing [security@nodejs.org](mailto:security@nodejs.org).
This will be delivered to a subset of the core team who handle security issues.

Your email will be acknowledged within 24 hours, and you’ll receive a more detailed response to your email within 48
hours indicating the next steps in handling your report.

After the initial reply to your report, the security team will endeavor to keep you informed of the progress being made
towards a fix and full announcement, and may ask for additional information or guidance surrounding the reported issue.
These updates will be sent at least every five days, in practice, this is more likely to be every 24-48 hours.

Security bugs in third party modules should be reported to their respective maintainers and can also be coordinated
through the [Node Security Project](https://nodesecurity.io).

Thank you for improving the security of Node.js. Your efforts and responsible disclosure are greatly appreciated and
will be acknowledged.


## Disclosure Policy

Here is the security disclosure policy for Node.js

- The security report is received and is assigned a primary handler. This person will coordinate the fix and release
process. The problem is confirmed and a list of all affected versions is determined. Code is audited to find any
potential similar problems. Fixes are prepared for all releases which are still under maintenance. These fixes are not
committed to the public repository but rather held locally pending the announcement.

- A suggested embargo date for this vulnerability is chosen and a CVE (Common Vulnerabilities and  Exposures (CVE®))
is requested for the vulnerability.

- On the embargo date, the Node.js security mailing list is sent a copy of the announcement. The changes are pushed to
the public repository and new builds are deployed to nodejs.org. Within 6 hours of the mailing list being notified, a
copy of the advisory will be published on the Node.js blog.

- Typically the embargo date will be set 72 hours from the time the CVE is issued. However, this may vary depending on
the severity of the bug or difficulty in applying a fix.

- This process can take some time, especially when coordination is required with maintainers of other projects. Every
effort will be made to handle the bug in as timely a manner as possible, however, it’s important that we follow the
release process above to ensure that the disclosure is handled in a consistent manner.


## Receiving Security Updates

Security notifications will be distributed via the following methods.

- [http://groups.google.com/group/nodejs-sec](http://groups.google.com/group/nodejs-sec)
- [http://blog.nodejs.org](http://blog.nodejs.org)


## Comments on this Policy

If you have suggestions on how this process could be improved please submit a [pull request](https://github.com/nodejs/new.nodejs.org)
or email [security@nodejs.org](mailto:security@nodejs.org) to discuss.
