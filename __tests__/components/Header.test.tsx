import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '@app/components';
import { NavItem } from '@app/core';

describe('components/Header', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const navItems: NavItem[] = [
      {
        id: 'home',
        link: '/',
        text: 'Home',
      },
      {
        id: 'about',
        link: '/about',
        text: 'About',
      },
      {
        id: 'noLink',
        text: 'No Link',
      },
    ];

    const { baseElement } = render(<Header onSidebarOpen={() => {}} navItems={navItems} />);

    expect(baseElement).toMatchSnapshot();
  });
});
