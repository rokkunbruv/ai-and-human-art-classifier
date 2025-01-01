import React, { useState, useEffect, useRef } from 'react';

interface LoadingProps {
  loadingMessage?: string,
  loadingMessages?: readonly string[],
}

const Loading = (props: LoadingProps) => {
  const { loadingMessage, loadingMessages } = props;

  const [index, setIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('opacity-100 translate-y-0');

  const intervalRef = useRef(null);

  // handles switching of loadingMessages every second
  useEffect(() => {
    if (loadingMessages) {
      const handleAnimation = () => {
        setFadeClass('opacity-0 -translate-y-2');
        setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
          setFadeClass('opacity-100 translate-y-0');
        }, 1000);
        setFadeClass('opacity-0 translate-y-2');
      };

      intervalRef.current = setInterval(handleAnimation, loadingMessages.length * 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [loadingMessages]);

  // set loading message to be displayed
  // prioritizes loadingMessages if it is passed to the component
  // if loadingMessages == null, the value of loadingMessage will be referred
  // else set to default message "Loading"
  const message = loadingMessages ? loadingMessages[index] : loadingMessage ? loadingMessage : "Loading";
  
  return (
    <div className="flex flex-col justify-center items-center bg-midnight-to-red-gradient min-h-screen p-8 cursor-default">
      <div className=" h-12">
        <div className={
          `normal-text-glow font-extrabold text-4xl text-center flex gap-1 transition-all duration-500 ease-in-out ${fadeClass} max-sm:flex-col max-sm:items-center`}
        >
          {message}
          <div className="flex gap-1">
            <div className="animate-bounce-dots">.</div> 
            <div className="animate-bounce-dots [animation-delay:0.2s]">.</div> 
            <div className="animate-bounce-dots [animation-delay:0.4s]">.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
