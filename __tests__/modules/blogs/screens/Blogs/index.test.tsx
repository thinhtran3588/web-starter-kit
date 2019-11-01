import React from 'react';
import { render } from '@testing-library/react';
import { Blogs } from '@app/modules/blogs/screens/Blogs';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';

describe('@app/modules/blogs/screens/Blogs', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <Blogs />
      </TestBaseComponent>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
