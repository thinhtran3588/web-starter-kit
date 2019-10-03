import React from 'react';
import { render } from '@testing-library/react';
import { Sidebar } from '@app/components/Sidebar';

describe('components/Sidebar', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const onClose = jest.fn();
    const { baseElement } = render(<Sidebar onClose={onClose} open={true} variant='temporary' navItems={[]} />);

    expect(baseElement).toMatchSnapshot();
  });
});
