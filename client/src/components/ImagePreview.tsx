// previews image to be processed by the classifier

import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useImageContext } from '../context/imageContext.tsx';
import useProcessImage from '../actions/processImage.ts';
import { fileToImageURL } from '../utils/image.ts';

const ImagePreview = () => {
  const { setFile, setFileError, image, setImage, setImageError } = useImageContext();

  const processImage = useProcessImage();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // sends image to the classifier and navigate to results page
  const handleUpload = () => {
    if (!image) {
      setImageError(true);
      return;
    }

    processImage(image);

    setFile(null);

    navigate('/results/')
  };

  // prompt file input
  const handleReselect = () => {
    fileInputRef.current?.click()
  };

  // deletes the image
  const handleDiscard = () => {
    setFile(null);
    setImage(undefined);
  };

  // update image when a file is selected from file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setFileError(true);
      return;
    }

    setFile(selectedFile);

    fileToImageURL(selectedFile, setImage); 
  }
  
  return (
    <div className="w-5/12 max-sm:w-7/12">
      <div className="flex flex-col items-center">
        <div className="text-cream font-bold text-center text-2xl mb-4 cursor-default">
          Preview Image
        </div>
        <img
          src={image}
          alt=""
          className="min-w-[100px] max-h-[512px] object-contain normal-border-glow rounded-lg mb-4"
        />
      </div>
      <div 
        onClick={handleUpload}
        className="cursor-pointer bg-pale-midnight normal-border-glow rounded-lg p-2 min-w-[100px] text-white text-center mb-4 duration-300 hover:green-border-glow hover:font-bold"
      >
        Upload
      </div>
      <div 
        onClick={handleReselect}
        className="cursor-pointer bg-pale-midnight normal-border-glow rounded-lg p-2 min-w-[100px] text-white text-center mb-4 duration-300 hover:white-border-glow hover:font-bold"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        Reselect
      </div>
      <div 
        onClick={handleDiscard}
        className="cursor-pointer bg-pale-midnight normal-border-glow rounded-lg p-2 min-w-[100px] text-white text-center mb-4 duration-300 hover:red-border-glow hover:font-bold"
      >
        Discard
      </div>
    </div>
  )
}

export default ImagePreview;
