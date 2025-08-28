import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getAcronymFromString, dashToCamelCase } from '#site/util/string';

describe('String utils', () => {
  it('getAcronymFromString returns the correct acronym', () => {
    assert.equal(getAcronymFromString('John Doe'), 'JD');
  });

  it('getAcronymFromString returns the correct acronym for a single word', () => {
    assert.equal(getAcronymFromString('John'), 'J');
  });

  it('getAcronymFromString if the string is empty, it returns NA', () => {
    assert.equal(getAcronymFromString(''), '');
  });

  it('dashToCamelCase returns correct camelCase', () => {
    assert.equal(dashToCamelCase('foo-bar-baz'), 'fooBarBaz');
  });

  it('dashToCamelCase returns correct camelCase with capital first letter', () => {
    assert.equal(dashToCamelCase('Foo-bar'), 'fooBar');
  });

  it('dashToCamelCase returns correct camelCase with numbers', () => {
    assert.equal(dashToCamelCase('foo-123-bar'), 'foo123Bar');
  });

  it('getAcronymFromString returns an acronym for a simple string', () => {
    const result = getAcronymFromString('Node JS');
    assert.equal(result, 'NJ');
  });

  it('dashToCamelCase converts dashed strings to camelCase', () => {
    const result = dashToCamelCase('es-2015');
    assert.equal(result, 'es2015');
  });

  describe('stringUtils', () => {
    describe('getAcronymFromString', () => {
      it('should return correct acronym', () => {
        const result = getAcronymFromString('Hello World');
        assert.equal(result, 'HW');
      });
    });

    describe('dashToCamelCase', () => {
      it('should convert dash-case to camelCase', () => {
        assert.equal(dashToCamelCase('es-2015-config'), 'es2015Config');
      });
    });
  });
});
