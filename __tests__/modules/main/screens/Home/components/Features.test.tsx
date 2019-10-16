import React from 'react';
import { render } from '@testing-library/react';
import { Features } from '@app/modules/main/screens/Home/components';

describe('@app/modules/main/screens/Home/components/Features', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<Features />);
    expect(baseElement).toMatchSnapshot();
  });
});
