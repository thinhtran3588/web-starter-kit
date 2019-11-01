import React from 'react';
import { render } from '@testing-library/react';
import { AdminBlogs } from '@app/modules/blogs/screens/AdminBlogs';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';

describe('@app/modules/AdminBlogs/screens/AdminBlogs', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <AdminBlogs />
      </TestBaseComponent>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
