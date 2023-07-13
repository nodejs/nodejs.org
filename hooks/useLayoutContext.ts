import { useContext } from 'react';
import { LayoutContext } from '@/providers/layoutProvider';

export const useLayoutContext = () => useContext(LayoutContext);
