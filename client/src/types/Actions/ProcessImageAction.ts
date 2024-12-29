import { ProcessImageResponse } from "../../interfaces/ActionStates/ProcessImage.ts";

type ProcessImageAction = 
  | { type: "PROCESS_IMAGE_SUCCESS", payload: ProcessImageResponse }
  | { type: "PROCESS_IMAGE_FAILURE", payload: string }
  | { type: "PROCESS_IMAGE_LOADING" };

export default ProcessImageAction;