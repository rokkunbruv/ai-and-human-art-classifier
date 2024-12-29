import React, { useState, useRef, DragEvent } from 'react';

import { useImageContext } from '../context/imageContext.tsx';
import { fileToImageURL } from '../utils/image.ts';

import imageIcon from '../assets/image-icon.svg';

const FileUpload: React.FC = () => {
    const [draggedOver, setDraggedOver] = useState(false);

    const { setFile, setFileError, setImage } = useImageContext();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!draggedOver) setDraggedOver(true);
    };
  
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (draggedOver) setDraggedOver(false);
    };
  
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (draggedOver) setDraggedOver(false);
  
      const droppedFile = e.dataTransfer.files[0];

      if (!droppedFile || !droppedFile.type.startsWith('image/')) {
        setFileError(true);
        return;
      }

      setFile(droppedFile);

      fileToImageURL(droppedFile, setImage);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      if (!selectedFile) {
        setFileError(true);
        return;
      }

      setFile(selectedFile);

      fileToImageURL(selectedFile, setImage);
    }

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
          `flex flex-col items-center justify-center w-5/12 h-80 bg-pale-midnight rounded-lg ${draggedOver ? "green-border-glow" : "normal-border-glow"} cursor-pointer duration-300`
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
          `${draggedOver ? "green-text-glow" : "normal-text-glow"} font-bold text-lg mb-1 duration-300`
        }>
          UPLOAD IMAGE
        </div>
        <div className="text-white text-center text-xs w-1/2">
          drag and drop your image here or click this box to upload your image
        </div>
      </div>
    );
  }

  export default FileUpload;