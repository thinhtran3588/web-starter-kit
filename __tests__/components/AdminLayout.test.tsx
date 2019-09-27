import React from 'react';
import { render } from '@testing-library/react';
import { AdminLayout } from '@app/components/AdminLayout';

describe('components/Layout', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<AdminLayout />);
    expect(baseElement).toMatchSnapshot();
  });

  it('renders successfully with title', async () => {
    const { baseElement } = render(<AdminLayout title='Title' />);
    expect(baseElement).toMatchSnapshot();
  });
});
