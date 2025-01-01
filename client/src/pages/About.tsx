import React from 'react';
import { useNavigate } from 'react-router-dom';

import TitleHeader from '../components/TitleHeader.tsx';
import Footer from '../components/Footer.tsx';

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/');

  return (
    <div className="flex flex-col min-h-screen items-center pt-16 px-2">
      <TitleHeader />
      <div className="text-white font-bold text-xl mt-4">
        About
      </div>
      <div className="w-7/12 mt-4 text-center text-white leading-relaxed max-sm:w-11/12">
        AI and Human Art Classifier is exactly what it sounds, it classifies whether an image you 
        uploaded is AI art or “real” art made by a living breathing person. However, I’m going to 
        attach a big asterisk on the title because: <br /> <br />
      
        <ul className="list-disc list-inside">
          <li>
            This classifier works on images in general, you don’t have to submit any 
            art/illustrations for it to work; and
          </li>
          <li>
            The classifier is only trained on a small dataset, so any predictions made by the 
            model is most likely going to be wrong. You do have the choice though to provide a 
            feedback if the model is inaccurate.
          </li>
        </ul> <br />

        To use the classifier, you can click the "Upload Image" box or drag and drop an image to
        the box. You are then given a preview of your image before sending it to the classifier.
        Upon previewing the image, you have the option to reselect another image or discard the
        previewed image and go back to the home page. Once you are ready to submit your image to
        the classifier, you can go upload your image to the classifier. It might take a few seconds
        depending on how fast your Internet connection is. <br /> <br />
        
        Once the classifier has successfully processed your image, the processing results will be 
        shown to you displaying the label that the classifier assigned to your uploaded image. It
        will also display how confident the classifier is that the label is accurate. After viewing 
        the results, you have the option to provide a feedback if the label set by the classifier is 
        accurate. If you want to process another image again, you can always click the "Upload Again" 
        button to try another image of your choice. <br /> <br />

        So what are you waitng for? Upload your images now and let the classifier do its magic! ✨
      </div>
      <div 
        onClick={handleClick}
        className="normal-text-glow text-xl mt-8 cursor-pointer duration-300 hover:font-bold mb-16">
        Go back
      </div>
      <Footer />
    </div>
  );
}

export default About;
