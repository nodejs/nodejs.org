---
title: How do I make a http request?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - http
difficulty: 2
layout: knowledge-post.hbs
---

Another extremely common programming task is making an HTTP request to a web server. Node.js provides an extremely simple API for this functionality in the form of `http.request`.

As an example, we are going to preform a GET request to <https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new> (which returns a random integer between 1 and 10) and print the result to the console.

```javascript
var http = require('http');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'www.random.org',
  path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been received, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been received, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();
```

Making a POST request is just as easy. We will make a POST request to `www.nodejitsu.com:1337` which is running a server that will echo back what we post. The code for making a POST request is almost identical to making a GET request, just a few simple modifications:

```javascript
var http = require('http');

//The url we want is `www.nodejitsu.com:1337/`
var options = {
  host: 'www.nodejitsu.com',
  path: '/',
  //since we are listening on a custom port, we need to specify it by hand
  port: '1337',
  //This is what changes the request to a POST request
  method: 'POST'
};

callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

var req = http.request(options, callback);
//This is the data we are posting, it needs to be a string or a buffer
req.write("hello world!");
req.end();
```

Throwing in custom headers is just a tiny bit harder. On `www.nodejitsu.com:1338` we are running a server that will print out the `custom` header. So we will just make a quick request to it:

```javascript
var http = require('http');

var options = {
  host: 'www.nodejitsu.com',
  path: '/',
  port: '1338',
  //This is the only line that is new. `headers` is an object with the headers to request
  headers: {'custom': 'Custom Header Demo works'}
};

callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

var req = http.request(options, callback);
req.end();
```
