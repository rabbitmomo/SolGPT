import Image from 'next/image';
import { FC } from 'react';

const About: FC = () => {
  return (
    <div className="fullSize">
      <Image
        src="/Solanabackground3.jpg" 
        alt="Background Image"
        className="backgroundImage"
        layout="fill" 
        objectFit="cover" 
        draggable={false}
      />
      <div className="textOverlay">
        <div className="headingText">
          SolGPT
        </div>
        <div className="subHeadingText">
          Use AI to generate your own SPL-Token
        </div>
        <div className="bouncingArrow"></div>
      </div>
    </div>
  );
};

export default About;
