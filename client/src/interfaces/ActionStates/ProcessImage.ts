// interface layout for results received directly from the server
export interface ProcessImageResult {
  predicted_label: 'AI_GENERATED' | 'NON_AI_GENERATED',
  confidence_level: number,
}

export interface Result {
  predictedLabel: 'AI_GENERATED' | 'NON_AI_GENERATED',
  confidenceLevel: number,
  }

export interface ProcessImageResponse {
  success: true,
  message: string,
  results: ProcessImageResult,
}

interface ProcessImageState {
  data: ProcessImageResponse | null,
  loading: boolean,
  error: string | null,
}

export default ProcessImageState;