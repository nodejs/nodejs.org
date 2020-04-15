---
title: How can I secure my code?
date: null
tags:
  - filesystem
  - security
difficulty: 3
layout: knowledge-post.hbs
---

Sometimes, you might want to let users read or write files on your server. For example, maybe you want to write a forum software without using an actual database. The problem is that you do not want your users to be able to modify or to read arbitrary files on your server, and there sometimes are ways to get around restrictions that should prevent it. Read on to see how you can secure your code against evil attackers trying to mess with your files.

## Poison Null Bytes

Poison null bytes are a way to trick your code into seeing another filename than the one that will actually be opened. This can in many cases be used to circumvent directory traversal protections, to trick servers into delivering files with wrong file types and to circumvent restrictions on the file names that may be used. [A more detailed description is here.](http://groups.google.com/group/nodejs/browse_thread/thread/51f66075e249d767/85f647474b564fde) Always use code like this when accessing files with user-supplied names:

```javascript
if (filename.indexOf('\0') !== -1) {
  return respond('That was evil.');
}
```

## Whitelisting

You won't always be able to use whitelisting, but if you are, do it - it's very easy to implement and hard to get wrong. For example, if you know that all filenames are lowercase alphanumeric strings:

```javascript
if (!/^[a-z0-9]+$/.test(filename)) {
  return respond('illegal character');
}
```

However, note that whitelisting alone isn't sufficient anymore as soon as you allow dots and slashes - people could enter things like `../../etc/passwd` in order to get files from outside the allowed folder.

## Preventing Directory Traversal

Directory traversal means that an attacker tries to access files outside of the folder you want to allow him to access. You can prevent this by using nodes built-in "path" module. **Do not implement the stuff in the path module again yourself** - for example, when someone runs your code on a windows server, not handling backslashes like slashes will allow attackers to do directory traversal.

This example assumes that you already checked the `userSuppliedFilename` variable as described in the "Poison Null Bytes" section above.

```javascript
var rootDirectory = '/var/www/';
```

Make sure that you have a slash at the end of the allowed folders name - you don't want people to be able to access `/var/www-secret/`, do you?.

```javascript
var path = require('path');
var filename = path.join(rootDirectory, userSuppliedFilename);
```

Now `filename` contains an absolute path and doesn't contain `..` sequences anymore - `path.join` takes care of that. However, it might be something like `/etc/passwd` now, so you have to check whether it starts with the `rootDirectory`:

```javascript
if (filename.indexOf(rootDirectory) !== 0) {
  return respond('trying to sneak out of the web root?');
}
```

Now the `filename` variable should contain the name of a file or directory that's inside the allowed directory (unless it doesn't exist).
