import { SubmitFeedbackResponse } from "../../interfaces/ActionStates/SubmitFeedback.ts";

type SubmitFeedbackAction = 
  | { type: "SUBMIT_FEEDBACK_SUCCESS", payload: SubmitFeedbackResponse }
  | { type: "SUBMIT_FEEDBACK_FAILURE", payload: string }
  | { type: "SUBMIT_FEEDBACK_LOADING" };

export default SubmitFeedbackAction;