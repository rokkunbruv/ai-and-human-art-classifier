import React, { useContext, createContext, ReactNode, useReducer } from 'react';

import SubmitFeedbackState from '../../interfaces/ActionStates/SubmitFeedback.ts';
import submitFeedbackReducer from '../../reducers/submitFeedbackReducer.ts';
import SubmitFeedbackAction from '../../types/Actions/SubmitFeedbackAction.ts';

const SubmitFeedbackContext = createContext<{
  state: SubmitFeedbackState;
  dispatch: React.Dispatch<SubmitFeedbackAction>
} | null>(null);

const InitialState: SubmitFeedbackState = {
  data: null,
  loading: false,
  error: null,
};

export const SubmitFeedbackContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(submitFeedbackReducer, InitialState);

  return (
    <SubmitFeedbackContext.Provider
      value={{state, dispatch}}
    >
      {children}
    </SubmitFeedbackContext.Provider>  )
}

export const useSubmitFeedbackContext = () => {
  const context = useContext(SubmitFeedbackContext);

  if (!context) {
    throw new Error('useSubmitFeedbackContext must be within an SubmitFeedbackContextProvider');
  }
  
  return context;
}