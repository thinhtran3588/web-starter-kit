import React from 'react';
import { render } from '@testing-library/react';
import { Quote } from '@app/modules/main/screens/Home/components';

describe('@app/modules/main/screens/Home/components/Quote', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<Quote />);
    expect(baseElement).toMatchSnapshot();
  });
});
