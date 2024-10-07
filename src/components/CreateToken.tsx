import { FC, useCallback, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { notify } from "../utils/notifications";
import Image from 'next/image';
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from '@solana/spl-token';
import { createCreateMetadataAccountV3Instruction, PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import axios from 'axios';

export const CreateToken: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [inputValue, setInputValue] = useState('');
  const [typewriterText, setTypewriterText] = useState('Creating Your Custom Token...');

  useEffect(() => {
    // Update the typewriter text based on inputValue
    if (inputValue) {
      setTypewriterText(`Processing: ${inputValue}`);
    } else {
      setTypewriterText('Creating Your Custom Token...');
    }
  }, [inputValue]);

  const onClick = useCallback(async () => {
    try {
      // Step 1: Analyze the input using GPT-4
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-4",  // Update to use GPT-4
        messages: [
          {
            role: "user",
            content: `Extract the following details from this sentence: "${inputValue}". Provide them in a JSON object with the keys: TokenName, Symbol, Amount, MetadataUrl, Decimals. If a value is missing, use the default values: TokenName="Token", Symbol="SYM", Amount=1000, MetadataUrl="https://www.example.com/metadata.json", Decimals=5.`
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Parse the response from GPT-4
      let extractedDetails;
      try {
        extractedDetails = JSON.parse(response.data.choices[0].message.content.trim());
      } catch (parseError) {
        throw new Error('Error parsing response: ' + parseError.message);
      }
  
      // Step 2: Set default values if necessary
      const TokenName = extractedDetails.TokenName || "Token";
      const Symbol = extractedDetails.Symbol || "SYM";
      let Amount = Number(extractedDetails.Amount) || 1000;
      const MetadataUrl = extractedDetails.MetadataUrl || "https://www.example.com/metadata.json";
      let Decimals = Number(extractedDetails.Decimals) || 5;
  
      // Ensure Amount and Decimals are valid numbers
      if (isNaN(Amount)) {
        Amount = 1000;
      }
      if (isNaN(Decimals)||Decimals>9) {
        Decimals = 5;
      }
  
      // Step 3: Proceed with token creation
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeypair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(mintKeypair.publicKey, publicKey);
  
      const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
        {
          metadata: PublicKey.findProgramAddressSync(
            [
              Buffer.from('metadata'),
              PROGRAM_ID.toBuffer(),
              mintKeypair.publicKey.toBuffer(),
            ],
            PROGRAM_ID
          )[0],
          mint: mintKeypair.publicKey,
          mintAuthority: publicKey,
          payer: publicKey,
          updateAuthority: publicKey,
        },
        {
          createMetadataAccountArgsV3: {
            data: {
              name: TokenName,
              symbol: Symbol,
              uri: MetadataUrl,
              creators: null,
              sellerFeeBasisPoints: 0,
              uses: null,
              collection: null,
            },
            isMutable: false,
            collectionDetails: null,
          },
        }
      );
  
      const amountWithDecimals = BigInt(Amount * Math.pow(10, Decimals));
      const createNewTokenTransaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports: lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          Decimals,
          publicKey,
          publicKey,
          TOKEN_PROGRAM_ID
        ),
        createAssociatedTokenAccountInstruction(publicKey, tokenATA, publicKey, mintKeypair.publicKey),
        createMintToInstruction(mintKeypair.publicKey, tokenATA, publicKey, amountWithDecimals),
        createMetadataInstruction
      );
  
      await sendTransaction(createNewTokenTransaction, connection, { signers: [mintKeypair] });
  
      // Display the token's mint address in the success alert
      notify({ type: 'success', message: `Token Created Successfully! Token Address: ${mintKeypair.publicKey.toBase58()}` });
  
    } catch (error) {
      console.error('Error creating token:', error.message);
      notify({ type: 'error', message: `Token Creation Failed, There was an error creating the token: ${error.message}` });
    }
  }, [inputValue, publicKey, connection, sendTransaction]);
  
  return (
    <div className="my-6">
      <div className="typewriter-container mb-8">
        <div className="typewriter mb-8">
          {typewriterText}
        </div>
      </div>
    
      {/* Add margin to the input field */}
      <input
        type="text"
        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none inputbox inputTypewriter" // Add 'my-6' for margin above and below the input
        placeholder="Enter details in a sentence"
        onChange={(e) => setInputValue(e.target.value)}
      />
    
      {/* Add margin to the button */}
      <button
        className="m-2 mt-[30px] btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        onClick={onClick}
      >
        <span>Analyze and Create Token</span>
      </button>
    </div>
  );
};
