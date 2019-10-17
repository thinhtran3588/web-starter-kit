import React from 'react';
import { render } from '@testing-library/react';
import { BlogsList } from '@app/modules/blogs/screens/Blogs/components';

describe('@app/modules/blogs/screens/Blogs/components/BlogsList', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<BlogsList />);
    expect(baseElement).toMatchSnapshot();
  });
});
