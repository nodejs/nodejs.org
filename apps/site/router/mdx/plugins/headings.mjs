import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

export const headings = root => {
  const list = [];

  visit(root, 'heading', node => {
    list.push({
      depth: node.depth,
      value: toString(node, { includeImageAlt: false }),
    });
  });

  return list;
};

export default ({ output }) =>
  tree => {
    output.headings = headings(tree);
  };
