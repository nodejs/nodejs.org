export type SearchboxMode = 'search' | 'chat';

export type SearchboxState = {
  // The current mode (search or chat)
  mode: SearchboxMode;
  // Whether chat panel is open (for desktop)
  isChatOpen: boolean;
};

export type SearchboxAction =
  | { type: 'SET_MODE'; payload: SearchboxMode }
  | { type: 'SET_CHAT_OPEN'; payload: boolean }
  | {
      type: 'CLOSE_CHAT_AND_RESET';
      payload?: { onComplete?: () => void };
    }
  | { type: 'SWITCH_TO'; payload: SearchboxMode };

export type SearchboxDispatchActions = {
  setMode: (mode: SearchboxMode) => void;
  setChatOpen: (isOpen: boolean) => void;
  closeChatAndReset: (onComplete?: () => void) => void;
  switchTo: (mode: SearchboxMode) => void;
};
