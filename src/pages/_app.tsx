import { useEffect } from 'react';
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.css';
// Modules
import Head from 'next/head';
import { AppProps } from 'next/app';
// MUI Core
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
// Utils
import theme from '../utils/theme';
import Layout from '../components/common/Layout';
import AppProvider from '../context/AppProvider';

interface IProps extends AppProps {
  errorState: { open: boolean; message: string };
}

const MyApp = ({ Component, pageProps }: IProps): JSX.Element => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
