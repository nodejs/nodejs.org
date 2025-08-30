import { basename } from 'node:path';

import { slug } from 'github-slugger';
import matter from 'gray-matter';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';

/**
 * Extracts top-level sections from a Markdown AST.
 * Each section starts with a heading (if present) and includes all subsequent nodes
 * until the next heading.
 */
const extractSections = tree => {
  const sections = [];
  let current = null;

  // Visit each top-level node
  tree.children.forEach(node => {
    if (node.type === 'heading') {
      // Push the previous section if it exists
      if (current) {
        sections.push(current);
      }

      // Start a new section with the current heading
      current = {
        heading: node,
        children: [],
      };
    } else {
      // If no heading yet, initialize an empty section
      if (!current) {
        current = { heading: null, children: [] };
      }

      // Add the node to the current section's children
      current.children.push(node);
    }
  });

  // Push the last section if it exists
  if (current) {
    sections.push(current);
  }

  // Convert AST nodes to strings and structure the output
  return sections.map(({ heading, children }) => ({
    pageSectionTitle: toString(heading),
    pageSectionContent: children
      .map(child => toString(child, { includeHtml: false }))
      .join('\n'),
  }));
};

// Derive page title from path
const getPageTitle = path => basename(path, '.html').replace(/-/g, ' ');

// Capitalize first character
const getSiteSection = path => {
  const subpath = path.split('/')[0];

  return subpath[0].toUpperCase() + subpath.slice(1);
};

/**
 * Processes a Markdown document with front matter.
 * Extracts sections and logs them.
 */
export const processDocument = ({ pathname, content }) => {
  // Parse front matter and separate body
  const { data, content: body } = matter(content);

  // Convert Markdown body to AST
  const ast = fromMarkdown(body);

  // Extract sections from the AST
  const sections = extractSections(ast);

  // Get titles
  const siteSection = getSiteSection(pathname);
  const pageTitle = data.title || getPageTitle(pathname);

  return sections.map(section => ({
    path: `${pathname}#${slug(section.pageSectionTitle)}`,
    siteSection,
    pageTitle,
    ...section,
  }));
};
