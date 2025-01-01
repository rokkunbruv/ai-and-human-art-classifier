// image file input component
// also accepts image files that were dragged and dropped

import React, { useState, useRef, DragEvent } from 'react';

import { useImageContext } from '../context/imageContext.tsx';
import { fileToImageURL } from '../utils/image.ts';

import imageIcon from '../assets/image-icon.svg';

const FileUpload: React.FC = () => {
    const [draggedOver, setDraggedOver] = useState(false);

    const { setFile, fileError, setFileError, setImage } = useImageContext();

    const fileInputRef = useRef<HTMLInputElement>(null);

    // handles when a dragged file enter the bounds of the component
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!draggedOver) setDraggedOver(true);
    };
  
    // handles when a dragged file leaves the bounds of the component
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (draggedOver) setDraggedOver(false);
    };
  
    // handles when a dragged file is released on the bounds of the component
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (draggedOver) setDraggedOver(false);
  
      const droppedFile = e.dataTransfer.files[0];

      // raise an error if droppedFile cannot be read or if droppedFile is not a valid image file
      if (!droppedFile || !droppedFile.type.startsWith('image/')) {
        setFileError(true);
        return;
      }

      // allows user to submit a valid image file to try again after a fileError occurred
      if (fileError) setFileError(false); 

      setFile(droppedFile);

      // convert file to data url
      fileToImageURL(droppedFile, setImage);
    };

    // updates file states when a file is selected from file input
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      // raise an error if selectedFile cannot be read
      if (!selectedFile) {
        setFileError(true);
        return;
      }

      // allows user to submit a valid image file to try again after a fileError occurred
      if (fileError) setFileError(false);

      setFile(selectedFile);

      // convert file to data url
      fileToImageURL(selectedFile, setImage);
    }

    // prompts file input when component is clicked
    const handleClick = () => {
      fileInputRef.current?.click();
    }
    
    return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={
          `flex flex-col items-center justify-center w-7/12 h-80 p-8 bg-pale-midnight rounded-lg ${draggedOver ? "green-border-glow" : "normal-border-glow"} cursor-pointer duration-300 md:w-5/12`
        }
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <img 
          src={imageIcon}
          alt=""
          className="mb-2"
        />
        <div className={
          `${draggedOver ? "green-text-glow" : "normal-text-glow"} font-bold text-center text-lg mb-1 duration-300`
        }>
          UPLOAD IMAGE
        </div>
        <div className="text-white text-center text-xs md:w-1/2">
          drag and drop your image here or click this box to upload your image
        </div>
      </div>
    );
  }

  export default FileUpload;