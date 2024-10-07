// TODO: SignMessage
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { FC, useCallback } from 'react';
import { sign } from 'tweetnacl';
import { notify } from "../utils/notifications";

export const SignMessage: FC = () => {
    const { publicKey, signMessage } = useWallet();

    const onClick = useCallback(async () => {
        try {
            if (!publicKey) throw new Error('Wallet not connected!');
            if (!signMessage) throw new Error('Wallet does not support message signing!');
            const message = new TextEncoder().encode('Hello, world!');
            const signature = await signMessage(message);
            if (!sign.detached.verify(message, signature, publicKey.toBytes())) throw new Error('Invalid signature!');
            notify({ type: 'success', message: 'Sign message successful!', txid: bs58.encode(signature) });
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [publicKey, notify, signMessage]);

    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!publicKey}
            >
                <div className="hidden group-disabled:block">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" > 
                    Sign Message 
                </span>
            </button>
        </div>
    );
};
