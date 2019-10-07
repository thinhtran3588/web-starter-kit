import React from 'react';
import { render } from '@testing-library/react';
import { AdminFooter } from '@app/components';

describe('components/AdminFooter', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<AdminFooter />);

    expect(baseElement).toMatchSnapshot();
  });
});
