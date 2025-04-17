import { render } from '@testing-library/react';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Select from '..';

const noop = () => {};

describe('Select', () => {
  const values = ['Option 1', 'Option 2', 'Option 3'];
  const defaultValue = 'Option 1';
  const placeholder = 'Select an option';
  const dropdownLabel = 'Dropdown label';
  const label = 'Option label';

  global.ResizeObserver = class {
    observe = noop;
    unobserve = noop;
    disconnect = noop;
  };

  it('renders the label when provided', () => {
    const { getByLabelText } = render(
      <Select
        values={values}
        defaultValue={defaultValue}
        placeholder={placeholder}
        dropdownLabel={dropdownLabel}
        label={label}
        onChange={noop}
      />
    );

    const element = getByLabelText(label);
    assert.ok(element.ownerDocument);
  });

  it('renders the default value when provided', () => {
    const { getByText } = render(
      <Select
        values={values}
        defaultValue={defaultValue}
        placeholder={placeholder}
        dropdownLabel={dropdownLabel}
        label={label}
        onChange={noop}
      />
    );

    const element = getByText(defaultValue);
    assert.ok(element.ownerDocument);
  });

  it('renders the placeholder when default value is not provided', () => {
    const { getByText } = render(
      <Select
        values={values}
        placeholder={placeholder}
        dropdownLabel={dropdownLabel}
        label={label}
        onChange={noop}
      />
    );

    const element = getByText(placeholder);
    assert.ok(element.ownerDocument);
  });
});
