import { testRule } from '../../__tests__/utils.mjs';

testRule('yaml-comment-syntax', [
  {
    name: 'well-formed block',
    input: '# T\n\n<!-- YAML\nadded: v1.0.0\n-->\n',
    expected: [],
  },
  {
    name: 'missing space',
    input: '# T\n\n<!--YAML\nadded: v1.0.0\n-->\n',
    expected: ['Expected `<!-- YAML` with exactly one space; saw `<!--YAML`'],
  },
  {
    name: 'two spaces',
    input: '# T\n\n<!--  YAML\nadded: v1.0.0\n-->\n',
    expected: ['Expected `<!-- YAML` with exactly one space; saw `<!--  YAML`'],
  },
  {
    name: 'content on the opening line',
    input: '# T\n\n<!-- YAML added: v1.0.0\n-->\n',
    expected: ['Start the YAML content on the line after `<!-- YAML`'],
  },
  {
    name: 'closing marker on the last content line',
    input: '# T\n\n<!-- YAML\nadded: v1.0.0 -->\n',
    expected: ['Close the YAML block with `-->` on its own line'],
  },
  {
    name: 'invalid YAML',
    input: '# T\n\n<!-- YAML\nadded: [\n-->\n',
    expected: [/Invalid YAML:/],
  },
  {
    name: 'empty block',
    input: '# T\n\n<!-- YAML\n-->\n',
    expected: [/The YAML block is empty/],
  },
  {
    name: 'not a mapping',
    input: '# T\n\n<!-- YAML\n- v1.0.0\n-->\n',
    expected: [/YAML metadata must be a mapping of fields/],
  },
]);
