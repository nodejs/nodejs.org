---
title: Working with file descriptors in Node.js
layout: learn.hbs
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, vaishnav-mk
---

# Working with file descriptors in Node.js

Before you're able to interact with a file that sits in your filesystem, you must get a file descriptor.

A file descriptor is a reference to an open file, a number (fd) returned by opening the file using the `open()` method offered by the `fs` module. This number (`fd`) uniquely identifies an open file in operating system:

```js
const fs = require('fs');

fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
  // fd is our file descriptor
});
```

Notice the `r` we used as the second parameter to the `fs.open()` call.

That flag means we open the file for reading.

**Other flags you'll commonly use are:**

<table>
  <tr>
    <th>Flag</th>
    <th>Description</th>
    <th>File gets created if it doesn't exist</th>
  </tr>
  <tr>
    <td><code>r+</code></td>
    <td>This flag opens the file for <b>reading</b> and <b>writing</b></td>
    <td style="text-align: center;">❌</td>
  </tr>
  <tr>
    <td><code>w+</code></td>
    <td>This flag opens the file for <b>reading</b> and <b>writing</b> and it also positions the stream at the <b>beginning</b> of the file</td>
    <td style="text-align: center;">✅</td>
  </tr>
  <tr>
    <td><code>a</code></td>
    <td>This flag opens the file for <b>writing</b> and it also positions the stream at the <b>end</b> of the file</td>
    <td style="text-align: center;">✅</td>
  </tr>
  <tr>
    <td><code>a+</code></td>
    <td>This flag opens the file for <b>reading</b> and <b>writing</b> and it also positions the stream at the <b>end</b> of the file</td>
    <td style="text-align: center;">✅</td>
  </tr>
</table>

You can also open the file by using the `fs.openSync` method, which returns the file descriptor, instead of providing it in a callback:

```js
const fs = require('fs');

try {
  const fd = fs.openSync('/Users/joe/test.txt', 'r');
} catch (err) {
  console.error(err);
}
```

Once you get the file descriptor, in whatever way you choose, you can perform all the operations that require it, like calling `fs.close()` and many other operations that interact with the filesystem.

You can also open the file by using the promise-based `fsPromises.open` method offered by the `fs/promises` module.

The `fs/promises` module is available starting only from Node.js v14. Before v14, after v10, you can use `require('fs').promises` instead. Before v10, after v8, you can use `util.promisify` to convert `fs` methods into promise-based methods.

```js
const fs = require('fs/promises');
// Or const fs = require('fs').promises before v14.
async function example() {
  let filehandle;
  try {
    filehandle = await fs.open('/Users/joe/test.txt', 'r');
    console.log(filehandle.fd);
    console.log(await filehandle.readFile({ encoding: 'utf8' }));
  } finally {
    if (filehandle) await filehandle.close();
  }
}
example();
```

Here is an example of `util.promisify`:

```js
const fs = require('fs');
const util = require('util');

async function example() {
  const open = util.promisify(fs.open);
  const fd = await open('/Users/joe/test.txt', 'r');
}
example();
```

To see more details about the `fs/promises` module, please check [fs/promises API](/api/fs/#promise-example).
