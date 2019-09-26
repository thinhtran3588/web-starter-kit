import React from 'react';
import { render } from '@testing-library/react';
import Index from '../../pages';

describe('pages/Index', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<Index></Index>);
    expect(baseElement).toMatchSnapshot();
  });
});
