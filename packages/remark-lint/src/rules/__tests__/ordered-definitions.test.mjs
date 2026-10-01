import { testRule } from '../../__tests__/utils.mjs';

testRule('ordered-definitions', [
  {
    name: 'sorted by raw label: uppercase, then code, then lowercase',
    input:
      '# T\n\n[Building]: #a\n[Node-API]: #b\n[`--flag`]: #c\n[alpha]: #d\n[beta]: #e\n',
    expected: [],
  },
  {
    name: 'unsorted',
    input: '# T\n\n[beta]: #b\n[alpha]: #a\n',
    expected: ['Unordered definition: `alpha` should come before `beta`'],
  },
  {
    name: 'multiple',
    input: '# T\n\n[zulu]: #z\n[yankee]: #y\n[alpha]: #a\n',
    expected: [
      'Unordered definition: `yankee` should come before `zulu`',
      'Unordered definition: `alpha` should come before `yankee`',
    ],
  },
]);
