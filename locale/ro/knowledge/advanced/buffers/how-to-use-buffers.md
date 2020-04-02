---
title: How to Use Buffers in Node.js
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - Buffer
  - buffer
  - buffers
  - binary
difficulty: 3
layout: knowledge-post.hbs
---

## Why Buffers?

Pure JavaScript, while great with unicode-encoded strings, does not handle straight binary data very well. This is fine on the browser, where most data is in the form of strings. However, Node.js servers have to also deal with TCP streams and reading and writing to the filesystem, both of which make it necessary to deal with purely binary streams of data.

One way to handle this problem is to just use strings *anyway*, which is exactly what Node.js did at first. However, this approach is extremely problematic to work with; It's slow, makes you work with an API designed for strings and not binary data, and has a tendency to break in strange and mysterious ways.

Don't use binary strings. Use *buffers* instead!

## What Are Buffers?

The `Buffer` class in Node.js is designed to handle raw binary data. Each buffer corresponds to some raw memory allocated outside V8. Buffers act somewhat like arrays of integers, but aren't resizable and have a whole bunch of methods specifically for binary data. The integers in a buffer each represent a byte and so are limited to values from 0 to 255 inclusive. When using `console.log()` to print the `Buffer` instance, you'll get a chain of values in hexadecimal values.

## Where You See Buffers:

In the wild, buffers are usually seen in the context of binary data coming from streams, such as `fs.createReadStream`.

## Usage:

### Creating Buffers:

There are a few ways to create new buffers:

```js
var buffer = Buffer.alloc(8);
// This will print out 8 bytes of zero:
// <Buffer 00 00 00 00 00 00 00 00>
```

This buffer is initialized and contains 8 bytes of zero.

```js
var buffer = Buffer.from([ 8, 6, 7, 5, 3, 0, 9]);
// This will print out 8 bytes of certain values:
// <Buffer 08 06 07 05 03 00 09>
```

This initializes the buffer to the contents of this array. Keep in mind that the contents of the array are integers representing bytes.

```js
var buffer = Buffer.from("I'm a string!", "utf-8");
// This will print out a chain of values in utf-8:
// <Buffer 49 27 6d 20 61 20 73 74 72 69 6e 67 21>
```

This initializes the buffer to a binary encoding of the first string as specified by the second argument (in this case, `'utf-8'`). `'utf-8'` is by far the most common encoding used with Node.js, but `Buffer` also supports others. See [Supported Encodings](https://nodejs.org/dist/latest/docs/api/buffer.html#buffer_buffers_and_character_encodings) for more details.

### Writing to Buffers

Given that there is already a buffer created:

```
> var buffer = Buffer.alloc(16)
```

we can start writing strings to it:

```
> buffer.write("Hello", "utf-8")
5
```

The first argument to `buffer.write` is the string to write to the buffer, and the second argument is the string encoding. It happens to default to utf-8 so this argument is extraneous.

`buffer.write` returned 5. This means that we wrote to five bytes of the buffer. The fact that the string "Hello" is also 5 characters long is coincidental, since each character *just happened* to be 8 bits apiece. This is useful if you want to complete the message:

```
> buffer.write(" world!", 5, "utf-8")
7
```

When `buffer.write` has 3 arguments, the second argument indicates an offset, or the index of the buffer to start writing at.

### Reading from Buffers:

#### toString:

Probably the most common way to read buffers is to use the `toString` method, since many buffers contain text:

```
> buffer.toString('utf-8')
'Hello world!\u0000�k\t'
```

Again, the first argument is the encoding. In this case, it can be seen that not the entire buffer was used! Luckily, because we know how many bytes we've written to the buffer, we can simply add more arguments to "stringify" the slice that's actually interesting:

```
> buffer.toString("utf-8", 0, 12)
'Hello world!'
```

#### Individual octets:

You can also set individual bytes by using an array-like syntax:

```
> buffer[12] = buffer[11];
33
> buffer[13] = "1".charCodeAt();
49
> buffer[14] = buffer[13];
49
> buffer[15] = 33
33
> buffer.toString("utf-8")
'Hello world!!11!'
```

In this example, I set the remaining bytes, by hand, such that they represent utf-8 encoded "!" and "1" characters.

### More Fun With Buffers

#### Buffer.isBuffer(object)

This method checks to see if `object` is a buffer, similar to `Array.isArray`.

#### Buffer.byteLength(string, encoding)

With this function, you can check the number of bytes required to encode a string with a given encoding (which defaults to utf-8). This length is *not* the same as string length, since many characters require more bytes to encode. For example:

```
> var snowman = "☃";
> snowman.length
1
> Buffer.byteLength(snowman)
3
```

The unicode snowman is only one character, but takes 3 entire bytes to encode!

#### buffer.length

This is the length of your buffer, and represents how much memory is allocated. It is not the same as the size of the buffer's contents, since a buffer may be half-filled. For example:

```
> var buffer = Buffer.alloc(16)
> buffer.write(snowman)
3
> buffer.length
16
```

In this example, the contents written to the buffer only consist of three groups (since they represent the single-character snowman), but the buffer's length is still 16, as it was initialized.

#### buffer.copy(target, targetStart=0, sourceStart=0, sourceEnd=buffer.length)

`buffer.copy` allows one to copy the contents of one buffer onto another. The first argument is the target buffer on which to copy the contents of `buffer`, and the rest of the arguments allow for copying only a subsection of the source buffer to somewhere in the middle of the target buffer. For example:

```
> var frosty = Buffer.alloc(24)
> var snowman = Buffer.from("☃", "utf-8")
> frosty.write("Happy birthday! ", "utf-8")
16
> snowman.copy(frosty, 16)
3
> frosty.toString("utf-8", 0, 19)
'Happy birthday! ☃'
```

In this example, I copied the "snowman" buffer, which contains a 3 byte long character, to the "frosty" buffer, to which I had written to the first 16 bytes. Because the snowman character is 3 bytes long, the result takes up 19 bytes of the buffer.

#### buffer.slice(start, end=buffer.length)

This method's API is generally the same as that of `Array.prototype.slice`, but with one very import difference: The slice is **not** a new buffer and merely references a subset of the memory space. *Modifying the slice will also modify the original buffer*! For example:

```
> var puddle = frosty.slice(16, 19)
> puddle.toString()
'☃'
> puddle.write("___")
3
> frosty.toString("utf-8", 0, 19)
'Happy birthday! ___'
```

Now Frosty has been turned into a puddle of underscores. Bummer.
