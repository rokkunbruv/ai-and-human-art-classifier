import ProcessImageState from '../interfaces/ActionStates/ProcessImage.ts';
import ProcessImageAction from '../types/Actions/ProcessImageAction.ts';

const processImageReducer = (state: ProcessImageState, action: ProcessImageAction): ProcessImageState => {
  switch (action.type) {
    case "PROCESS_IMAGE_SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null };
    case "PROCESS_IMAGE_FAILURE":
      return { ...state, loading: false, data: null, error: action.payload };
    case "PROCESS_IMAGE_LOADING":
      return { ...state, loading: true, data: null, error: null };
    default:
      return state;
  }
}

export default processImageReducer;