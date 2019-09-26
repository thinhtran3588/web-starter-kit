import React from 'react';
import { render } from '@testing-library/react';
import About from '../../pages/About';

describe('pages/About', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<About />);
    expect(baseElement).toMatchSnapshot();
  });
});
