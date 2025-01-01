import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Loading from '../components/Loading.tsx';
import ErrorResults from '../components/ErrorResults.tsx';
import ServerError from '../components/ServerError.tsx';
import { useProcessImageContext } from '../context/Actions/ProcessImageContext.tsx';
import useSubmitFeedback from '../actions/submitFeedback.ts';
import { getHealth } from '../api/index.ts';
import { Result } from '../interfaces/ActionStates/ProcessImage.ts';

const Results = () => {
  const [serverUp, setServerUp] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  
  const [results, setResults] = useState<Result | null>(null);
  const [predictionResult, setPredictionResult] = useState<string | undefined>(undefined);
  const [predictionText, setPredictionText] = useState<string | undefined>(undefined);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const { state } = useProcessImageContext();

  const submitFeedback = useSubmitFeedback();

  // watches for server's response on image processing
  useEffect(() => {    
    if (state.data) {
      // record results once processed
      if (state.data.results != null) {
        setResults({
          predictedLabel: state.data.results.predicted_label,
          confidenceLevel: state.data.results.confidence_level,
        });
      } 
      // raise an error in case that the results cannot be read
      else {
        setError(true);
        setErrorMessage('Results cannot be read');
      }
    } 
    // raise an error in case that the image processing fails
    else if (state.error) {
      setError(true);
      setErrorMessage(state.error);
    }
  }, [state]);

  // set output texts based on prediction results
  if (results?.predictedLabel === 'AI_GENERATED') {
    if (predictionResult === undefined) setPredictionResult('MABE BY AI');
    if (predictionText === undefined) setPredictionText('AI-generated');
  } else if (results?.predictedLabel === 'NON_AI_GENERATED') {
    if (predictionResult === undefined) setPredictionResult('MADE BY A HUMAN');
    if (predictionText === undefined) setPredictionText('not AI-generated');
  }

  // navigate back to main page upon clicking the 'Upload Again' button
  const handleReturn = () => {
    window.location.href = "/";
  }

  // first checks if the server is running
  // if server is running, then send the user feedback to the server
  // else set serverUp to false
  const handleFeedback = async (feedback: string) => {
    try {
      // check server status
      const response = await getHealth();

      // submit user feedback if server is running
      if (response.status === 200) {
        submitFeedback(feedback);
        setFeedbackSubmitted(true);
      } else {
        setServerUp(false);
      }
    } catch {
      setServerUp(false);
    }
  }

  // sends a feedback that the classifier is accurate
  const handleYesFeedback = () => {
    handleFeedback("yes");
  }

  // sends a feedback that the classifier is inaccurate
  const handleNoFeedback = () => {
    handleFeedback("no");
  }

  // navigate back to home in case that the user might type the url path manually
  if (state.data === null && !state.loading) {
    return (<Navigate to='/' />);
  }

  // display loading screen message while classifier is processing the image
  if (state.loading) {
    const loadingMessages = [
      "Processing image",
      "Analyzing details",
      "Interpreting relationships"
    ];
    
    return (
      <Loading loadingMessages={loadingMessages} />
    );
  };

  if (!serverUp) {
    return (<ServerError />);
  }

  if (error) {
    return (
      <ErrorResults errorMessage={errorMessage === undefined ? 'An error has occurred.' : errorMessage} />
    )
  }

  return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-white mb-4 cursor-default">
          Your image is
        </div>
        <div className="normal-text-glow text-8xl font-extrabold mb-8 text-center cursor-default px-4">
          {predictionResult}
        </div>
        <div className="flex text-white text-center gap-2 mb-4 cursor-default max-sm:flex-col max-sm:items-center">
          <div>The classifier is</div>
          <div className="normal-text-glow font-bold">{results !== null && Math.round(results.confidenceLevel * 100)}%</div>
          <div>certain that your art/image is {predictionText}.</div>
          <div>That's crazy 🤯</div>
        </div>
        {!feedbackSubmitted ? (
          <div className="flex text-white text-center text-xs gap-4 cursor-default max-sm:flex-col max-sm:items-center">
            <div>Is the classifier correct at its guess?</div>
            <div className="flex gap-4">
              <div onClick={handleYesFeedback} className="normal-text-glow font-bold cursor-pointer duration-300 hover:green-text-glow">
                Yes
              </div>
              <div onClick={handleNoFeedback} className="normal-text-glow font-bold cursor-pointer duration-300 hover:red-text-glow">
                No
              </div>
            </div>
          </div>
        ) : (
          <div className="text-white text-xs text-center cursor-default">
            Thanks for the feedback! 😊
          </div>
        )}
        <div 
          onClick={handleReturn}
          className="normal-border-glow bg-pale-midnight rounded-lg w-1/6 p-2 min-w-[100px] text-white items-center mt-8 text-center cursor-pointer duration-300 hover:green-border-glow hover:font-bold max-sm:w-5/12"
        >
          Upload Again
        </div>
      </div>
  );
}

export default Results;
