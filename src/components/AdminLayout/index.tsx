import React, { useEffect } from 'react';
import NextHead from 'next/head';
import { useTheme } from '@material-ui/styles';
import { useMediaQuery, Theme } from '@material-ui/core';
import { config } from '@app/config';
import { NavItem, GET_CURRENT_USER_QUERY, AuthUser, initApolloClient } from '@app/core';
import { useImmer } from 'use-immer';
import { AdminFooter } from '../AdminFooter';
import { SidebarMenu } from '../SidebarMenu';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
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
      expanded: true,
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
      expanded: true,
    },
  ];
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

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
      <Header onSidebarOpen={handleSidebarOpen} navItems={[]} user={user} />
      <Sidebar
        onClose={handleSidebarClose}
        open={isDesktop ? true : openSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      >
        <SidebarMenu navItems={navItems} user={user} />
        <AdminFooter />
      </Sidebar>
      <div className={classes.container}>
        <main className={classes.main}>{children}</main>
      </div>
    </>
  );
};
