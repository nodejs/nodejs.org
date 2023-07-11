// Jest only supports CommonJS for Snpashot Serializers
const diffableHtml = require('diffable-html');

module.exports = {
  // We test if the input value is a string and matches a minified HTML string
  test: value =>
    typeof value === 'string' &&
    value.length > 2 &&
    value[0] === '<' &&
    value[value.length - 1] === '>',
  // We make the HTML string diffable (beautified) and remove all class name attributes
  // This prevents issues with CSS modules auto generated classdes
  print: value => diffableHtml(value.replace(/class="(.*?)"/gm, '')).trim(),
};
