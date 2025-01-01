import React, { ReactNode } from 'react';

interface AppContainerProps {
  children: ReactNode,
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-evenly min-h-screen bg-midnight-to-red-gradient">
      {children}
    </div>
  );
}

export default AppContainer;
