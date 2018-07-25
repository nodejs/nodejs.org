---
title: How to use the crypto module
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - crypto
difficulty: 3
layout: knowledge-post.hbs
---

The [crypto](https://nodejs.org/docs/v0.4.10/api/crypto.html) module is a wrapper for [OpenSSL](http://en.wikipedia.org/wiki/Openssl) cryptographic functions. It supports calculating hashes, authentication with HMAC, ciphers, and more!

The crypto module is mostly useful as a tool for implementing [cryptographic protocols](http://en.wikipedia.org/wiki/Cryptographic_protocol) such as [TLS](http://en.wikipedia.org/wiki/Transport_Layer_Security) and [https](http://en.wikipedia.org/wiki/Https). For most users, Node's built-in [tls module](https://nodejs.org/docs/v0.4.10/api/tls.html) and [https module](https://nodejs.org/docs/v0.4.10/api/https.html) should more than suffice. However, for the user that only wants to use small parts of what's needed for full-scale cryptography or is crazy/desperate enough to implement a protocol using OpenSSL and Node: Read on.

## Hashes

### What Is A Hash?

A hash is a fixed-length string of bits that is procedurally and deterministially generated from some arbitrary block of source data. Some important properties of these hashes (the type useful for cryptography) include:

* **Fixed length:** This means that, no matter what the input, the length of the hash is the same. For example, md5 hashes are always 128 bits long whether the input data is a few bits or a few gigabytes.

* **Deterministic:** For the same input, you should expect to be able to calculate exactly the same hash. This makes hashes useful for checksums.

* **Collision-Resistant:** A collision is when the same hash is generated for two different input blocks of data. Hash algorithms are designed to be extremely unlikely to have collisions -- just how unlikely is a property of the hash algorithm. The importance of this property depends on the use case.

* **Unidirectional:** A good hash algorithm is easy to apply, but hard to undo. This means that, given a hash, there isn't any reasonable way to find out what the original piece of data was.

### Hash Algorithms That Work With Crypto

The hashes that work with crypto are dependent on what your version of OpenSSL supports. If you have a new enough version of OpenSSL, you can get a list of hash types your OpenSSL supports by typing `openssl list-message-digest-algorithms` into the command line. For older versions, simply type `openssl list-message-digest-commands` instead! Some of the most common hash types are: 

* [sha1](http://en.wikipedia.org/wiki/Sha1)
* [md5](http://en.wikipedia.org/wiki/Md5).

### How To Calculate Hashes with Crypto

Crypto has a method called `createHash` which allows you to calculate a hash. Its only argument is a string representing the hash This example finds the md5 hash for the string, "Man oh man do I love node!":

    require("crypto")
      .createHash("md5")
      .update("Man oh man do I love node!")
      .digest("hex");

The `update` method is used to push data to later be turned into a hash with the `digest` method. `update` can be invoked multiple times to ingest streaming data, such as buffers from a file read stream. The argument for `digest` represents the output format, and may either be "binary", "hex" or "base64". It defaults to binary.

## HMAC

HMAC stands for Hash-based Message Authentication Code, and is a process for applying a hash algorithm to both data and a secret key that results in a single final hash. Its use is similar to that of a vanilla hash, but also allows to check the *authenticity* of data as *well* as the integrity of said data (as you can using md5 checksums).

The API for hmacs is very similar to that of `createHash`, except that the method is called `createHmac` and it takes a key as a second argument:

    require("crypto").createHmac("md5", "password")
      .update("If you love node so much why don't you marry it?")
      .digest("hex");

The resulting md5 hash is unique to both the input data and the key.

## Ciphers

Ciphers allow you to encode and decode messages given a password.

### Cipher Algorithms That Work With Crypto

Like crypto's hash algorithms, the cyphers that work with crypto are dependent on what your version of OpenSSL supports. You can get a list of hash types your OpenSSL supports by typing `openssl list-cipher-commands` into the command line for older versions, or `openssl list-cipher-algorithms` for newer versions of OpenSSL. OpenSSL supports *many* ciphers; A good and popular one is [AES192](http://en.wikipedia.org/wiki/Aes192).

### How To Use Cipher Algorithms with Crypto:

Crypto comes with two methods for ciphering and deciphering:

* `crypto.createCypher(algorithm, key)`
* `crypto.createDecipher(algorithm, key)`

Both of these methods take arguments similarly to `createHmac`. They also both have analogous `update` functions. However, each use of `update` returns a chunk of the encoded/decoded data instead of requiring one to call `digest` to get the result. Moreover, after encoding (or decoding) your data, you will likely have to call the `final` method to get the last chunk of encoded information.

Here's an example, slightly less trivial than previous examples, that uses crypto and [optimist](https://github.com/substack/node-optimist) to encode and decode messages from the command line:

    #!/usr/bin/env node

    var crypto = require("crypto"),
        argv = require("optimist").argv;

    if (argv.e && argv.password) {
        var cipher = crypto.createCipher("aes192", argv.password),
            msg = [];

        argv._.forEach( function (phrase) {
            msg.push(cipher.update(phrase, "binary", "hex"));
        });

        msg.push(cipher.final("hex"));
        console.log(msg.join(""));

    } else if (argv.d && argv.password) {
        var decipher = crypto.createDecipher("aes192", argv.password),
            msg = [];

        argv._.forEach( function (phrase) {
            msg.push(decipher.update(phrase, "hex", "binary"));
        });

        msg.push(decipher.final("binary"));
        console.log(msg.join(""));   
    }

Using this script to encode a message looks like this:

    $ ./secretmsg.js -e --password="popcorn" "My treasure is buried behind Carl's Jr. on Telegraph."
    6df66752b24f0886f8a6c55e56977788c2090bb657ff3bd645097f8abe11099963fb3bd9627986c60fa7e5120d8fead928cff620b37e3e79be8de519f490527a

Now, if I gave somebody the same script, my encoded message and the password, they can decode the message and find out where I buried my treasure:

    $ ./secretmsg.js -d --password="popcorn" 6df66752b24f0886f8a6c55e56977788c2090bb657ff3bd645097f8abe11099963fb3bd9627986c60fa7e5120d8fead928cff620b37e3e79be8de519f490527a
    My treasure is buried behind Carl's Jr. on Telegraph.

You should know that what I buried behind Carl's Jr was just a cigarette butt, and that this script is obviously not for serious use.

## Signing and Verification

Crypto has other methods used for dealing with certificates and credentials, as used for TLS:

* `crypto.createCredentials`
* `crypto.createSign`
* `crypto.createVerify`

These methods supply the last building blocks for a complete cryptographic protocol, and require an advanced knowledge of real-world cryptographic protocols to be useful. Again, it is recommended that developers use either the [tls](https://nodejs.org/docs/v0.4.10/api/tls.html) module or the [https](https://nodejs.org/docs/v0.4.10/api/https.html) module if applicable.
