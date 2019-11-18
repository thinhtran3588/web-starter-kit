import React from 'react';
import { render } from '@testing-library/react';
import { RolesScreen } from '@app/modules/auth/screens/RolesScreen';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';

describe('@app/modules/auth/screens/Roles', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <RolesScreen />
      </TestBaseComponent>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
