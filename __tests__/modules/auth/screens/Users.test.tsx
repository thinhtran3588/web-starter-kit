import React from 'react';
import { render } from '@testing-library/react';
import { UsersScreen } from '@app/modules/auth/screens/UsersScreen';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';

describe('@app/modules/auth/screens/Users', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <UsersScreen />
      </TestBaseComponent>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
