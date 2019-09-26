import React from 'react';
import { render } from '@testing-library/react';
import { Layout } from '@app/components/Layout';

describe('components/Layout', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<Layout />);
    expect(baseElement).toMatchSnapshot();
  });

  it('renders successfully with title', async () => {
    const { baseElement } = render(<Layout title='Title' />);
    expect(baseElement).toMatchSnapshot();
  });
});
