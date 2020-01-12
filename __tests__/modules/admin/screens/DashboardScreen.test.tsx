import React from 'react';
import { render } from '@testing-library/react';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';
import { DashboardScreen } from '@app/modules/admin/screens/DashboardScreen';

describe('@app/modules/admin/screens/Dashboard', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <DashboardScreen />
      </TestBaseComponent>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
