import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import remarkTableTitles from '#site/util/table';

describe('remarkTableTitles', () => {
  it('should add data-label attributes to table cells based on headers', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'table',
          children: [
            // Header row
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Name' }],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Age' }],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'City' }],
                },
              ],
            },
            // Data row
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'John' }],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: '25' }],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'NYC' }],
                },
              ],
            },
          ],
        },
      ],
    };

    const plugin = remarkTableTitles();
    plugin(tree);

    const table = tree.children[0];
    const dataRow = table.children[1];

    assert.equal(dataRow.children[0].data.hProperties['data-label'], 'Name');
    assert.equal(dataRow.children[1].data.hProperties['data-label'], 'Age');
    assert.equal(dataRow.children[2].data.hProperties['data-label'], 'City');
  });

  it('should handle multiple data rows', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'table',
          children: [
            // Header row
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Product' }],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Price' }],
                },
              ],
            },
            // First data row
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Apple' }],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: '$1.00' }],
                },
              ],
            },
            // Second data row
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Banana' }],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: '$0.50' }],
                },
              ],
            },
          ],
        },
      ],
    };

    const plugin = remarkTableTitles();
    plugin(tree);

    const table = tree.children[0];
    const firstDataRow = table.children[1];
    const secondDataRow = table.children[2];

    assert.equal(
      firstDataRow.children[0].data.hProperties['data-label'],
      'Product'
    );
    assert.equal(
      firstDataRow.children[1].data.hProperties['data-label'],
      'Price'
    );
    assert.equal(
      secondDataRow.children[0].data.hProperties['data-label'],
      'Product'
    );
    assert.equal(
      secondDataRow.children[1].data.hProperties['data-label'],
      'Price'
    );
  });

  it('should add data-cards="false" for single column tables', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'table',
          children: [
            // Header row with single column
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Items' }],
                },
              ],
            },
            // Data row
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Item 1' }],
                },
              ],
            },
          ],
        },
      ],
    };

    const plugin = remarkTableTitles();
    plugin(tree);

    const table = tree.children[0];

    assert.equal(table.data.hProperties['data-cards'], 'false');
  });

  it('should handle empty tables (less than 2 rows)', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'table',
          children: [
            // Only header row, no data rows
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Header' }],
                },
              ],
            },
          ],
        },
      ],
    };

    const plugin = remarkTableTitles();
    plugin(tree);

    const table = tree.children[0];

    // Should not crash and should not modify the table
    assert.equal(table.children.length, 1);
  });

  it('should handle cells with more columns than headers', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'table',
          children: [
            // Header row with 2 columns
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Name' }],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Age' }],
                },
              ],
            },
            // Data row with 3 columns (more than headers)
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'John' }],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: '25' }],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Extra' }],
                },
              ],
            },
          ],
        },
      ],
    };

    const plugin = remarkTableTitles();
    plugin(tree);

    const table = tree.children[0];
    const dataRow = table.children[1];

    assert.equal(dataRow.children[0].data.hProperties['data-label'], 'Name');
    assert.equal(dataRow.children[1].data.hProperties['data-label'], 'Age');
    // Third cell should not have data-label since there's no corresponding header
    assert.deepEqual(dataRow.children[2].data, undefined);
  });

  it('should handle complex header content with nested elements', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'table',
          children: [
            // Header row with complex content
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [
                    {
                      type: 'emphasis',
                      children: [{ type: 'text', value: 'Product' }],
                    },
                    { type: 'text', value: ' Name' },
                  ],
                },
                {
                  type: 'tableCell',
                  children: [
                    {
                      type: 'strong',
                      children: [{ type: 'text', value: 'Price' }],
                    },
                  ],
                },
              ],
            },
            // Data row
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Apple' }],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: '$1.00' }],
                },
              ],
            },
          ],
        },
      ],
    };

    const plugin = remarkTableTitles();
    plugin(tree);

    const table = tree.children[0];
    const dataRow = table.children[1];

    assert.equal(
      dataRow.children[0].data.hProperties['data-label'],
      'Product Name'
    );
    assert.equal(dataRow.children[1].data.hProperties['data-label'], 'Price');
  });

  it('should preserve existing cell data and merge with new hProperties', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'table',
          children: [
            // Header row
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Name' }],
                },
              ],
            },
            // Data row with existing data
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'John' }],
                  data: {
                    existingProperty: 'value',
                    hProperties: {
                      className: 'existing-class',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    };

    const plugin = remarkTableTitles();
    plugin(tree);

    const table = tree.children[0];
    const dataRow = table.children[1];
    const cell = dataRow.children[0];

    assert.equal(cell.data.existingProperty, 'value');
    assert.equal(cell.data.hProperties['data-label'], 'Name');
  });

  it('should handle empty header cells', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'table',
          children: [
            // Header row with empty cell
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'Age' }],
                },
              ],
            },
            // Data row
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: 'John' }],
                },
                {
                  type: 'tableCell',
                  children: [{ type: 'text', value: '25' }],
                },
              ],
            },
          ],
        },
      ],
    };

    const plugin = remarkTableTitles();
    plugin(tree);

    const table = tree.children[0];
    const dataRow = table.children[1];

    assert.equal(dataRow.children[0].data.hProperties['data-label'], '');
    assert.equal(dataRow.children[1].data.hProperties['data-label'], 'Age');
  });
});
