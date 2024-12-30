import { postImage } from '../api/index.ts';

import { useProcessImageContext } from '../context/Actions/ProcessImageContext.tsx';

const useProcessImage = () => {
  const { dispatch } = useProcessImageContext();
  
  const processImage = async (image: string) => {
    dispatch({ type: "PROCESS_IMAGE_LOADING" });

    try {
      // obtain the base64 string of the image data url
      image = image.split(',')[1]
      
      const response = await postImage(image);

      dispatch({ type: "PROCESS_IMAGE_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "PROCESS_IMAGE_FAILURE", payload: error.response ? error.response.data.error : error.message });
    }
  }

  return processImage;
}

export default useProcessImage;