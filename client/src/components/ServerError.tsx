import React from 'react';

const ServerError = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-midnight-to-red-gradient h-screen">
      <div className="flex normal-text-glow font-extrabold text-4xl gap-4">
        500 <div className="text-white text-shadow-none font-thin">|</div> Server Error
      </div>
      <div className="text-white text-xs mt-4">
        The server is currently down. Please try again later.
      </div>
    </div>
  );
}

export default ServerError;
