import React from 'react';
import { render } from '@testing-library/react';
import { Users } from '@app/modules/auth/screens/Users';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';

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
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <Users loginTypes={loginTypes} roles={roles} />
      </TestBaseComponent>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
