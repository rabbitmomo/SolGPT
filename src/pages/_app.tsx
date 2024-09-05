import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Image from 'next/image';
import Notifications from '../components/Notification'
import About from 'components/About';
import Instruction from 'components/Instruction';

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
          <Head>
            <title>Solana Scaffold Lite</title>
          </Head>

          <ContextProvider>
            <div className="flex flex-col h-screen">
              <Notifications />
              <AppBar/>
              <ContentContainer>
                <About/>
                <Instruction />
                <Component {...pageProps} />
                <Footer/>
              </ContentContainer>
            </div>
          </ContextProvider>
        </>
    );
};

export default App;
