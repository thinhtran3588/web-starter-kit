import React from 'react';
import { render } from '@testing-library/react';
import { Help } from '@app/modules/main/screens/Home/components';

describe('@app/modules/main/screens/Home/components/Help', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<Help />);
    expect(baseElement).toMatchSnapshot();
  });
});
