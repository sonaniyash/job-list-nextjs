import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@public/css/style.css';
import { Provider } from 'react-redux';
import store from '@state/store';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Poppins:wght@100;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
};

export default MyApp
