import React from 'react';
import { render } from '@testing-library/react';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';
import { Dashboard } from '@app/modules/admin/screens/Dashboard';

describe('@app/modules/admin/screens/Dashboard', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <Dashboard />
      </TestBaseComponent>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
