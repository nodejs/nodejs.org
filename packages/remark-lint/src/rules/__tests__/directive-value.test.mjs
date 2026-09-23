import { testRule } from '../../__tests__/utils.mjs';

testRule('directive-value', [
  {
    name: 'valid values',
    input:
      '# T\n\n<!--introduced_in=v1.0.0-->\n<!--type=misc-->\n<!--source_link=lib/fs.js-->\n<!--name=SIGINT, SIGHUP-->\n<!--module=node:fs/promises-->\n<!--llm_description=Does things.-->\n',
    expected: [],
  },
  {
    name: 'unknown key',
    input: '# T\n\n<!--foo=bar-->\n',
    expected: [/Unknown directive `foo`/],
  },
  {
    name: 'custom keys',
    input: '# T\n\n<!--foo=bar-->\n',
    options: { keys: ['foo'] },
    expected: [],
  },
  {
    name: 'placeholder version',
    input: '# T\n\n<!--introduced_in=REPLACEME-->\n',
    expected: [],
  },
  {
    name: 'invalid version',
    input: '# T\n\n<!--introduced_in=1.0-->\n',
    expected: [/Invalid `introduced_in`: "1.0" is not a valid version/],
  },
  {
    name: 'unreleased version',
    input: '# T\n\n<!--introduced_in=v1.0.0-->\n',
    shared: { releasedVersions: ['2.0.0'] },
    expected: [/"v1.0.0" is not a released version/],
  },
  {
    name: 'released version list accepts either form',
    input: '# T\n\n<!--introduced_in=v1.0.0-->\n',
    shared: { releasedVersions: ['v1.0.0'] },
    expected: [],
  },
  {
    name: 'unknown type',
    input: '# T\n\n<!--type=example-->\n',
    expected: [/Unknown document type `example`/],
  },
  {
    name: 'absolute source link',
    input: '# T\n\n<!--source_link=https://example.com/fs.js-->\n',
    expected: ['`source_link` must be a relative file path (e.g. `lib/fs.js`)'],
  },
  {
    name: 'module with whitespace',
    input: '# T\n\n<!--module=node fs-->\n',
    expected: [/`module` must be a single module specifier/],
  },
  {
    name: 'empty name',
    input: '# T\n\n<!--name= -->\n',
    expected: ['`name` must not be empty'],
  },
]);
