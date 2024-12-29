export interface SubmitFeedbackResponse {
  success: true,
  message: string,
}

interface SubmitFeedbackState {
  data: SubmitFeedbackResponse | null,
  loading: boolean,
  error: string | null,
}

export default SubmitFeedbackState;