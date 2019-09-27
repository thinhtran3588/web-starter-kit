import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '@app/components/Header';

describe('components/Header', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<Header />);
    expect(baseElement).toMatchSnapshot();
  });
});
