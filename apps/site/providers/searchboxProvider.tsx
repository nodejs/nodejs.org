'use client';

import { useSearchDispatch } from '@orama/ui/contexts';
import type { FC, PropsWithChildren } from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react';

import searchboxReducer, {
  searchboxState,
  getActions,
} from '#site/reducers/searchboxReducer';
import type * as Types from '#site/types/searchbox';

type SearchboxContextType = Types.SearchboxState &
  Types.SearchboxDispatchActions & {
    clearAll: () => void;
  };

const SearchboxContext = createContext<SearchboxContextType | null>(null);

export const SearchboxProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(searchboxReducer, searchboxState);
  const actions = getActions(dispatch);
  const searchDispatch = useSearchDispatch();

  const clearAll = useCallback(() => {
    searchDispatch({ type: 'SET_SEARCH_TERM', payload: { searchTerm: '' } });
    searchDispatch({
      type: 'SET_SELECTED_FACET',
      payload: { selectedFacet: 'All' },
    });
    searchDispatch({ type: 'SET_RESULTS', payload: { results: [] } });
  }, [searchDispatch]);

  useEffect(() => {
    if (!state.isOpen) {
      clearAll();
    }
  }, [state.isOpen, clearAll]);

  const contextValue: SearchboxContextType = {
    ...state,
    ...actions,
    clearAll,
  };

  return (
    <SearchboxContext.Provider value={contextValue}>
      {children}
    </SearchboxContext.Provider>
  );
};

export const useSearchbox = (): SearchboxContextType => {
  const context = useContext(SearchboxContext);
  if (!context) {
    throw new Error('useSearchbox must be used within a SearchboxProvider');
  }
  return context;
};
