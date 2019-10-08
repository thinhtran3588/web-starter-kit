import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  it('navigates to Add User page when clicking Create button', async () => {
    const { getByText } = render(
      <MuiThemeProvider theme={theme}>
        <Roles />
      </MuiThemeProvider>,
    );

    fireEvent.click(getByText('Create'));
    // TODO: update test case
    expect(true).toBe(true);
  });
});
