---
title: What are streams?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - streams
difficulty: 3
layout: knowledge-post.hbs
---

Streams are another basic construct in Node.js that encourages asynchronous coding. Streams allow you to process the data as it is generated or retrieved. Streams can be readable, writeable, or both.

In other words, Streams use events to deal with data as it happens, rather than only with a callback at the end. Readable streams emit the event `data` for each chunk of data that comes in, and an `end` event, which is emitted when there is no more data. Writeable streams can be written to with the `write()` function, and closed with the `end()` function. All types of streams emit `error` events when errors arise.

As a quick example, we can write a simple version of `cp` (the Unix utility that copies files). We could do that by reading the whole file with standard filesystem calls and then writing it out to a file. Unfortunately, that requires that the whole file be read in before it can be written. In this case, writing the file isn't faster, but if we were streaming over a network or doing CPU processing on the data, then there could be measurable performance improvements.

Run this script with arguments like `node cp.js src.txt dest.txt`. This would mean, in the code below, that `process.argv[2]` is `src.txt` and `process.argv[3]` is `desc.txt`.

```javascript
var fs = require('fs');
console.log(process.argv[2], '->', process.argv[3]);

var readStream = fs.createReadStream(process.argv[2]);
var writeStream = fs.createWriteStream(process.argv[3]);

readStream.on('data', function (chunk) {
  writeStream.write(chunk);
});

readStream.on('end', function () {
  writeStream.end();
});

//Some basic error handling
readStream.on('error', function (err) {
  console.log("ERROR", err);
});

writeStream.on('error', function (err) {
  console.log("ERROR", err);
});
```

This sets up a readable stream from the source file and a writable stream to the destination file. Then whenever the readable stream gets data, it gets written to the writeable stream. Then finally it closes the writable stream when the readable stream is finished.

It would have been better to use [pipe](/en/knowledge/advanced/streams/how-to-use-stream-pipe/) like `readStream.pipe(writeStream);`, however, to show how streams work, we have done things the long way.
