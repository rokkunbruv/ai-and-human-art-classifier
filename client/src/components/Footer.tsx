import React from 'react';

const Footer = () => {
  return (
    <div className="flex justify-center p-4 mt-auto">
      <div className="flex text-center text-xs text-white gap-4 cursor-default max-sm:gap-2">
        <div>January 2025</div>
        <div>&middot;</div> 
        <div className="flex gap-1">
          <div>Created by</div>
          <a href="https://github.com/rokkunbruv" target="_blank" rel="noreferrer" className="cursor-pointer duration-300 hover:normal-text-glow">
            rokkunbruv
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
