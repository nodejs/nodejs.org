import { render, screen } from '@testing-library/react';
import SectionTitle from '..';

describe('SectionTitle component', () => {
  const mockData = ['home', 'previous', 'current'];

  it('renders correctly with data', () => {
    const { container } = render(<SectionTitle path={mockData} />);
    expect(container).toMatchSnapshot();
  });

  it('last item should be active', () => {
    render(<SectionTitle path={mockData} />);
    const active = screen.getByText(mockData[mockData.length - 1]);
    expect(active).toHaveClass('active');
  });
});
