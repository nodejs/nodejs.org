import crypto from 'node:crypto';
import zlib from 'node:zlib';

import { slug } from 'github-slugger';

import { NEXT_DATA_URL } from '../../next.constants.mjs';

const nextPageData = await fetch(`${NEXT_DATA_URL}/page-data`);
const pageData = await nextPageData.json();

function inflate(data) {
  return zlib.inflateSync(Buffer.from(data, 'base64')).toString('utf-8');
}

function splitIntoSections(markdownContent) {
  const lines = markdownContent.split(/\n/gm);
  const sections = [];

  let section = null;

  for (const line of lines) {
    if (line.match(/^#{1,6}\s/)) {
      section = {
        pageSectionTitle: stripMarkdownTags(line.replace(/^#{1,6}\s*/, '')),
        pageSectionContent: [],
      };
      sections.push(section);
    } else if (section) {
      section.pageSectionContent.push(line);
    }
  }

  return sections.map(section => ({
    ...section,
    pageSectionContent: stripMarkdownTags(
      section.pageSectionContent.join('\n')
    ),
  }));
}

function stripMarkdownTags(markdownContent) {
  return (
    markdownContent
      // Remove links, but keep the text
      .replace(/\[([^\]]+)\]\([^)]+\)/gm, '$1')
      // Remove self-closing links
      .replace(/\[([^\]]+)\]\[\]/g, '$1')
      // Remove lists
      .replace(/^-\s/gm, '')
      // Remove bold elements
      .replace(/\*\*(.*?)\*\*/g, '$1')
  );
}

export const siteContent = pageData
  .map(data => {
    const { pathname, title, content } = data;
    const markdownContent = inflate(content);
    const siteSection = pathname.split('/').shift();
    const subSections = splitIntoSections(markdownContent);

    return subSections.map(section => {
      const id = crypto
        .createHash('sha256')
        .update(`${pathname}:${title}:${section.pageSectionTitle}`)
        .digest('hex')
        .substring(0, 24);
      return {
        id,
        path: pathname + '#' + slug(section.pageSectionTitle),
        siteSection,
        pageTitle: title,
        ...section,
      };
    });
  })
  .flat();
