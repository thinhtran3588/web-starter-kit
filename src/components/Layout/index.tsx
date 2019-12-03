import React, { useEffect } from 'react';
import NextHead from 'next/head';
import { config } from '@app/config';
import {
  NavItem,
  GET_CURRENT_USER_QUERY,
  AuthUser,
  withTranslation,
  WithTranslation,
  initApolloClient,
} from '@app/core';
import { useImmer } from 'use-immer';
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
      link: '/',
      text: t('home'),
      icon: 'Home',
    },
    {
      id: 'blogs',
      link: '/blogs',
      text: t('blogs'),
      icon: 'MenuBook',
    },
    {
      id: 'aboutUs',
      link: '/aboutUs',
      text: t('aboutUs'),
      icon: 'Info',
    },
  ];

  const loginNavItems: NavItem[] = [
    {
      id: 'login',
      link: '/login',
      text: t('login'),
      icon: 'Login',
    },
    {
      id: 'register',
      link: '/register',
      text: t('register'),
      icon: 'Register',
    },
  ];

  const classes = useStyles();
  const [openSidebar, setOpenSidebar] = useImmer(false);
  const [user, setUser] = useImmer<AuthUser | undefined>(undefined);

  const handleSidebarOpen = (): void => {
    setOpenSidebar(() => true);
  };

  const handleSidebarClose = (): void => {
    setOpenSidebar(() => false);
  };

  useEffect(() => {
    (async () => {
      const { data, errors } = await initApolloClient().query({
        query: GET_CURRENT_USER_QUERY,
      });
      if (errors || !data || !data.currentUser || !data.currentUser.id) {
        return;
      }
      setUser(() => data.currentUser);
    })();
  }, []);

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
