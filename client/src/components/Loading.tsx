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

      intervalRef.current = setInterval(handleAnimation, 3000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [loadingMessages]);

  const message = loadingMessages ? loadingMessages[index] : loadingMessage ? loadingMessage : "Loading";
  
  return (
    <div className="flex flex-col justify-center items-center bg-midnight-to-red-gradient h-screen cursor-default">
      <div className=" h-12">
        <div className={
          `normal-text-glow font-extrabold text-4xl flex gap-1 transition-all duration-500 ease-in-out ${fadeClass}`}
        >
          {message}
          <span className="animate-bounce-dots">.</span> 
          <span className="animate-bounce-dots [animation-delay:0.2s]">.</span> 
          <span className="animate-bounce-dots [animation-delay:0.4s]">.</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
