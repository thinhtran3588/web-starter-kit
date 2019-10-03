import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Hidden, Badge, IconButton } from '@material-ui/core';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Input as InputIcon } from '@material-ui/icons';
import { NavItem } from '@app/core';
import { useStyles } from './styles';

interface Props {
  navItems: NavItem[];
  onSidebarOpen: () => void;
}

export const Header = ({ onSidebarOpen, navItems }: Props): JSX.Element => {
  const classes = useStyles();

  const notifications = [{}, {}];

  const renderNavItem = (navItem: NavItem): JSX.Element => (
    <Link href={navItem.link} key={navItem.link}>
      <a className={classes.menuItem}>{navItem.text}</a>
    </Link>
  );

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Link href='/'>
          <img className={classes.logo} alt='Logo' src='/static/images/logo.svg' />
        </Link>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <div>{navItems.map(renderNavItem)}</div>
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
    </AppBar>
  );
};
