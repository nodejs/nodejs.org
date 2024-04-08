import { render } from '@testing-library/react';
import { useState } from 'react';

import useHideSidebar from '@/hooks/react-client/useHideSidebar';
import { ShowSidebarProvider } from '@/providers/showSidebarProvider';

const TestWrapperComponent = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <ShowSidebarProvider value={setShowSidebar}>
      {showSidebar ? 'Sidebar shown' : 'Sidebar hidden'}
      {children}
    </ShowSidebarProvider>
  );
};

describe('useHideSidebar', () => {
  it('should hide sidebar on mount', () => {
    const TestComponent = () => {
      useHideSidebar();

      return null;
    };

    const { getByText } = render(<TestComponent />, {
      wrapper: TestWrapperComponent,
    });

    const result = getByText('Sidebar hidden');
    expect(result).toBeInTheDocument();
  });
});
