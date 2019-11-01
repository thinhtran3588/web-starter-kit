import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { initApolloClient } from '@app/core';

interface Props {
  children?: React.ReactNode;
}

export const TestBaseComponent = (props: Props): JSX.Element => {
  const theme = createMuiTheme({
    props: {
      MuiWithWidth: {
        initialWidth: 'xs',
      },
    },
  });
  const client = initApolloClient();
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ApolloProvider>
  );
};
