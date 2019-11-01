import React from 'react';
import { render } from '@testing-library/react';
import { HomeScreen } from '@app/modules/main/screens/HomeScreen';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';

describe('@app/modules/main/screens/HomeScreen', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <HomeScreen />
      </TestBaseComponent>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
