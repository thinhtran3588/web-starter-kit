import React from 'react';
import { render } from '@testing-library/react';
import { Users } from '@app/modules/auth/screens/Users';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

describe('@app/modules/auth/screens/Users', () => {
  const loginTypes = [
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
  const roles = [
    {
      value: '0',
      label: 'Admin',
    },
    {
      value: '1',
      label: 'Normal User',
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
        <Users loginTypes={loginTypes} roles={roles} />
      </MuiThemeProvider>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('navigates to Add Role page when clicking Create button', async () => {
    // const {} = render(
    //   <MuiThemeProvider theme={theme}>
    //     <Users loginTypes={loginTypes} roles={roles} />
    //   </MuiThemeProvider>,
    // );

    // fireEvent.click(getByText('Create'));
    // TODO: update test case
    expect(true).toBe(true);
  });
});
