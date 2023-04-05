import { useContext } from 'react';
import { ThemeContext } from '../../../providers/themeprovider';

export function useTheme() {
  return useContext(ThemeContext) ?? [];
}
