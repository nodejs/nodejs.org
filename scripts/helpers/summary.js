'use strict'

const cheerio = require('cheerio');

const SUMMARY_LENGHT = 400;

module.exports = function (contents, locale, path) {
    let $ = cheerio.load(contents);

    let summary = '';
    let child = 1;

    $('*').each((i, elem) => {
        if (summary.length > SUMMARY_LENGHT) {
            summary += `<p><a href='/${locale}/${path}/'>Read more...</a></p>`;
            return false;
        }

        if (elem.parent) {
            return;
        }

        summary += $.html(elem);
    })

    return `${summary}`;
};
