---
title: How to use the crypto module
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - crypto
difficulty: 3
layout: knowledge-post.hbs
---

The [crypto](https://nodejs.org/api/crypto.html) module is a wrapper for [OpenSSL](https://en.wikipedia.org/wiki/Openssl) cryptographic functions. It supports calculating hashes, authentication with HMAC, ciphers, and more!

The crypto module is mostly useful as a tool for implementing [cryptographic protocols](https://en.wikipedia.org/wiki/Cryptographic_protocol) such as [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) and [https](https://en.wikipedia.org/wiki/Https). For most users, the built-in [tls module](https://nodejs.org/api/tls.html) and [https module](https://nodejs.org/api/https.html) should more than suffice. However, for the user that only wants to use small parts of what's needed for full-scale cryptography or is crazy/desperate enough to implement a protocol using OpenSSL and Node.js: Read on.

## Hashes

### What Is A Hash?

A hash is a fixed-length string of bits that is procedurally and deterministically generated from some arbitrary block of source data. Some important properties of these hashes (the type useful for cryptography) include:

* **Fixed length:** This means that, no matter what the input, the length of the hash is the same. For example, SHA-256 hashes are always 256 bits long whether the input data is a few bits or a few gigabytes.

* **Deterministic:** For the same input, you should expect to be able to calculate exactly the same hash. This makes hashes useful for checksums.

* **Collision-Resistant:** A collision is when the same hash is generated for two different input blocks of data. Hash algorithms are designed to be extremely unlikely to have collisions -- just how unlikely is a property of the hash algorithm. The importance of this property depends on the use case.

* **Unidirectional:** A good hash algorithm is easy to apply, but hard to undo. This means that, given a hash, there isn't any reasonable way to find out what the original piece of data was.

### Hash Algorithms That Work With Crypto

The hashes that work with crypto are dependent on what your version of OpenSSL supports. If you have a new enough version of OpenSSL, you can get a list of hash types your OpenSSL supports by typing `openssl list-message-digest-algorithms` into the command line. For older versions, simply type `openssl list-message-digest-commands` instead!

One of the most common hash algorithms is [SHA-256](https://en.wikipedia.org/wiki/SHA-2). Older popular types like **[SHA-1](https://en.wikipedia.org/wiki/Sha1) or [MD5](https://en.wikipedia.org/wiki/MD5#Security) are not secure any more** and should not be used.

### How To Calculate Hashes with Crypto

Crypto has a method called `createHash` which allows you to calculate a hash. Its only argument is a string representing the hash. This example finds the SHA-256 hash for the string, "Man oh man do I love node!":

```js
require("crypto")
  .createHash("sha256")
  .update("Man oh man do I love node!")
  .digest("hex");
```

The `update` method is used to push data to later be turned into a hash with the `digest` method. `update` can be invoked multiple times to ingest streaming data, such as buffers from a file read stream. The argument for `digest` represents the output format, and may either be "binary", "hex" or "base64". It defaults to binary.

## HMAC

HMAC stands for Hash-based Message Authentication Code, and is a process for applying a hash algorithm to both data and a secret key that results in a single final hash. Its use is similar to that of a vanilla hash, but also allows to check the *authenticity* of data as *well* as the integrity of said data (as you can using SHA-256 checksums).

The API for hmacs is very similar to that of `createHash`, except that the method is called `createHmac` and it takes a key as a second argument:

```js
require("crypto").createHmac("sha256", "password")
  .update("If you love node so much why don't you marry it?")
  .digest("hex");
```

The resulting SHA-256 hash is unique to both the input data and the key.

## Ciphers

Ciphers allow you to encode and decode messages given a password.

### Cipher Algorithms That Work With Crypto

Like crypto's hash algorithms, the cyphers that work with crypto are dependent on what your version of OpenSSL supports. You can get a list of hash types your OpenSSL supports by typing `openssl list-cipher-commands` into the command line for older versions, or `openssl list-cipher-algorithms` for newer versions of OpenSSL. OpenSSL supports *many* ciphers; A good and popular one is [AES_256](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard).

### How To Use Cipher Algorithms with Crypto:

Crypto comes with two methods for ciphering and deciphering:

* `crypto.createCipheriv(algorithm, key, iv)`
* `crypto.createDecipheriv(algorithm, key, iv)`

Both of these methods take arguments similarly to `createHmac`. They also both have analogous `update` functions. However, each use of `update` returns a chunk of the encoded/decoded data instead of requiring one to call `digest` to get the result. Moreover, after encoding (or decoding) your data, you will likely have to call the `final` method to get the last chunk of encoded information.

Another important addition in the cipher method is of the `iv` or [initialization vector](https://en.wikipedia.org/wiki/Initialization_vector). Initialization vectors should be unpredictable and unique, typically required to be random or pseudorandom. Randomization is crucial for encryption schemes to achieve semantic security, a property whereby repeated usage of the scheme under the same key does not allow an attacker to infer relationships between segments of the encrypted message.

Here's an example, slightly less trivial than previous examples, that uses crypto and [yargs](https://github.com/yargs/yargs) to encode and decode messages from the command line:

```js
#!/usr/bin/env node

const crypto = require('crypto'),
    argv = require("yargs").argv,
    resizedIV = Buffer.allocUnsafe(16),
    iv = crypto
      .createHash("sha256")
      .update("myHashedIV")
      .digest();

iv.copy(resizedIV);

if (argv.e && argv.key) {
    const key = crypto
        .createHash("sha256")
        .update(argv.key)
        .digest(),
        cipher = crypto.createCipheriv("aes256", key, resizedIV),
        msg = [];

    argv._.forEach( function (phrase) {
        msg.push(cipher.update(phrase, "binary", "hex"));
    });

    msg.push(cipher.final("hex"));
    console.log(msg.join(""));

} else if (argv.d && argv.key) {
    const key = crypto
        .createHash("sha256")
        .update(argv.key)
        .digest(),
        decipher = crypto.createDecipheriv("aes256", key, resizedIV),
        msg = [];

    argv._.forEach( function (phrase) {
        msg.push(decipher.update(phrase, "hex", "binary"));
    });

    msg.push(decipher.final("binary"));
    console.log(msg.join(""));
}
```

NODE PRO TIP: The `crypto.createCipheriv()` and `crypto.createDecipheriv()` methods do not take a password, rather a `key` and an `iv` which are combined together to form a random password. The size of the `key` and `iv` depends on the chosen algorithm. A reference to common algorithms and their `key` and `iv` size is given below:

| Algorithm   | Key                | iv                 |
|-------------|--------------------|--------------------|
| aes128      | 16 byte (128 bits) | 16 byte (128 bits) |
| aes-128-cbc | 16 byte (128 bits) | 16 byte (128 bits) |
| aes192      | 24 byte (192 bits) | 16 byte (128 bits) |
| aes256      | 32 byte (256 bits) | 16 byte (128 bits) |

In the code above The user entered `key` is hashed using `SHA-256 encryption` which produces a 32 byte buffer by default, this buffered key is then used as the [cryptographic key](https://en.wikipedia.org/wiki/Key_(cryptography)) in the `crypto.createCipheriv()` and `crypto.createDecipheriv()` methods. The `iv` is also hashed with `SHA-256 encryption` and is 32 byte in size but all AES (CBC mode and CFB mode) take `iv` of exactly 16 byte (128 bits) therefor another Buffer `resizedIV` is used which contains the first 16 byte of original 32 byte `iv`.

Using this script to encode a message looks like this:

```bash
$ node ./secretmsg.js -e --key="popcorn" "My treasure is buried behind Carl's Jr. on Telegraph."
c8c78895fd91da17cca9cf0d28e742c6077fb5a89ef5cdc23d9c37c96c5fb7f321d7f52c06e73c46633783d9535e2aa5cc07f2ad1803d73614c4e6882026bfd9
```

Now, if I gave somebody the same script, my encoded message and the key, they can decode the message and find out where I buried my treasure:

```bash
$ node ./secretmsg.js -d --key="popcorn" c8c78895fd91da17cca9cf0d28e742c6077fb5a89ef5cdc23d9c37c96c5fb7f321d7f52c06e73c46633783d9535e2aa5cc07f2ad1803d73614c4e6882026bfd9
My treasure is buried behind Carl's Jr. on Telegraph.
```

You should know that what I buried behind Carl's Jr was just a cigarette butt, and that this script is obviously not for serious use.

## Signing and Verification

Crypto has other methods used for dealing with certificates and credentials, as used for TLS:

* `crypto.createCredentials`
* `crypto.createSign`
* `crypto.createVerify`

These methods supply the last building blocks for a complete cryptographic protocol, and require an advanced knowledge of real-world cryptographic protocols to be useful. Again, it is recommended that developers use either the [tls](https://nodejs.org/api/tls.html) module or the [https](https://nodejs.org/api/https.html) module if applicable.
