import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { dateIsBetween } from '#site/util/dateUtils';

describe('dateIsBetween', () => {
  it('should return true when the current date is between start and end dates', () => {
    const startDate = '2022-01-01T00:00:00.000Z';
    const endDate = '2069-01-01T00:00:00.000Z';

    assert.ok(dateIsBetween(startDate, endDate));
  });

  it('should return false when the current date is not between start and end dates', () => {
    const startDate = '2010-01-01T00:00:00.000Z';
    const endDate = '2020-01-01T00:00:00.000Z';

    assert.ok(!dateIsBetween(startDate, endDate));
  });

  it('should throw an error when either start or end date is invalid', () => {
    const invalidStartDate = 'Invalid Start Date';
    const validEndDate = '2024-01-01T00:00:00.000Z';

    assert.throws(
      () => dateIsBetween(invalidStartDate, validEndDate),
      /dateIsBetween got called with invalid dates/
    );
  });

  it('should return true if now is between startDate and endDate', () => {
    const start = new Date(Date.now() - 1000).toISOString();
    const end = new Date(Date.now() + 1000).toISOString();
    assert.ok(dateIsBetween(start, end));
  });

  it('should throw an error if dates are invalid', () => {
    assert.throws(() => dateIsBetween('invalid', 'invalid'));
  });
});
