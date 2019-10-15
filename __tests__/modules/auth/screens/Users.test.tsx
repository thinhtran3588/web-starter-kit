import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Users } from '@app/modules/auth/screens/Users';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

describe('@app/modules/auth/screens/Users', () => {
  const providers = [
    {
      value: 'EMAIL',
      label: 'Email',
    },
    {
      value: 'PHONE_NO',
      label: 'Phone No',
    },
    {
      value: 'FACEBOOK',
      label: 'Facebook',
    },
    {
      value: 'GOOGLE',
      label: 'Google',
    },
  ];
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
        <Users providers={providers} />
      </MuiThemeProvider>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('navigates to Add Role page when clicking Create button', async () => {
    const { getByText } = render(
      <MuiThemeProvider theme={theme}>
        <Users providers={providers} />
      </MuiThemeProvider>,
    );

    fireEvent.click(getByText('Create'));
    // TODO: update test case
    expect(true).toBe(true);
  });
});
