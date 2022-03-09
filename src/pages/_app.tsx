import { useEffect } from 'react';

// Modules
import Head from 'next/head';
import { AppProps } from 'next/app';

/// REDUX TOOLKIT
import { Provider } from 'react-redux';
import { store } from '../store';
/// REDUX TOOLKIT END

/// CONTEXT
import AppProvider from '../context/AppProvider';
import { UserProvider } from '../context/UserContext';
/// CONTEXT END

/// MATERIAL - UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

/// OWN COMPONENTS
import Layout from '../layouts/Layout';
/// OWN COMPONENTS END

/// STYLES & TYPES
import theme from '../styles/js/theme';
import '../styles/scss/globals.scss';
import 'bootstrap/dist/css/bootstrap.css';
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

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
      <Provider store={store}>
        <UserProvider>
          <Head>
            <title>My App</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18next}>
              <AppProvider>
                <CssBaseline />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </AppProvider>
            </I18nextProvider>
          </ThemeProvider>
        </UserProvider>
      </Provider>
    </>
  );
};

export default MyApp;
