'use strict'

const cheerio = require('cheerio');

module.exports = function (contents) {
    var $ = cheerio.load('<div>'+contents+'</div>');

    var summary = $(':nth-child(1)').html();
    console.log(contents);

    console.log("hello");

    return summary;
};

// module.exports('<h2 class="title">Hello world</h2><h2>asdfasd</h2>');
