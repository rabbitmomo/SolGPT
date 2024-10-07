import { FC,useState, useEffect } from 'react';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import Image from 'next/image';
import { RequestAirdrop } from './RequestAirdrop';
import SOLBalanceDisplay from './SolBalanceDispay';

export const AppBar: FC = (props) => {
  

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-75">
      {/* NavBar / Header */}
      <div className="navbar flex flex-row shadow-lg bg-transparent text-neutral-content">
        <div className="navbar-start">
          <div className={`hidden sm:inline w-22 h-22 pt-2 ml-3`}>
          <Image
            src="/solgptlogo.png" 
            alt="solgptlogo Image"
            width={170}  
            height={40} 
          />  
          </div>
        </div>

        {/* Wallet & Settings */}
        <div className="navbar-end mr-5">
          <SOLBalanceDisplay />
          <span className="w-4"></span>
          <RequestAirdrop />
          <span className="w-4"></span>
          <WalletMultiButton className="btn btn-ghost mr-4" />
        </div>
      </div>
      {props.children}
    </div>
  );
};
