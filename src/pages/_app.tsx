import { NextPage } from 'next';
import localFont from 'next/font/local';

import { store } from '@/store/store';
import { Provider } from 'react-redux';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

import ToastMessage from '@/components/toast/toast-message';
import GlobalProvider from '@/context/global';
import '@/styles/code.scss';
import '@/styles/font.scss';
import '@/styles/globals.scss';
import '@/styles/customize-scrollbar.scss';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

type AppPropsWithLayout<P = {}, E = {}> = AppProps<P> & {
  Component: NextPage;
  initialState?: any;
} & E;

export const DMSansVN = localFont({
  src: [
    { path: '../../public/fonts/DMSansVN-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/DMSansVN-Italic.otf', weight: '400', style: 'italic' },

    { path: '../../public/fonts/DMSansVN-Medium.otf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/DMSansVN-MediumItalic.otf', weight: '500', style: 'italic' },

    { path: '../../public/fonts/DMSansVN-Bold.otf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/DMSansVN-BoldItalic.otf', weight: '700', style: 'italic' }
  ],
  display: 'swap',
  variable: '--font-sans'
});
export const Itel = localFont({
  src: [
    { path: '../../public/fonts/iTel-Regular.woff', weight: '500', style: 'normal' },
    { path: '../../public/fonts/iTel-Bold.woff', weight: '700', style: 'normal' }
  ],
  display: 'swap',
  variable: '--font-itel'
});

export default appWithTranslation(function App({ Component, pageProps, router, ...rest }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1" />
      </Head>
      <GlobalProvider>
        {getLayout(<Component {...pageProps} router={router} />, pageProps)}
        <Toaster>{ToastMessage}</Toaster>
      </GlobalProvider>
    </Provider>
  );
});
