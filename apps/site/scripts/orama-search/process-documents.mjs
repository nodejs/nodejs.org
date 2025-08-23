import { sep as posixSep, basename } from 'node:path/posix';
import { sep as winSep } from 'node:path/win32';

import { slug } from 'github-slugger';
import matter from 'gray-matter';

// Note: We don't remove Markdown Headers delimiters as they're useful for delimiting sections
// TODO(@avivkeller): Use remark
const parseRichTextIntoPlainText = richText =>
  richText
    // replaces JSX and HTML and their properties with an empty string
    // keeping only the content left
    .replace(/<[^>]+>/gm, '')
    // replaces Markdown links with their text content
    .replace(/\[([^\]]+)\]\([^)]+\)/gm, '$1')
    // replaces Markdown lists with their content
    .replace(/^[*-] (.*)$/gm, '$1')
    // replaces Markdown underscore, bold and italic with their content
    .replace(/(\*\*|\*|__|_)(.*?)\1/gm, '$2')
    // replaces Markdown multiline codeblocks with their content
    .replace(/```.+?```/gms, '')
    // replaces empty lines or lines just with spaces with an empty string
    .replace(/^\s*\n/gm, '')
    // replaces leading and trailing spaces from each line with an empty string
    .replace(/^[ ]+|[ ]+$/gm, '')
    // replaces leading numbers and dots from each line with an empty string
    .replace(/^\d+\.\s/gm, '');

// Normalize path separators to POSIX
const toPosix = str => str.replaceAll(winSep, posixSep);

// Derive page title from path
const getPageTitle = path => basename(path, '.html').replace(/-/g, ' ');

// Capitalize first character
const capitalize = str => str[0].toUpperCase() + str.slice(1);

// Split markdown into sections by headings
const splitIntoSections = content => {
  const sections = [];
  let current = null;

  for (const line of content.split('\n')) {
    if (/^#{1,6}\s/.test(line)) {
      current = {
        pageSectionTitle: line.replace(/^#{1,6}\s*/, ''),
        pageSectionContent: [],
      };
      sections.push(current);
    } else if (current) {
      current.pageSectionContent.push(line);
    }
  }

  return sections.map(s => ({
    ...s,
    pageSectionContent: s.pageSectionContent.join('\n'),
  }));
};

// Main processor
export const processDocument = (
  { pathname, content },
  hasFrontmatter = false
) => {
  pathname = toPosix(pathname);

  let pageTitle;

  if (hasFrontmatter) {
    const { data, content: parsed } = matter(content);
    pageTitle = data.title;
    content = parsed;
  }

  content = parseRichTextIntoPlainText(content);
  pageTitle ||= getPageTitle(pathname);
  const siteSection = capitalize(pathname.split('/')[0]);

  return splitIntoSections(content).map(section => ({
    path: `${pathname}#${slug(section.pageSectionTitle)}`,
    siteSection: siteSection,
    pageTitle: pageTitle,
    ...section,
  }));
};
