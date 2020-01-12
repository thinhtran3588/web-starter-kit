import React from 'react';
import { render } from '@testing-library/react';
import { AdminBlogsScreen } from '@app/modules/blogs/screens/AdminBlogsScreen';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';

describe('@app/modules/AdminBlogs/screens/AdminBlogs', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <AdminBlogsScreen />
      </TestBaseComponent>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
