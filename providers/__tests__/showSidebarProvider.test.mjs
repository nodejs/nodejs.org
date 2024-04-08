import { render } from '@testing-library/react';
import { useContext, useState } from 'react';

import {
  ShowSidebarDispatch,
  ShowSidebarProvider,
} from '@/providers/showSidebarProvider';

describe('ShowSidebarProvider', () => {
  it('renders the provider with provided dispatch function', () => {
    const TestConsumerComponent = () => {
      const setShowSidebar = useContext(ShowSidebarDispatch);

      return (
        <div>
          {setShowSidebar ? 'Dispatch available' : 'Dispatch unavailable'}
        </div>
      );
    };

    const TestWrapperComponent = ({ children }) => {
      const [, setShowSidebar] = useState(true);

      return (
        <ShowSidebarProvider value={setShowSidebar}>
          {children}
        </ShowSidebarProvider>
      );
    };

    const { getByText } = render(<TestConsumerComponent />, {
      wrapper: TestWrapperComponent,
    });

    const result = getByText('Dispatch available');
    expect(result).toBeInTheDocument();
  });
});
