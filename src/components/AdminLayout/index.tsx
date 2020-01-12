import React from 'react';
import NextHead from 'next/head';
import { useTheme } from '@material-ui/styles';
import { useMediaQuery, Theme } from '@material-ui/core';
import { config } from '@app/config';
import { NavItem, GET_CURRENT_USER_QUERY, AuthUser, UserMenuItem } from '@app/core';
import { useImmer } from 'use-immer';
import { useQuery } from '@apollo/react-hooks';
import { AdminFooter } from '../AdminFooter';
import { SidebarMenu } from '../SidebarMenu';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { useStyles } from './styles';

interface Props {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  userMenuItems: UserMenuItem[];
}

export const AdminLayout = (props: Props): JSX.Element => {
  const { children, title = config.siteName, description = '', userMenuItems } = props;
  const navItems: NavItem[] = userMenuItems.map(
    (item) =>
      ({
        ...item,
        expanded: true,
      } as NavItem),
  );
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

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
