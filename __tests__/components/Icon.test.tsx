import React from 'react';
import { render } from '@testing-library/react';
import { Icon } from '@app/components/Icon';

describe('components/Icon', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<Icon name='Home' />);

    expect(baseElement).toMatchSnapshot();
  });

  it('renders default successfully', async () => {
    const { baseElement } = render(<Icon name='default' />);

    expect(baseElement).toMatchSnapshot();
  });
});
