import React, { useState, useEffect, useRef } from 'react';

import FileUpload from '../components/FileUpload.tsx';
import TitleHeader from '../components/TitleHeader.tsx';
import ImagePreview from '../components/ImagePreview.tsx';
import { useImageContext } from '../context/imageContext.tsx';
import useFetchFeedback from '../actions/fetchFeedback.ts';
import { getHealth } from '../api/index.ts';
import ServerError from '../components/ServerError.tsx';
import Loading from '../components/Loading.tsx';
import { useFetchFeedbackContext } from '../context/Actions/FetchFeedbackContext.tsx';

const Main: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [feedback, setFeedback] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serverUp, setServerUp] = useState(true);
  
  const { fileError, image, imageError } = useImageContext();
  const { state } = useFetchFeedbackContext();

  const fetchFeedback = useFetchFeedback();
  const fetchFeedbackRef = useRef(fetchFeedback);

  const serverUpRef = useRef(serverUp);

  const checkHealth = async () => {
    try {
      const response = await getHealth();

      if (response.status === 200) {
        setIsLoading(false);
      } else {
        setServerUp(false);
        setIsLoading(false);
      }
    } catch {
      setServerUp(false);
      setIsLoading(false);
    }
  };

  // checks server's status once the page loads
  useEffect(() => {    
    checkHealth();
    
    if (serverUpRef.current) fetchFeedbackRef.current();
  }, []);

  useEffect(() => {
    if (fileError) {
      setErrorMessage('An error occurred when uploading your image. Please reload the site and try again.');
    } else if (imageError) {
      setErrorMessage('An error occurred when processing your image file. Please reload the site and try again.');
    }
  }, [fileError, imageError]);

  useEffect(() => {
    if (state.data) {
      setFeedback(Math.round(state.data.feedback * 100));
    }
    console.log(state.data?.feedback)
  }, [state.data]);

  if (isLoading) {
    return (<Loading />);
  }

  if (!serverUp) {
    return (<ServerError />);
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-midnight-to-red-gradient py-16">  
      <TitleHeader />
      <div className="mb-8 text-white">
        <a href="/about">about this</a>
      </div>
      {image && !fileError && !imageError ? (
        <ImagePreview />
      ) : (
        <FileUpload />
      )}
      {(fileError) && (
        <div className="text-white text-xs mt-2">
          {errorMessage}
        </div>
      )}
      {feedback && (
        <div className="flex items-center text-white mt-8 text-center text-xs gap-2">
          The model is able to correctly classify your image
          <div className="normal-text-glow font-bold">{feedback}%</div>
          of the time according to user feedback. 
        </div>
      )}
    </div>
  );
}

export default Main;
