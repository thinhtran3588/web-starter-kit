import React from 'react';
import { render } from '@testing-library/react';
import { Features } from '@app/modules/main/screens/HomeScreen/components';

describe('@app/modules/main/screens/HomeScreen/components/Features', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<Features />);
    expect(baseElement).toMatchSnapshot();
  });
});
