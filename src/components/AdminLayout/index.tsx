import React, { useState } from 'react';
import NextHead from 'next/head';
import { useTheme } from '@material-ui/styles';
import { useMediaQuery, Theme } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { config } from '@app/config';
import { NavItem, GET_CURRENT_USER_QUERY, User } from '@app/core';
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
