import { render } from '@testing-library/react';

import Select from '..';

describe('Select', () => {
  const values = ['Option 1', 'Option 2', 'Option 3'];
  const defaultValue = 'Option 1';
  const placeholder = 'Select an option';
  const dropdownLabel = 'Dropdown label';
  const label = 'Option label';
  const onChange = jest.fn();

  it('renders the label when provided', () => {
    const { getByLabelText } = render(
      <Select
        values={values}
        defaultValue={defaultValue}
        placeholder={placeholder}
        dropdownLabel={dropdownLabel}
        label={label}
        onChange={onChange}
      />
    );

    const element = getByLabelText(label);
    expect(element).toBeInTheDocument();
  });

  it('renders the default value when provided', () => {
    const { getByText } = render(
      <Select
        values={values}
        defaultValue={defaultValue}
        placeholder={placeholder}
        dropdownLabel={dropdownLabel}
        label={label}
        onChange={onChange}
      />
    );

    const element = getByText(defaultValue);
    expect(element).toBeInTheDocument();
  });

  it('renders the placeholder when default value is not provided', () => {
    const { getByText } = render(
      <Select
        values={values}
        placeholder={placeholder}
        dropdownLabel={dropdownLabel}
        label={label}
        onChange={onChange}
      />
    );

    const element = getByText(placeholder);
    expect(element).toBeInTheDocument();
  });
});
