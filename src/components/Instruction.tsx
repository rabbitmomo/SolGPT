import Image from 'next/image';
import { FC } from 'react';

const Instruction: FC = () => {
  return (
    <div
      className="w-full h-[600px] flex flex-col items-center justify-center p-[0px]"
      style={{ backgroundColor: '#EAE2DE', margin: 0, padding: 0 }} // Background color
    >
      {/* Image container */}
      <div className="flex justify-center mb-[20px]">
        <Image
          src="/InstructionImg.png" // Ensure this path is relative to the public folder
          alt="Instruction Image"
          layout="intrinsic" // Preserve the intrinsic dimensions of the image
          width={800} // Adjust width as needed
          height={350} // Adjust height as needed
          objectFit="contain" // Ensures the image is contained within the container
          draggable={false}
        />
      </div>

      {/* Headings container */}
      <div className="text-center px-4 text-black mb-[0px]"> {/* Text color set to black */}
        <h1 className="text-4xl font-bold mb-0 text-black italic font-mono">
          "Hey SolGPT, could you help me to create 1000 Meow token"
        </h1>
        <p className="text-2xl text-black mt-[25px]">
          You can add the details of Token name, symbol, supply, decimals, and a JSON file URL that contains Image URL like <br />
          <a href="https://rabbitmomo.github.io/metadata/file.json"
            className='underline italic text-blue-500'  // Text color set to blue
          >https://rabbitmomo.github.io/metadata/file.json</a>
        </p>
      </div>
    </div>
  );
};

export default Instruction;
