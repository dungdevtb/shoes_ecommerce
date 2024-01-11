import '../common/styles/global.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import MainLayout from '@/common/layouts/main';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from './redux/store';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Shoes e-commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
};

export default wrapper.withRedux(App);
