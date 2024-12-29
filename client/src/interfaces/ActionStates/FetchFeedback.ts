export interface FetchFeedbackResponse {
  success: true,
  message: string,
  feedback: number,
}

interface FetchFeedbackState {
  data: FetchFeedbackResponse | null,
  loading: boolean,
  error: string | null,
}

export default FetchFeedbackState;