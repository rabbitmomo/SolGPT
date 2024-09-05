import Image from 'next/image';
import { FC } from 'react';

const About: FC = () => {
  return (
    <div className="fullSize">
      <Image
        src="/Solanabackground3.jpg" // Ensure this path is relative to the public folder
        alt="Background Image"
        className="backgroundImage"
        layout="fill" // 'fill' makes the image cover the container
        objectFit="cover" // Ensures the image covers the area without stretching
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
