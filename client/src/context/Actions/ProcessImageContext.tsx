import React, { useContext, createContext, ReactNode, useReducer } from 'react';

import ProcessImageState from '../../interfaces/ActionStates/ProcessImage.ts';
import processImageReducer from '../../reducers/processImageReducer.ts';
import ProcessImageAction from '../../types/Actions/ProcessImageAction.ts';

const ProcessImageContext = createContext<{
  state: ProcessImageState;
  dispatch: React.Dispatch<ProcessImageAction>
} | null>(null);

const InitialState: ProcessImageState = {
  data: null,
  loading: false,
  error: null,
};

export const ProcessImageContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(processImageReducer, InitialState);

  return (
    <ProcessImageContext.Provider
      value={{state, dispatch}}
    >
      {children}
    </ProcessImageContext.Provider>  )
}

export const useProcessImageContext = () => {
  const context = useContext(ProcessImageContext);

  if (!context) {
    throw new Error('useProcessImageContext must be within an ProcessImageContextProvider');
  }
  
  return context;
}