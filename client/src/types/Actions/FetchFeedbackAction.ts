import { FetchFeedbackResponse } from "../../interfaces/ActionStates/FetchFeedback.ts";

type FetchFeedbackAction = 
  | { type: "FETCH_FEEDBACK_SUCCESS", payload: FetchFeedbackResponse }
  | { type: "FETCH_FEEDBACK_FAILURE", payload: string }
  | { type: "FETCH_FEEDBACK_LOADING" };

export default FetchFeedbackAction;