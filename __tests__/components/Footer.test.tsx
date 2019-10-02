import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from '@app/components/Footer';

describe('components/Header', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<Footer />);

    expect(baseElement).toMatchSnapshot();
  });
});
