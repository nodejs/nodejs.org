---
title: How To Use The TLS Module
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - tls
  - ssl
  - secure
difficulty: 3
layout: knowledge-post.hbs
---

## What is TLS?

[Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (or TLS) is the successor to Secure Sockets Layer (or SSL). It, along with SSL, are the de-facto standard cryptographic protocols for secure communications over the web. TLS encrypts communications on top of a network transport layer (typically tcp), and uses public-key cryptography to encrypt messages.

### Public-Key Cryptography

In public-key cryptography, each peer has two keys: A public key, and a private key. The public key is shared with everyone, and the private key is (naturally) kept secret. In order to encrypt a message, a computer requires its private key and the recipient's public key. Then, in order to decrypt the message, the recipient requires its *own* private key and the *sender*'s public key.

In TLS connections, the public key is called a *[certificate](https://en.wikipedia.org/wiki/Digital_certificate)*. This is because it's "[signed](https://en.wikipedia.org/wiki/Digital_signature)" to prove that the public key belongs to its owner. TLS certificates may either be signed by a third-party certificate authority (CA), or they may be [self-signed](https://en.wikipedia.org/wiki/Self-signed_certificate). In the case of Certificate Authorities, Mozilla keeps [a list of trusted root CAs](http://mxr.mozilla.org/mozilla/source/security/nss/lib/ckfw/builtins/certdata.txt) that are generally agreed upon by most web browsers. These root CAs may then issue certificates to other signing authorities, which in turn sign certificates for the general public.

### History of TLS/SSL Support in Node.js

TLS support in node is relatively new. The first stable version of Node.js to support TLS and HTTPS was the v0.4 branch, which was released in early 2011. Since then, the primary focus of the core developers has shifted from TLS/HTTPS to Windows support in the v0.5 branch. As such, the TLS APIs in node are still a little rough around the edges, and documentation leaves something to be desired.

## The tls Module

### tls.createServer

In most ways, the tls module's server api is similar to that of the net module. Besides the fact that it's for encrypted connections, the major difference is that the options object passed to `tls.connect` or `tls.createServer` needs to include information on both the private key and the certificate, in [pem format](https://en.wikipedia.org/wiki/X.509#Certificate_filename_extensions). Here's an example of a tls server:

```javascript
var tls = require('tls'),
    fs = require('fs'),
    msg = [
            ".-..-..-.  .-.   .-. .--. .---. .-.   .---. .-.",
            ": :; :: :  : :.-.: :: ,. :: .; :: :   : .  :: :",
            ":    :: :  : :: :: :: :: ::   .': :   : :: :: :",
            ": :: :: :  : `' `' ;: :; :: :.`.: :__ : :; ::_;",
            ":_;:_;:_;   `.,`.,' `.__.':_;:_;:___.':___.':_;"
          ].join("\n");

var options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('public-cert.pem')
};

tls.createServer(options, function (s) {
  s.write(msg+"\n");
  s.pipe(s);
}).listen(8000);
```

In this example, a "hello world" tls server is created, listening on port 8000. The options object includes two properties: `key` and `cert`. The contents of these properties come directly from the private key and public certificate stored on the filesystem. In this case they are binary buffers, but the tls module can also accept unicode strings.

### Generating Your Private Key And Certificate With OpenSSL:

In order for this example server to work, of course, you will need a private key and a certificate. You can generate both of these with OpenSSL.

First, generate a private key:

```
$ openssl genrsa -out private-key.pem 1024
Generating RSA private key, 1024 bit long modulus
......................................++++++
........++++++
e is 65537 (0x10001)
```

This creates a suitable private key and writes it to `./private-key.pem`.

Next, create a Certificate Signing Request file using your private key:

```
$ openssl req -new -key private-key.pem -out csr.pem
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:California
Locality Name (eg, city) []:Oakland
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Panco, Inc.
Organizational Unit Name (eg, section) []:
Common Name (eg, YOUR name) []:Joshua Holbrook
Email Address []:josh.holbrook@gmail.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:dangerface
An optional company name []:
```

The purpose of this CSR is to "request" a certificate. That is, if you wanted a CA to sign your certificate, you could give this file to them to process and they would give you back a certificate.

Alternately, however, you may self-sign your certificate, again using your private key:

```
$ openssl x509 -req -in csr.pem -signkey private-key.pem -out public-cert.pem
Signature ok
subject=/C=US/ST=California/L=Oakland/O=Panco, Inc./CN=Joshua Holbrook/emailAddress=josh.holbrook@gmail.com
Getting Private key
```

This generates your certificate. Now you're cooking!

### Trying it out:

One way to test out your new "hello world" server is to again use OpenSSL:

```
openssl s_client -connect 127.0.0.1:8000
```

You should see a bunch of output regarding the handshaking process, and then at the very end you should see a big, cyan figlet banner saying, "Hi world!"

### tls.connect

The tls module also supplies tools for connecting to such a server:

```javascript
var tls = require('tls'),
    fs = require('fs');

var options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('public-cert.pem')
};

var conn = tls.connect(8000, options, function() {
  if (conn.authorized) {
    console.log("Connection authorized by a Certificate Authority.");
  } else {
    console.log("Connection not authorized: " + conn.authorizationError)
  }
    console.log();
});

conn.on("data", function (data) {
  console.log(data.toString());
  conn.end();
});
```

The idea is similar, except instead of creating a server, this script connects to one instead. `tls.connect` also takes an options object, but then returns a stream.

`tls.connect` also fires a callback when the connection is made, which allows for checking to see if the connection is authorized---that is, if all the certificates are in order. `conn.authorized` is a boolean, and `conn.authorizationError` is a string containing the reason that the connection is unauthorized.

This is what happens when the client is ran (with the server running):

```
$ node client.js
Connection not authorized: DEPTH_ZERO_SELF_SIGNED_CERT

.-..-..-.  .-.   .-. .--. .---. .-.   .---. .-.
: :; :: :  : :.-.: :: ,. :: .; :: :   : .  :: :
:    :: :  : :: :: :: :: ::   .': :   : :: :: :
: :: :: :  : `' `' ;: :; :: :.`.: :__ : :; ::_;
:_;:_;:_;   `.,`.,' `.__.':_;:_;:___.':___.':_;
```

Note that self-signing the server certificate results in a non-authorized status because you're not listed as a trusted certificate authority.

## "starttls"

It's entirely possible to "upgrade" an existing tcp connection into a TLS-encrypted one with node. However, node does not have a special functions for doing so as of the v0.4 branch. Therefore, it needs to be done "by-hand", using the crypto module and some undocumented tls module functionality. The Node.js documentation points to <https://gist.github.com/848444>, which aims to abstract the process.
