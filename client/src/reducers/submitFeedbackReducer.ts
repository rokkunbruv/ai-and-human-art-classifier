import SubmitFeedbackState from '../interfaces/ActionStates/SubmitFeedback.ts';
import SubmitFeedbackAction from '../types/Actions/SubmitFeedbackAction.ts';

const submitFeedbackReducer = (state: SubmitFeedbackState, action: SubmitFeedbackAction): SubmitFeedbackState => {
  switch (action.type) {
    case "SUBMIT_FEEDBACK_SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null };
    case "SUBMIT_FEEDBACK_FAILURE":
      return { ...state, loading: false, data: null, error: action.payload };
    case "SUBMIT_FEEDBACK_LOADING":
      return { ...state, loading: true, data: null, error: null };
    default:
      return state;
  }
}

export default submitFeedbackReducer;