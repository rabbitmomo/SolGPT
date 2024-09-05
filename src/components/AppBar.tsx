import { FC,useState, useEffect } from 'react';
import Link from 'next/link';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAutoConnect } from '../contexts/AutoConnectProvider';

import Image from 'next/image';

export const AppBar: FC = (props) => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-75">
      {/* NavBar / Header */}
      <div className="navbar flex flex-row shadow-lg bg-transparent text-neutral-content">
        <div className="navbar-start">
          <div className={`hidden sm:inline w-22 h-22 pt-2 ml-3`}>
          <Image
            src="/solgptlogo.png" // Ensure this path is relative to the public folder
            alt="solgptlogo Image"
            width={170}  // Adjust width as needed
            height={40} // Adjust height as needed
          />  
          </div>
        </div>

        {/* Wallet & Settings */}
        <div className="navbar-end mr-5">
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-square btn-ghost text-right">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box sm:w-52"
            >
              <li>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <a>Autoconnect</a>
                    <input
                      type="checkbox"
                      checked={autoConnect}
                      onChange={(e) => setAutoConnect(e.target.checked)}
                      className="toggle"
                    />
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <WalletMultiButton className="btn btn-ghost mr-4" />
        </div>
      </div>
      {props.children}
    </div>
  );
};
