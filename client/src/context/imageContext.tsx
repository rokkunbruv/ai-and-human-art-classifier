import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ImageContextProps {
  file: File | null,
  setFile: (file: File | null) => void,
  fileError: boolean,
  setFileError: (noFileError: boolean) => void,
  image: string | undefined,
  setImage: (image: string | undefined) => void,
  imageError: boolean,
  setImageError: (noImageError: boolean) => void,
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imageError, setImageError] = useState(false);

  return (
    <ImageContext.Provider 
      value={{ 
        file,
        setFile,
        fileError,
        setFileError,
        image,
        setImage,
        imageError,
        setImageError,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

export const useImageContext = (): ImageContextProps => {
  const context = useContext(ImageContext);

  if (!context) {
    throw new Error('useImageContext must be used within a ImageContextProvider');
  }

  return context;
}
