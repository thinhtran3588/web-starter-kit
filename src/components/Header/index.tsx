import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Hidden, Badge, Button, IconButton } from '@material-ui/core';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Input as InputIcon } from '@material-ui/icons';
import { NavItem } from '@app/core';
import { Icon } from '@app/components/Icon';
import { useStyles } from './styles';

interface Props {
  navItems: NavItem[];
  onSidebarOpen: () => void;
}

export const Header = ({ onSidebarOpen, navItems }: Props): JSX.Element => {
  const classes = useStyles();

  const notifications = [{}, {}];

  const renderNavItem = (navItem: NavItem): JSX.Element => (
    <Button color='inherit' className={classes.menuItemButton} key={`${navItem.link}${navItem.text}`}>
      {navItem.icon && <Icon name={navItem.icon} />}
      <span className={classes.menuItemText}>{navItem.text}</span>
    </Button>
  );

  const renderLinkNavItem = (navItem: NavItem): JSX.Element => {
    if (navItem.link) {
      return (
        <Link href={navItem.link} key={`${navItem.link}${navItem.text}`}>
          <a href={navItem.link} className={classes.menuItem}>
            {renderNavItem(navItem)}
          </a>
        </Link>
      );
    }
    return renderNavItem(navItem);
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Link href='/'>
          <img className={classes.logo} alt='Logo' src='/static/images/logo.svg' />
        </Link>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <div>{navItems.map(renderLinkNavItem)}</div>
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
