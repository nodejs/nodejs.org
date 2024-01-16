export const getAcronymFromString = (str: string) =>
  [...(str.trim().match(/\b(\w)/g) || '')].join('').toUpperCase();

// Note: We don't remove Markdown Headers delimiters as they're useful for delimiting sections
export const parseRichTextIntoPlainText = (richText: string) =>
  richText
    // replaces JSX and HTML and their properties with an empty string
    // keeping only the content left
    .replace(/<[^>]+>/gm, '')
    // replaces Markdown links with their text content
    .replace(/\[([^\]]+)\]\([^)]+\)/gm, '$1')
    // replaces Markdown lists with their content
    .replace(/^[*-] (.*)$/gm, '$1')
    // replaces Markdown underscore, bold and italic with their content
    .replace(/[_*]{1,2}(.*)[_*]{1,2}/gm, '$1')
    // replaces Markdown multiline codeblocks with their content
    .replace(/```.+?```/gms, '')
    // replaces emppty lines or lines just with spaces with an empty string
    .replace(/^\s*\n/gm, '')
    // replaces leading and trailing spaces from each line with an empty string
    .replace(/^[ ]+|[ ]+$/gm, '');
