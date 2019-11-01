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

    const { baseElement } = render(
      <TestBaseComponent>
        <Header onSidebarOpen={() => {}} navItems={navItems} />
      </TestBaseComponent>,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
