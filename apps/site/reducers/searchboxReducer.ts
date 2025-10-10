import type { Dispatch } from 'react';

import type * as Types from '#site/types/searchbox';

export const searchboxState: Types.SearchboxState = {
  // The modal starts closed
  isOpen: false,
  // Default mode is search
  mode: 'search',
  // Chat panel starts closed
  isChatOpen: false,
};

export const getActions = (
  dispatch: Dispatch<Types.SearchboxAction>
): Types.SearchboxDispatchActions => ({
  openModal: () => dispatch({ type: 'OPEN_MODAL' }),
  closeModal: () => dispatch({ type: 'CLOSE_MODAL' }),
  toggleModal: () => dispatch({ type: 'TOGGLE_MODAL' }),
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
    case 'OPEN_MODAL':
      return { ...state, isOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isOpen: false };
    case 'TOGGLE_MODAL':
      return { ...state, isOpen: !state.isOpen };
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
        isChatOpen: action.payload === 'chat' ? true : false,
      };
    default:
      return state;
  }
};

export default reducer;
