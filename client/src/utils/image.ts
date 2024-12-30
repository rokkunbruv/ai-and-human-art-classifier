// converts a File object to a data url string
export const fileToImageURL = (file: File, setImage: (image: string | undefined) => void) => {
  const reader = new FileReader();

  reader.onload = () => {
    if (reader.result) {
      setImage(reader.result as string);
    }
  };

  reader.readAsDataURL(file);
};