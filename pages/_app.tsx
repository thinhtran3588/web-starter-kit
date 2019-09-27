import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '@app/core/theme';

export default class MyApp extends App {
  // eslint-disable-next-line class-methods-use-this
  componentDidMount(): void {
    // Remove the server-side injected CSS.
    // eslint-disable-next-line no-undef
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles && jssStyles.parentNode && jssStyles.parentNode.removeChild(jssStyles);
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
