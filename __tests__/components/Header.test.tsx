import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '@app/components';
import { NavItem } from '@app/core';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';

describe('components/Header', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const navItems: NavItem[] = [
      {
        id: 'home',
        url: '/',
        name: 'Home',
      },
      {
        id: 'about',
        url: '/about',
        name: 'About',
      },
      {
        id: 'noLink',
        name: 'No Link',
      },
    ];

    const { baseElement } = render(
      <TestBaseComponent>
        <Header onSidebarOpen={() => {}} navItems={navItems} />
      </TestBaseComponent>,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
