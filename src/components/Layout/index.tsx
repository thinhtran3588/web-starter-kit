import React from 'react';
import NextHead from 'next/head';
import { config } from '@app/config';
import { NavItem, GET_CURRENT_USER_QUERY, AuthUser, withTranslation, WithTranslation } from '@app/core';
import { useImmer } from 'use-immer';
import { useQuery } from '@apollo/react-hooks';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';
import { SidebarMenu } from '../SidebarMenu';
import { useStyles } from './styles';

interface Props extends WithTranslation {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

const BaseLayout = (props: Props): JSX.Element => {
  const { children, title = config.siteName, description = '', t } = props;
  const navItems: NavItem[] = [
    {
      id: 'home',
      url: '/',
      name: t('home'),
      icon: 'Home',
    },
    {
      id: 'blogs',
      url: '/blogs',
      name: t('blogs'),
      icon: 'MenuBook',
    },
    {
      id: 'aboutUs',
      url: '/aboutUs',
      name: t('aboutUs'),
      icon: 'Info',
    },
  ];

  const loginNavItems: NavItem[] = [
    {
      id: 'login',
      url: '/login',
      name: t('login'),
      icon: 'Login',
    },
    {
      id: 'register',
      url: '/register',
      name: t('register'),
      icon: 'Register',
    },
  ];

  const classes = useStyles();
  const [openSidebar, setOpenSidebar] = useImmer(false);
  const { data: userData } = useQuery(GET_CURRENT_USER_QUERY);
  const user: AuthUser | undefined = userData ? userData.currentUser : undefined;

  const handleSidebarOpen = (): void => {
    setOpenSidebar(() => true);
  };

  const handleSidebarClose = (): void => {
    setOpenSidebar(() => false);
  };

  return (
    <>
      <NextHead>
        <title>{title}</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
        <meta name='Description' content={description || title}></meta>
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

export const Layout = withTranslation('common')(BaseLayout);
