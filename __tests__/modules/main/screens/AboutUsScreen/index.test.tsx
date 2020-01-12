import React from 'react';
import { render } from '@testing-library/react';
import { AboutUsScreen } from '@app/modules/main/screens/AboutUsScreen';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';

describe('@app/modules/main/screens/About', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <AboutUsScreen />
      </TestBaseComponent>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
