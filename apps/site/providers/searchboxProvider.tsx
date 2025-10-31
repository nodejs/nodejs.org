'use client';

import type { FC, PropsWithChildren } from 'react';
import { createContext, useContext, useReducer } from 'react';

import searchboxReducer, {
  searchboxState,
  getActions,
} from '#site/reducers/searchboxReducer';
import type * as Types from '#site/types/searchbox';

type SearchboxContextType = Types.SearchboxState &
  Types.SearchboxDispatchActions;

const SearchboxContext = createContext<SearchboxContextType | null>(null);

export const SearchboxProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(searchboxReducer, searchboxState);
  const actions = getActions(dispatch);

  const contextValue: SearchboxContextType = {
    ...state,
    ...actions,
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
