import { render } from '@testing-library/react';
import React from 'react';

import DataTag from '..';

describe('Data Tag component', () => {
  it(`renders with red background color when tag is 'E'`, () => {
    const { container } = render(<DataTag tag="E" />);

    expect(container).toHaveStyle('background-color: var(--danger6)');
    expect(container).toMatchSnapshot();
  });

  it(`renders with yellow background color when tag is 'C'`, () => {
    const { container } = render(<DataTag tag="C" />);

    expect(container).toHaveStyle('background-color: var(--warning4)');
    expect(container).toMatchSnapshot();
  });

  it(`renders with blue background color when tag is 'M'`, () => {
    const { container } = render(<DataTag tag="M" />);

    expect(container).toHaveStyle('background-color: var(--info6)');
    expect(container).toMatchSnapshot();
  });
});
