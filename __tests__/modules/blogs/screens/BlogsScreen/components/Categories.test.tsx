import React from 'react';
import { render } from '@testing-library/react';
import { Categories } from '@app/modules/blogs/screens/Blogs/components';

describe('@app/modules/blogs/screens/Blogs/components/Categories', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<Categories />);
    expect(baseElement).toMatchSnapshot();
  });
});
