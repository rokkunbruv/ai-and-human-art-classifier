import { getFeedback } from '../api/index.ts';

import { useFetchFeedbackContext } from '../context/Actions/FetchFeedbackContext.tsx';

const useFetchFeedback = () => {
  const { dispatch } = useFetchFeedbackContext();

  const fetchFeedback = async () => {
    dispatch({ type: "FETCH_FEEDBACK_LOADING" });

    try {
      const response = await getFeedback();

      dispatch({ type: "FETCH_FEEDBACK_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_FEEDBACK_FAILURE", payload: error.response ? error.response.data.error : error.message });
    }
  }

  return fetchFeedback;
}

export default useFetchFeedback;