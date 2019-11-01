import React from 'react';
import { render } from '@testing-library/react';
import { About } from '@app/modules/main/screens/About';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';

describe('@app/modules/main/screens/About', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <About />
      </TestBaseComponent>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
