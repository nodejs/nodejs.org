import { type MutableRefObject, useRef } from 'react';
import { render } from '@testing-library/react';
import { useOnScreen } from '../useOnScreen';

describe('useOnScreen', () => {
  const intersectionObserverOriginal = window.IntersectionObserver;
  const OnScreenRenderer = ({
    observeOnce = false,
  }: {
    observeOnce?: boolean;
  }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const isVisible = useOnScreen(
      ref as MutableRefObject<Element>,
      observeOnce
    );

    return <div ref={ref}>{isVisible ? <>true</> : <>false</>}</div>;
  };

  afterEach(() => {
    window.IntersectionObserver = intersectionObserverOriginal;
  });

  it('should observe ref for appearing on screen', () => {
    const observeMock = jest.fn();

    window.IntersectionObserver = jest.fn(() => ({
      disconnect: jest.fn,
      observe: observeMock,
    })) as unknown as typeof window.IntersectionObserver;

    render(<OnScreenRenderer />);
    expect(observeMock).toHaveBeenCalledTimes(1);
  });

  it('should disconnect on first intersection with observeOnce option', () => {
    const disconnectMock = jest.fn();

    window.IntersectionObserver = jest.fn(cb => ({
      disconnect: disconnectMock,
      observe: () => {
        cb(
          [
            {
              isIntersecting: true,
            } as IntersectionObserverEntry,
          ],
          jest.fn() as unknown as IntersectionObserver
        );
      },
    })) as unknown as typeof window.IntersectionObserver;

    const { unmount } = render(<OnScreenRenderer observeOnce />);
    // unmount component in order to fire useEffect return function
    unmount();

    expect(disconnectMock).toHaveBeenCalledTimes(2);
  });

  it('should not disconnect on first intersection with observeOnce=false option', () => {
    const disconnectMock = jest.fn();

    window.IntersectionObserver = jest.fn(cb => ({
      disconnect: disconnectMock,
      observe: () => {
        cb(
          [
            {
              isIntersecting: true,
            } as IntersectionObserverEntry,
          ],
          jest.fn() as unknown as IntersectionObserver
        );
      },
    })) as unknown as typeof window.IntersectionObserver;

    render(<OnScreenRenderer observeOnce={false} />);
    expect(disconnectMock).toHaveBeenCalledTimes(0);
  });
});
