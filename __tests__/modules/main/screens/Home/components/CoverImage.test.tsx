import React from 'react';
import { render } from '@testing-library/react';
import { CoverImage } from '@app/modules/main/screens/HomeScreen/components';

describe('@app/modules/main/screens/HomeScreen/components/CoverImage', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<CoverImage />);
    expect(baseElement).toMatchSnapshot();
  });
});
