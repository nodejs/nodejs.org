import { render, screen } from '@testing-library/react';
import SectionTitle from '..';

describe('SectionTitle component', () => {
  const mockData = ['home', 'previous', 'current'];

  it('last item should be active', () => {
    render(<SectionTitle path={mockData} />);
    const active = screen.getByText(mockData[mockData.length - 1]);
    expect(active).toHaveClass('active');
  });
});
