import React, { useContext, createContext, ReactNode, useReducer } from 'react';

import FetchFeedbackState from '../../interfaces/ActionStates/FetchFeedback.ts';
import fetchFeedbackReducer from '../../reducers/fetchFeedbackReducer.ts';
import FetchFeedbackAction from '../../types/Actions/FetchFeedbackAction.ts';

const FetchFeedbackContext = createContext<{
  state: FetchFeedbackState;
  dispatch: React.Dispatch<FetchFeedbackAction>
} | null>(null);

const InitialState: FetchFeedbackState = {
  data: null,
  loading: false,
  error: null,
};

export const FetchFeedbackContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(fetchFeedbackReducer, InitialState);

  return (
    <FetchFeedbackContext.Provider
      value={{state, dispatch}}
    >
      {children}
    </FetchFeedbackContext.Provider>  )
}

export const useFetchFeedbackContext = () => {
  const context = useContext(FetchFeedbackContext);

  if (!context) {
    throw new Error('useFetchFeedbackContext must be within an FetchFeedbackContextProvider');
  }
  
  return context;
}