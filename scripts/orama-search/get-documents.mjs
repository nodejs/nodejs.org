import zlib from 'node:zlib';

import { slug } from 'github-slugger';

import { NEXT_DATA_URL } from '../../next.constants.mjs';

const nextPageData = await fetch(`${NEXT_DATA_URL}/page-data`);
const nextAPIPageData = await fetch(`${NEXT_DATA_URL}/api-data`);

const pageData = await nextPageData.json();
const apiData = await nextAPIPageData.json();

const splitIntoSections = markdownContent => {
  const lines = markdownContent.split(/\n/gm);
  const sections = [];

  let section = null;

  for (const line of lines) {
    if (line.match(/^#{1,6}\s/)) {
      section = {
        pageSectionTitle: line.replace(/^#{1,6}\s*/, ''),
        pageSectionContent: [],
      };
      sections.push(section);
    } else if (section) {
      section.pageSectionContent.push(line);
    }
  }

  return sections.map(section => ({
    ...section,
    pageSectionContent: section.pageSectionContent.join('\n'),
  }));
};

const getPageTitle = data =>
  data.title ||
  data.pathname
    .split('/')
    .pop()
    .replace(/\.html$/, '')
    .replace(/-/g, ' ');

export const siteContent = [...pageData, ...apiData]
  .map(data => {
    const { pathname, title = getPageTitle(data), content } = data;
    const markdownContent = zlib
      .inflateSync(Buffer.from(content, 'base64'))
      .toString('utf-8');
    const siteSection = pathname.split('/').shift();
    const subSections = splitIntoSections(markdownContent);

    return subSections.map(section => {
      return {
        path: pathname + '#' + slug(section.pageSectionTitle),
        siteSection,
        pageTitle: title,
        ...section,
      };
    });
  })
  .flat();
