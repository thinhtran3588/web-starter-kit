import React, { useState } from 'react';
import NextHead from 'next/head';
import { config } from '@app/config';
import { Header, Sidebar, Footer, SidebarMenu } from '@app/components';
import { NavItem } from '@app/core';
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

  const classes = useStyles();

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
      <Header onSidebarOpen={handleSidebarOpen} navItems={navItems} />
      <Sidebar onClose={handleSidebarClose} open={openSidebar} variant={'temporary'}>
        <SidebarMenu navItems={navItems} />
      </Sidebar>
      <div className={classes.container}>
        <main className={classes.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
};
