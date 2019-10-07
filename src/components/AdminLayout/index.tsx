import React, { useState } from 'react';
import NextHead from 'next/head';
import { useTheme } from '@material-ui/styles';
import { useMediaQuery, Theme } from '@material-ui/core';
import { config } from '@app/config';
import { Header } from '@app/components/Header';
import { Sidebar } from '@app/components/Sidebar';
import { Footer } from '@app/components/Footer';
import { SidebarMenu } from '@app/components/SidebarMenu';
import { NavItem } from '@app/core';
import { useStyles } from './styles';

interface Props {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const AdminLayout = ({ children, title = config.siteName, description = '' }: Props): JSX.Element => {
  const navItems: NavItem[] = [
    {
      id: 'auth',
      text: 'Auth',
      icon: 'Security',
      children: [
        {
          id: 'users',
          text: 'Users',
          link: '/admin/users',
          icon: 'Person',
        },
        {
          id: 'roles',
          text: 'Roles',
          link: '/admin/roles',
          icon: 'Group',
        },
      ],
    },
    {
      id: 'publicWebsite',
      text: 'Public Website',
      icon: 'Language',
      children: [
        {
          id: 'blogs',
          text: 'Blogs',
          link: '/admin/blogs',
          icon: 'MenuBook',
        },
      ],
    },
  ];
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = (): void => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = (): void => {
    setOpenSidebar(false);
  };

  return (
    <>
      <NextHead>
        <title>{title}</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
        <meta name='Description' content={description}></meta>
      </NextHead>
      <Header onSidebarOpen={handleSidebarOpen} navItems={[]} />
      <Sidebar
        onClose={handleSidebarClose}
        open={isDesktop ? true : openSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      >
        <SidebarMenu navItems={navItems} />
      </Sidebar>
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </>
  );
};
