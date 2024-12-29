import FetchFeedbackState from '../interfaces/ActionStates/FetchFeedback.ts';
import FetchFeedbackAction from '../types/Actions/FetchFeedbackAction.ts';

const fetchFeedbackReducer = (state: FetchFeedbackState, action: FetchFeedbackAction): FetchFeedbackState => {
  switch (action.type) {
    case "FETCH_FEEDBACK_SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null };
    case "FETCH_FEEDBACK_FAILURE":
      return { ...state, loading: false, data: null, error: action.payload };
    case "FETCH_FEEDBACK_LOADING":
      return { ...state, loading: true, data: null, error: null };
    default:
      return state;
  }
}

export default fetchFeedbackReducer;