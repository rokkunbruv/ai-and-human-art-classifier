import React, { useState, useEffect, useRef } from 'react';

import FileUpload from '../components/FileUpload.tsx';
import TitleHeader from '../components/TitleHeader.tsx';
import ImagePreview from '../components/ImagePreview.tsx';
import ServerError from '../components/ServerError.tsx';
import Loading from '../components/Loading.tsx';
import { useImageContext } from '../context/imageContext.tsx';
import { useFetchFeedbackContext } from '../context/Actions/FetchFeedbackContext.tsx';
import useFetchFeedback from '../actions/fetchFeedback.ts';
import { getHealth } from '../api/index.ts';

const Main: React.FC = () => {
  const [serverUp, setServerUp] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [feedback, setFeedback] = useState<number | null>(null);
  
  const { fileError, image, imageError } = useImageContext();
  const { state } = useFetchFeedbackContext();

  const fetchFeedback = useFetchFeedback();
  const fetchFeedbackRef = useRef(fetchFeedback);

  const serverUpRef = useRef(serverUp);

  // server health checker function
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

  // generate error messages when errors are raised
  useEffect(() => {
    if (fileError) {
      setErrorMessage('An error occurred when uploading your image. Please try again.');
    } else if (imageError) {
      setErrorMessage('An error occurred when processing your image file. Please try again.');
    }
  }, [fileError, imageError]);

  // process feedback percentage
  useEffect(() => {
    if (state.data) {
      setFeedback(Math.round(state.data.feedback * 100));
    }
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
