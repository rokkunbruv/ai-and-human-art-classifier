// displays error message for server errors

import React from 'react';

const ServerError = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-midnight-to-red-gradient min-h-screen p-8">
      <div className="flex normal-text-glow font-extrabold text-4xl sm:gap-4 max-sm:flex-col max-sm:items-center">
        <div className="text-center">500</div>
        <div className="text-white text-shadow-none font-thin max-sm:hidden">|</div>
        <div className="text-center">Server Error</div>
      </div>
      <div className="text-white text-xs text-center mt-4">
        The server is currently down. Please try again later.
      </div>
    </div>
  );
}

export default ServerError;
