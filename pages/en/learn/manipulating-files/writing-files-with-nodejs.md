---
title: Writing files with Node.js
layout: learn.hbs
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, ovflowd, vaishnav-mk
---

# Writing files with Node.js

## Writing a file

The easiest way to write to files in Node.js is to use the `fs.writeFile()` API.

```js
const fs = require('node:fs');

const content = 'Some content!';

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});
```

### Writing a file synchronously

Alternatively, you can use the synchronous version `fs.writeFileSync()`:

```js
const fs = require('node:fs');

const content = 'Some content!';

try {
  fs.writeFileSync('/Users/joe/test.txt', content);
  // file written successfully
} catch (err) {
  console.error(err);
}
```

You can also use the promise-based `fsPromises.writeFile()` method offered by the `fs/promises` module:

```js
const fs = require('node:fs/promises');

async function example() {
  try {
    const content = 'Some content!';
    await fs.writeFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}

example();
```

By default, this API will **replace the contents of the file** if it does already exist.

**You can modify the default by specifying a flag:**

```js
fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {});
```

#### The flags you'll likely use are

| Flag | Description                                                                                                                | File gets created if it doesn't exist |
| ---- | -------------------------------------------------------------------------------------------------------------------------- | :-----------------------------------: |
| `r+` | This flag opens the file for **reading** and **writing**                                                                   |                  ❌                   |
| `w+` | This flag opens the file for **reading** and **writing** and it also positions the stream at the **beginning** of the file |                  ✅                   |
| `a`  | This flag opens the file for **writing** and it also positions the stream at the **end** of the file                       |                  ✅                   |
| `a+` | This flag opens the file for **reading** and **writing** and it also positions the stream at the **end** of the file       |                  ✅                   |

- You can find more information about the flags in the [fs documentation](https://nodejs.org/api/fs.html#file-system-flags).

## Appending content to a file

Appending to files is handy when you don't want to overwrite a file with new content, but rather add to it.

### Examples

A handy method to append content to the end of a file is `fs.appendFile()` (and its `fs.appendFileSync()` counterpart):

```js
const fs = require('node:fs');

const content = 'Some content!';

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err);
  } else {
    // done!
  }
});
```

#### Example with Promises

Here is a `fsPromises.appendFile()` example:

```js
const fs = require('node:fs/promises');

async function example() {
  try {
    const content = 'Some content!';
    await fs.appendFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}

example();
```
