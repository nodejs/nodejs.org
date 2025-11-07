'use client';

import type { FC, PropsWithChildren } from 'react';
import { createContext, useContext, useReducer } from 'react';

import searchReducer, {
  searchState,
  getActions,
} from '#site/reducers/searchboxReducer';
import type * as Types from '#site/types/searchbox';

type SearchboxContextType =
  | (Types.SearchboxState & Types.SearchboxDispatchActions)
  | null;

const SearchboxContext = createContext<SearchboxContextType>(null);

export const SearchboxProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, searchState);
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
  return context;
};
