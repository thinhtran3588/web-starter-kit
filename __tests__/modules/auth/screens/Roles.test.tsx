import React from 'react';
import { render } from '@testing-library/react';
import { Roles } from '@app/modules/auth/screens/Roles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

describe('@app/modules/auth/screens/Roles', () => {
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
        <Roles />
      </MuiThemeProvider>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
