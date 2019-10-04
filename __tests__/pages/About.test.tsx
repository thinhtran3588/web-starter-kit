import React from 'react';
import { render } from '@testing-library/react';
import About from '../../pages/about';

describe('pages/about', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<About />);
    expect(baseElement).toMatchSnapshot();
  });
});
