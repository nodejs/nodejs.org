import AnchoredHeading from '../AnchoredHeading';
import { render } from '@testing-library/react';
import React from 'react';

describe('AnchoredHeading', () => {
  it('should render correctly level 1', () => {
    const { container } = render(
      <AnchoredHeading level={1}>Hello</AnchoredHeading>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly level 2', () => {
    const { container } = render(
      <AnchoredHeading level={2}>Hello</AnchoredHeading>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly level 3', () => {
    const { container } = render(
      <AnchoredHeading level={3}>Hello</AnchoredHeading>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly level 4', () => {
    const { container } = render(
      <AnchoredHeading level={4}>Hello</AnchoredHeading>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly level 5', () => {
    const { container } = render(
      <AnchoredHeading level={5}>Hello</AnchoredHeading>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly level 6', () => {
    const { container } = render(
      <AnchoredHeading level={6}>Hello</AnchoredHeading>
    );
    expect(container).toMatchSnapshot();
  });
});
