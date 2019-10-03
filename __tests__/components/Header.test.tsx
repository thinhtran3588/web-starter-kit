import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '@app/components';
import { NavItem } from '@app/core';

describe('components/Header', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const navItems: NavItem[] = [
      {
        link: '/',
        text: 'Home',
      },
      {
        link: '/about',
        text: 'About',
      },
    ];

    const { baseElement } = render(<Header onSidebarOpen={() => {}} navItems={navItems} />);

    expect(baseElement).toMatchSnapshot();
  });
});
