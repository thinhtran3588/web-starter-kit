import React from 'react';
import { render } from '@testing-library/react';
import { About } from '@app/modules/main/screens/About';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

describe('@app/modules/main/screens/About', () => {
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
        <About />
      </MuiThemeProvider>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
