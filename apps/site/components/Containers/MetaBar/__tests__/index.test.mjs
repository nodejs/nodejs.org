import { render } from '@testing-library/react';

import MetaBar from '..';

describe('MetaBar', () => {
  it('does not render h5s in the table of contents', () => {
    const { queryByText, getByText } = render(
      <MetaBar
        items={{}}
        headings={{
          items: [
            {
              value: 'Heading Level 1',
              depth: 1,
              data: { id: 'heading-1' },
            },
            {
              value: 'Heading Level 2',
              depth: 2,
              data: { id: 'heading-2' },
            },
            {
              value: 'Heading Level 3',
              depth: 3,
              data: { id: 'heading-3' },
            },
            {
              value: 'Heading Level 4',
              depth: 4,
              data: { id: 'heading-4' },
            },
            {
              value: 'Heading Level 5',
              depth: 5,
              data: { id: 'heading-5' },
            },
            {
              value: 'Heading Level 6',
              depth: 6,
              data: { id: 'heading-6' },
            },
          ],
        }}
      />
    );

    const h1Element = queryByText('Heading Level 1');
    expect(h1Element).not.toBeInTheDocument();

    getByText('Heading Level 2');
    getByText('Heading Level 3');
    getByText('Heading Level 4');

    const h5Element = queryByText('Heading Level 5');
    expect(h5Element).not.toBeInTheDocument();

    const h6Element = queryByText('Heading Level 6');
    expect(h6Element).not.toBeInTheDocument();
  });
});
