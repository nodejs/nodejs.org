// Check whether we've got the comment matches
// <!--comment-->, <!--comment --> and even <!-- comment-->
// (20 hex = 32 dec = space character)
// Only need to find one that matches the Regex, we cannot use
// 'g' here because it will continue searching for the rest string,
// and you have to reset the lastIndex, which isn't a necessary for
// our current situation.
// For more, you can see:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex#Description
const ANCHOR_COMMENTREG = /<!--\x20?([\w\x20-]+)\x20?-->/;

export const getHeadingLink = (heading: string) =>
  heading
    .replace(ANCHOR_COMMENTREG, (_, comment) => comment)
    .replace(/(\[([^\]]+)]\([^)]+\))/g, '$2')
    .replace(/[^\w]+/g, '-')
    .replace(/[\x20]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/(^-|-$)/g, '');
