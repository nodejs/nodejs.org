import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { getAcronymFromString } from '@/util/stringUtils';

describe('String utils', () => {
  it('getAcronymFromString returns the correct acronym', () => {
    strictEqual(getAcronymFromString('John Doe'), 'JD');
  });

  it('getAcronymFromString returns the correct acronym for a single word', () => {
    strictEqual(getAcronymFromString('John'), 'J');
  });

  it('getAcronymFromString if the string is empty, it returns NA', () => {
    strictEqual(getAcronymFromString(''), '');
  });
});
