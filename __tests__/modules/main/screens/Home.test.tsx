import React from 'react';
import { render } from '@testing-library/react';
import { Home } from '@app/modules/main/screens/Home';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

describe('@app/modules/main/screens/Home', () => {
  const theme = createMuiTheme({
    props: {
      MuiWithWidth: {
        initialWidth: 'xs',
      },
    },
  });
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <MuiThemeProvider theme={theme}>
        <Home />
      </MuiThemeProvider>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
