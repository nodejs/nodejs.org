---
date: '2011-08-26T10:08:50.000Z'
tags:
  - json
  - stringify
  - parse
title: What is JSON?
difficulty: 5
layout: knowledge-post.hbs
---

JavaScript Object Notation, or JSON, is a lightweight data format that
has become the defacto standard for the web. JSON can be represented
as either a list of values, e.g. an Array, or a hash of properties and
values, e.g. an Object.

    // a JSON array
    ["one", "two", "three"]

    // a JSON object
    { "one": 1, "two": 2, "three": 3 }

## Encoding and Decoding

JavaScript provides 2 methods for encoding data structures to json and
encoding json back to javascript objects and arrays. They are both
available on the `JSON` object that is available in the global scope.

`JSON.stringify` takes a javascript object or array and returns a
serialized string in the JSON format.

    var data = {
      name: "John Doe"
      , age: 32
      , title: "Vice President of JavaScript"
    }

    var jsonStr = JSON.stringify(data);

    console.log(jsonStr);

    // prints '{"name":"John Doe","age":32,"title":"Vice President of JavaScript"}'

`JSON.parse` takes a JSON string and decodes it to a javascript data
structure.

    var jsonStr = '{"name":"John Doe","age":32,"title":"Vice President of JavaScript"}';

    var data = JSON.parse(jsonStr);

    console.log(data.title);

    // prints 'Vice President of JavaScript'

## What is valid JSON?

There are a few rules to remember when dealing with data in JSON
format. There are several gotchas that can produce invalid JSON as well.

* Empty objects and arrays are okay
* Strings can contain any unicode character, this includes object properties
* `null` is a valid JSON value on it's own
* All object properties should always be double quoted
* Object property values must be one of the following: String, Number, Boolean, Object, Array, null
* Number values must be in decimal format, no octal or hex representations
* Trailing commas on arrays are not allowed

These are all examples of valid JSON.

    {"name":"John Doe","age":32,"title":"Vice President of JavaScript"}

    ["one", "two", "three"]

    // nesting valid values is okay
    {"names": ["John Doe", "Jane Doe"] }
     
    [ { "name": "John Doe"}, {"name": "Jane Doe"} ]

    {} // empty hash

    [] // empty list

    null

    { "key": "\uFDD0" } // unicode escape codes

These are all examples of bad JSON formatting.

    { name: "John Doe", 'age': 32 } // name and age should be in double quotes

    [32, 64, 128, 0xFFF] // hex numbers are not allowed

    { "name": "John Doe", age: undefined } // undefined is an invalid value

    // functions and dates are not allowed
    { "name": "John Doe"
      , "birthday": new Date('Fri, 26 Aug 2011 07:13:10 GMT')
      , "getName": function() {
          return this.name;
      }
    }

Calling `JSON.parse` with an invalid JSON string will result in a
SyntaxError being thrown. If you are not sure of the validity of your
JSON data, you can anticipate errors by wrapping the call in a
try/catch block.

Notice that the only complex values allowed in JSON are objects and
arrays. Functions, dates and other types are excluded. This may not
seem to make sense at first. But remember that JSON is a data format,
not a format for transfering complex javascript objects along with
their functionality.

## JSON in other languages

Although JSON was inspired by the simplicity of javascript data
structures, it's use is not limited to the javascript language. Many
other languages have methods of transfering native hashes and lists
into stringified JSON objects. Here's a quick example in ruby.

    require 'json'

    data = { :one => 1 }
    puts data.to_json

    # prints "{ \"one\": 1 }"
