import type { Dispatch } from 'react';

import type * as Types from '#site/types/searchbox';

export const searchState: Types.SearchboxState = {
  // Default mode is search
  mode: 'search',
  // Chat panel starts closed
  isChatOpen: false,
};

export const getActions = (
  dispatch: Dispatch<Types.SearchboxAction>
): Types.SearchboxDispatchActions => ({
  setMode: payload => dispatch({ type: 'SET_MODE', payload }),
  setChatOpen: payload => dispatch({ type: 'SET_CHAT_OPEN', payload }),
  closeChatAndReset: (onComplete?: () => void) =>
    dispatch({
      type: 'CLOSE_CHAT_AND_RESET',
      payload: { onComplete },
    }),
  switchTo: payload => dispatch({ type: 'SWITCH_TO', payload }),
});

const reducer = (
  state: Types.SearchboxState,
  action: Types.SearchboxAction
): Types.SearchboxState => {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'SET_CHAT_OPEN':
      return { ...state, isChatOpen: action.payload };
    case 'CLOSE_CHAT_AND_RESET':
      if (action.payload?.onComplete) {
        setTimeout(action.payload.onComplete, 0);
      }
      return {
        ...state,
        isChatOpen: false,
        mode: 'search',
      };
    case 'SWITCH_TO':
      return {
        ...state,
        mode: action.payload,
        isChatOpen: action.payload === 'chat',
      };
    default:
      return state;
  }
};

export default reducer;
