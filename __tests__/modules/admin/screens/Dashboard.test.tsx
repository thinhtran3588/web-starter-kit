import React from 'react';
import { render } from '@testing-library/react';
import { Dashboard } from '@app/modules/admin/screens/Dashboard';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

describe('@app/modules/admin/screens/Dashboard', () => {
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
        <Dashboard />
      </MuiThemeProvider>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
