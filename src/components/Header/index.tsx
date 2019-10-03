import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Hidden, Badge, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { useStyles } from './styles';

interface Props {
  onSidebarOpen: () => void;
}

interface MenuItem {
  link: string;
  text: string;
}

export const Header = ({ onSidebarOpen }: Props): JSX.Element => {
  const classes = useStyles();
  const menuItems: MenuItem[] = [
    {
      link: '/',
      text: 'Home',
    },
    {
      link: '/about',
      text: 'About',
    },
  ];
  const notifications = [{}, {}];

  const renderMenuItem = (menuItem: MenuItem): JSX.Element => (
    <Link href={menuItem.link} key={menuItem.link}>
      <a className={classes.menuItem}>{menuItem.text}</a>
    </Link>
  );

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Link href='/'>
          <img className={'logo'} alt='Logo' src='/static/images/logo.svg' />
        </Link>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <div>{menuItems.map(renderMenuItem)}</div>
        </Hidden>
        <IconButton color='inherit' aria-label='notification'>
          <Badge badgeContent={notifications.length} color='primary' variant='dot'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color='inherit' aria-label='logout'>
          <InputIcon />
        </IconButton>
        <Hidden mdUp>
          <IconButton color='inherit' onClick={onSidebarOpen} data-testid='menu-icon' aria-label='menu'>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <style jsx>{`
        .logo {
          height: 50px;
        }
      `}</style>
    </AppBar>
  );
};
