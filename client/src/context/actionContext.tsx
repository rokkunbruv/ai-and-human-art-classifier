// compiles action contexts

import React, { ReactNode } from 'react';

import { ProcessImageContextProvider } from './Actions/ProcessImageContext.tsx';
import { SubmitFeedbackContextProvider } from './Actions/SubmitFeedbackContext.tsx';
import { FetchFeedbackContextProvider } from './Actions/FetchFeedbackContext.tsx';

const ActionContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ProcessImageContextProvider>
      <SubmitFeedbackContextProvider>
        <FetchFeedbackContextProvider>
          {children}
        </FetchFeedbackContextProvider>
      </SubmitFeedbackContextProvider>
    </ProcessImageContextProvider>
  );
}

export default ActionContextProvider;