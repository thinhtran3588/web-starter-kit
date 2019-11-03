import React, { useState } from 'react';
import NextHead from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import { config } from '@app/config';
import { NavItem, GET_CURRENT_USER_QUERY, User } from '@app/core';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';
import { SidebarMenu } from '../SidebarMenu';
import { useStyles } from './styles';

interface Props {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout = ({ children, title = config.siteName, description = '' }: Props): JSX.Element => {
  const navItems: NavItem[] = [
    {
      id: 'home',
      link: '/',
      text: 'Home',
      icon: 'Home',
    },
    {
      id: 'blogs',
      link: '/blogs',
      text: 'Blogs',
      icon: 'MenuBook',
    },
    {
      id: 'about',
      link: '/about',
      text: 'About',
      icon: 'Info',
    },
  ];

  const loginNavItems: NavItem[] = [
    {
      id: 'login',
      link: '/login',
      text: 'Log In',
      icon: 'Login',
    },
    {
      id: 'register',
      link: '/register',
      text: 'Register',
      icon: 'Register',
    },
  ];

  const classes = useStyles();
  const [openSidebar, setOpenSidebar] = useState(false);

  const { data } = useQuery(GET_CURRENT_USER_QUERY);
  const user = data ? (data.currentUser as User) : undefined;

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
      <Header onSidebarOpen={handleSidebarOpen} navItems={navItems} loginNavItems={loginNavItems} user={user} />
      <Sidebar onClose={handleSidebarClose} open={openSidebar} variant={'temporary'}>
        <SidebarMenu navItems={navItems} loginNavItems={loginNavItems} user={user} />
      </Sidebar>
      <div className={classes.container}>
        <main className={classes.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
};
