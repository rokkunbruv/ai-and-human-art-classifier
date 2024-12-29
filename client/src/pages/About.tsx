import React from 'react';
import { useNavigate } from 'react-router-dom';

import TitleHeader from '../components/TitleHeader.tsx';

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/');

  return (
    <div className="flex flex-col items-center h-screen bg-midnight-to-red-gradient">
      <TitleHeader />
      <div className="text-white font-bold text-xl mt-4">
        About
      </div>
      <div className="w-7/12 mt-4 text-center text-white leading-relaxed">
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

        *some details regarding the app*
      </div>
      <div 
        onClick={handleClick}
        className="normal-text-glow text-xl mt-4 cursor-pointer">
        Go back
      </div>
    </div>
  );
}

export default About;
