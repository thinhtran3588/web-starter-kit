import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Roles } from '@app/modules/auth/screens/Roles';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';

describe('@app/modules/auth/screens/Roles', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <Roles />
      </TestBaseComponent>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('navigates to Add User page when clicking Create button', async () => {
    const { getByText } = render(
      <TestBaseComponent>
        <Roles />
      </TestBaseComponent>,
    );

    fireEvent.click(getByText('Create'));
    // TODO: update test case
    expect(true).toBe(true);
  });
});
