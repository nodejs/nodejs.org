import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import dedent from 'dedent';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { VFile } from 'vfile';

import { getContext } from '../context.mjs';
import remarkTypeAnnotations from '../syntax.mjs';

const parse = markdown => {
  const file = new VFile({ path: 'doc/api/fs.md', value: markdown });
  const tree = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkTypeAnnotations)
    .parse(file);

  return getContext(tree, file);
};

describe('context', () => {
  it('splits the document into entries, like doc-kit', () => {
    const context = parse(dedent`
      Preamble.

      # File system

      Intro.

      ## Class: \`fs.Dir\`

      ### \`dir.close()\`

      Text.

      ## \`fs.readFile(path)\`

      ### Event: \`'close'\`
    `);

    const [preamble, title, klass, method, fn, event] = context.entries;

    assert.equal(preamble.heading, null);
    assert.equal(preamble.nodes.length, 1);
    assert.equal(title.data.text, 'File system');
    assert.equal(title.data.slug, 'file-system');
    assert.equal(klass.data.type, 'class');
    assert.equal(klass.data.name, 'fs.Dir');
    assert.equal(klass.parent, title);
    assert.equal(method.data.type, 'method');
    assert.equal(method.parent, klass);
    assert.equal(method.nodes.length, 1);
    assert.equal(fn.parent, title);
    assert.deepEqual(klass.children, [method]);
    assert.equal(event.data.type, 'event');
    assert.equal(event.data.slug, 'event-close');
  });

  it('classifies comments', () => {
    const context = parse(dedent`
      # T

      <!--introduced_in=v1.0.0-->

      <!-- type=misc -->

      <!-- YAML
      added: v1.0.0
      changes:
        - version: v2.0.0
      -->

      <!-- legacy -->

      <!--YAML
      added: [
      -->

      <div>not a comment</div>
    `);

    const [directive, padded, yaml, tag, broken, html] = context.comments;

    assert.equal(directive.kind, 'directive');
    assert.equal(directive.key, 'introduced_in');
    assert.equal(directive.value, 'v1.0.0');
    assert.equal(directive.padded, false);
    assert.equal(padded.kind, 'directive');
    assert.equal(padded.symmetric, true);
    assert.equal(padded.padded, true);
    assert.equal(yaml.kind, 'yaml');
    assert.equal(yaml.padded, 1);
    assert.deepEqual(yaml.yaml, {
      added: 'v1.0.0',
      changes: [{ version: 'v2.0.0' }],
    });
    assert.equal(tag.kind, 'tag');
    assert.equal(tag.inner, ' legacy ');
    assert.equal(broken.kind, 'yaml');
    assert.equal(broken.padded, 0);
    assert.equal(broken.yaml, undefined);
    assert.equal(broken.yamlErrors.length, 1);
    assert.equal(html.kind, 'html');
    assert.equal(context.commentsOf('directive').length, 2);
  });

  it('recognizes stability indicators and typed lists', () => {
    const context = parse(dedent`
      # T

      > Stability: 1.2 - Release candidate. Text.

      > stability: broken

      > Not stability.

      * \`path\` {string} The path.
      * Returns: {Promise}

      <!-- separator -->

      * Plain list.
    `);

    assert.equal(context.stability.length, 2);
    assert.equal(context.stability[0].valid, true);
    assert.equal(context.stability[0].index, '1.2');
    assert.equal(context.stability[0].description, 'Release candidate. Text.');
    assert.equal(context.stability[1].valid, false);
    assert.deepEqual(
      context.lists.map(({ typed }) => typed),
      [true, false]
    );
    assert.equal(context.typeAnnotations.length, 2);
    assert.equal(context.typeAnnotations[0].node.value, 'string');
    assert.equal(context.typeAnnotations[0].node.raw, '{string}');
  });

  it('is computed once per tree', () => {
    const file = new VFile({ value: '# T\n' });
    const tree = unified().use(remarkParse).parse(file);

    assert.equal(getContext(tree, file), getContext(tree, file));
  });
});
