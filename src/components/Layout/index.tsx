import React, { useState } from 'react';
import NextHead from 'next/head';
import { config } from '@app/config';
import { Header } from '@app/components/Header';
import { Sidebar } from '@app/components/Sidebar';
import { Footer } from '@app/components/Footer';
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
      link: '/',
      text: 'Home',
    },
    {
      link: '/about',
      text: 'About',
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
      <Sidebar onClose={handleSidebarClose} open={openSidebar} variant={'temporary'} navItems={navItems} />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </>
  );
};