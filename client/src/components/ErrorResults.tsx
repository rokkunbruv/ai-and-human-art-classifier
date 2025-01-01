// displays an error message whenever an error occurred
// during image processing on the classifier

import React from 'react';

interface ErrorResultsProps {
  errorMessage: string,
}

const ErrorResults = (props: ErrorResultsProps) => {
  const { errorMessage } = props;
  
  return (
    <div className="flex flex-col items-center justify-center bg-midnight-to-red-gradient min-h-screen p-8">
      <div className="red-text-glow font-extrabold text-4xl text-center mb-8">
        Oh no!
      </div>
      <div className="text-white text-center">
        {errorMessage}. Please reload the page and try again.
      </div>
    </div>
  );
}

export default ErrorResults;
