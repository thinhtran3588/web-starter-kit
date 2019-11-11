import React from 'react';
import App from 'next/app';
import firebase from 'firebase/app';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { theme, appWithTranslation } from '@app/core';
import { config } from '@app/config';
import { withApollo } from '@app/hoc';
import { Notification, NoSsr } from '@app/components';

class MyApp extends App {
  // eslint-disable-next-line class-methods-use-this
  componentDidMount(): void {
    // Remove the server-side injected CSS.
    // eslint-disable-next-line no-undef
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles && jssStyles.parentNode && jssStyles.parentNode.removeChild(jssStyles);

    firebase.apps.length === 0 && firebase.initializeApp(config.firebaseConfig);
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
        <NoSsr>
          <Notification />
        </NoSsr>
      </>
    );
  }
}
export default appWithTranslation(withApollo(MyApp));
