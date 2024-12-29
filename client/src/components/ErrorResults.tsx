import React from 'react';

interface ErrorResultsProps {
  errorMessage: string,
}

const ErrorResults = (props: ErrorResultsProps) => {
  const { errorMessage } = props;
  
  return (
    <div className="flex flex-col items-center justify-center bg-midnight-to-red-gradient h-screen">
      <div className="red-text-glow font-extrabold text-4xl mb-8">
        Oh no!
      </div>
      <div className="text-white">
        {errorMessage}. Please reload the page and try again.
      </div>
    </div>
  );
}

export default ErrorResults;
