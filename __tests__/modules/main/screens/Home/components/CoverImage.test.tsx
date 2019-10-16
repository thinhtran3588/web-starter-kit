import React from 'react';
import { render } from '@testing-library/react';
import { CoverImage } from '@app/modules/main/screens/Home/components';

describe('@app/modules/main/screens/Home/components/CoverImage', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<CoverImage />);
    expect(baseElement).toMatchSnapshot();
  });
});
