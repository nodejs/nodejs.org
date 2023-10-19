---
title: Releases
layout: download-releases.hbs
modules: '<code>NODE_MODULE_VERSION</code> refers to the ABI (application binary interface) version number of Node.js, used to determine which versions of Node.js compiled C++ add-on binaries can be loaded in to without needing to be re-compiled. It used to be stored as hex value in earlier versions, but is now represented as an integer.'
---

# Releases

Major Node.js versions enter _Current_ release status for six months, which gives library authors time to add support for them.
After six months, odd-numbered releases (9, 11, etc.) become unsupported, and even-numbered releases (10, 12, etc.) move to _Active LTS_ status and are ready for general use.
_LTS_ release status is "long-term support", which typically guarantees that critical bugs will be fixed for a total of 30 months.
Production applications should only use _Active LTS_ or _Maintenance LTS_ releases.

![Releases](https://raw.githubusercontent.com/nodejs/Release/main/schedule.svg?sanitize=true)

### Looking for latest release of a version branch?
