import { postFeedback } from '../api/index.ts';

import { useSubmitFeedbackContext } from '../context/Actions/SubmitFeedbackContext.tsx';

const useSubmitFeedback = () => {
  const { dispatch } = useSubmitFeedbackContext();

  const submitFeedback = async (feedback: string) => {
    dispatch({ type: "SUBMIT_FEEDBACK_LOADING" });

    try {
      const response = await postFeedback(feedback);

      dispatch({ type: "SUBMIT_FEEDBACK_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "SUBMIT_FEEDBACK_FAILURE", payload: error.response ? error.response.data.error : error.message });
    }
  }

  return submitFeedback;
}

export default useSubmitFeedback;