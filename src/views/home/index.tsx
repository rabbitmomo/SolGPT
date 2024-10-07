// Next, React
import { FC, useEffect } from 'react';
import Image from 'next/image';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import { CreateToken } from 'components/CreateToken';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export const HomeView: FC = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  return (
    <div className="relative w-full h-screen"> {/* Ensure full height for background image */}
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/typingBackground.png" // Ensure this path is correct and the file exists in the public folder
          alt="Background Image"
          layout="fill" // Fill the container
          objectFit="cover" // Cover the container
          priority // Load the image as a priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="md:hero mx-auto p-4">
          <div className="md:hero-content flex flex-col text-center">  
            <CreateToken />
          </div>
        </div>
      </div>
    </div>
  );
};
