---
title: How to access query string parameters
date: '2011-08-26T10:08:50.000Z'
tags:
  - http
difficulty: 1
layout: knowledge-post.hbs
---

In Node.js, functionality to aid in the accessing of URL query string parameters is built into the standard library. The built-in `url.parse` method takes care of most of the heavy lifting for us. Here is an example script using this handy function and an explanation on how it works:

```js
const http = require('http');
const url = require('url');

http.createServer(function (req, res) {
  const queryObject = url.parse(req.url,true).query;
  console.log(queryObject);

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Feel free to add query parameters to the end of the url');
}).listen(8080);
```

> To test this code run `node app.js` (app.js is name of the file) on the terminal and then go to your browser and type `http://localhost:8080/app.js?foo=bad&baz=foo` on the URL bar

The key part of this whole script is this line: `const queryObject = url.parse(req.url,true).query;`. Let's take a look at things from the inside-out. First off, `req.url` will look like `/app.js?foo=bad&baz=foo`. This is the part that is in the URL bar of the browser. Next, it gets passed to `url.parse` which parses out the various elements of the URL (NOTE: the second paramater is a boolean stating whether the method should parse the query string, so we set it to true). Finally, we access the `.query` property, which returns us a nice, friendly JavaScript object with our query string data.

The `url.parse()` method returns an object which have many key value pairs one of which is the `query` object. Some other handy information returned by the method include `host`, `pathname`, `search` keys.

In the above code:

* `url.parse(req.url,true).query` returns `{ foo: 'bad', baz: 'foo' }`.
* `url.parse(req.url,true).host` returns `'localhost:8080'`.
* `url.parse(req.url,true).pathname` returns `'/app.js'`.
* `url.parse(req.url,true).search` returns `'?foo=bad&baz=foo'`.

### Parsing with querystring

Another way to access query string parameters is parsing them using the `querystring` builtin Node.js module.

This method, however, must be passed just a querystring portion of a url. Passing it the whole url, like you did in the `url.parse` example, won't parse the querystrings.

```js
const querystring = require('querystring');
const url = "http://example.com/index.html?code=string&key=12&id=false";
const qs = "code=string&key=12&id=false";

console.log(querystring.parse(qs));
// > { code: 'string', key: '12', id: 'false' }

console.log(querystring.parse(url));
// > { 'http://example.com/index.html?code': 'string', key: '12', id: 'false' }
```
