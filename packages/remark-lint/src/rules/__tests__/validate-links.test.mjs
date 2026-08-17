import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';

import remarkParse from 'remark-parse';
import { unified } from 'unified';

import basePreset from '../../index.mjs';
import validateLinks from '../validate-links.mjs';

const processMarkdown = async (
  cwd,
  markdown,
  options = {},
  filePath = 'pages/en/example.mdx'
) => {
  const processor = unified()
    .use(remarkParse)
    .use(validateLinks, {
      basePaths: ['pages/en', 'pages', 'public', '.'],
      ...options,
    });
  const tree = processor.parse(markdown);

  return new Promise((resolve, reject) => {
    processor.run(tree, { cwd, path: filePath }, (error, _, file) => {
      if (error) {
        reject(error);
      } else {
        resolve(file);
      }
    });
  });
};

describe('validate-links', () => {
  let cwd;

  before(async () => {
    cwd = await mkdtemp(path.join(tmpdir(), 'node-core-validate-links-'));

    await Promise.all([
      mkdir(path.join(cwd, 'pages/en/about'), { recursive: true }),
      mkdir(path.join(cwd, 'pages/en/blog/release'), { recursive: true }),
      mkdir(path.join(cwd, 'pages/en/guide'), { recursive: true }),
      mkdir(path.join(cwd, 'pages/ja/about'), { recursive: true }),
      mkdir(path.join(cwd, 'public/static'), { recursive: true }),
    ]);

    await Promise.all([
      writeFile(path.join(cwd, 'pages/en/about/previous-releases.mdx'), ''),
      writeFile(path.join(cwd, 'pages/en/blog/release/v20.0.0.md'), ''),
      writeFile(path.join(cwd, 'pages/en/guide/index.markdown'), ''),
      writeFile(path.join(cwd, 'pages/en/related.mdx'), ''),
      writeFile(path.join(cwd, 'pages/ja/about/releases.md'), ''),
      writeFile(path.join(cwd, 'public/static/logo.svg'), ''),
    ]);
  });

  after(() => rm(cwd, { force: true, recursive: true }));

  it('is enabled by the base preset with route mappings', () => {
    assert.ok(
      basePreset.plugins.some(
        plugin => Array.isArray(plugin) && plugin[0] === validateLinks
      )
    );
  });

  it('maps root-relative routes to files regardless of extension', async () => {
    const file = await processMarkdown(
      cwd,
      [
        '[Releases](/about/previous-releases?from=test)',
        '[Dotted route](/blog/release/v20.0.0)',
        '[Japanese](/ja/about/releases)',
        '[Relative](./related)',
      ].join('\n\n')
    );

    assert.deepEqual(file.messages, []);
  });

  it('maps directory routes and public assets', async () => {
    const file = await processMarkdown(
      cwd,
      '[Guide](/guide)\n\n![Node.js logo](/static/logo.svg)'
    );

    assert.deepEqual(file.messages, []);
  });

  it('reports missing route targets', async () => {
    const file = await processMarkdown(cwd, '[Missing](/about/missing)');

    assert.equal(file.messages.length, 1);
    assert.equal(
      file.messages[0].message,
      'Cannot find file for link `/about/missing`'
    );
    assert.equal(file.messages[0].source, 'node-core');
    assert.equal(file.messages[0].ruleId, 'validate-links');
  });

  it('validates headings in the current document', async () => {
    const valid = await processMarkdown(
      cwd,
      [
        '# Existing heading',
        '[Existing](#existing%2Dheading)',
        '# child_process',
        '[Node.js-style slug](#child-process)',
      ].join('\n\n')
    );
    const invalid = await processMarkdown(
      cwd,
      '# Existing heading\n\n[Missing](#missing)'
    );

    assert.deepEqual(valid.messages, []);
    assert.deepEqual(
      invalid.messages.map(message => message.message),
      ['Cannot find heading for `#missing`']
    );
  });

  it('recognizes custom HTML anchors', async () => {
    const file = await processMarkdown(
      cwd,
      '<a id="CVE-2016-6304"></a>\n\n[Security advisory](#CVE-2016-6304)'
    );

    assert.deepEqual(file.messages, []);
  });

  it('ignores link paths matching configured globs', async () => {
    const file = await processMarkdown(
      cwd,
      [
        '[Learn article](/learn/getting-started?from=test)',
        '[Feed](/feed/blog.xml)',
        '[Different missing route](/learning)',
      ].join('\n\n'),
      { ignoreLinks: ['/learn/*', '/feed/*'] }
    );

    assert.deepEqual(
      file.messages.map(message => message.message),
      ['Cannot find file for link `/learning`']
    );
  });

  it('skips files matching configured globs', async () => {
    const markdown = '[Missing](/about/missing)';
    const options = { ignoreFiles: ['pages/!(en)/**/*.{md,mdx}'] };
    const translation = await processMarkdown(
      cwd,
      markdown,
      options,
      'pages/fr/example.mdx'
    );
    const english = await processMarkdown(cwd, markdown, options);

    assert.deepEqual(translation.messages, []);
    assert.deepEqual(
      english.messages.map(message => message.message),
      ['Cannot find file for link `/about/missing`']
    );
  });

  it('ignores external links', async () => {
    const file = await processMarkdown(
      cwd,
      [
        '[Website](https://nodejs.org)',
        '[Protocol-relative](//nodejs.org)',
        '[Email](mailto:test@example.com)',
      ].join('\n\n')
    );

    assert.deepEqual(file.messages, []);
  });
});
