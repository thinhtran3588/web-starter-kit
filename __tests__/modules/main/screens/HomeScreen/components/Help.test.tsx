import React from 'react';
import { render } from '@testing-library/react';
import { Help } from '@app/modules/main/screens/HomeScreen/components';

describe('@app/modules/main/screens/HomeScreen/components/Help', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<Help t={(key: string) => key} />);
    expect(baseElement).toMatchSnapshot();
  });
});
