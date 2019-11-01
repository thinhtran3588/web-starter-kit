import React from 'react';
import { AppBar, Toolbar, Hidden, Badge, Button, IconButton, NoSsr, Typography } from '@material-ui/core';
import { NavItem, User, resetStore } from '@app/core';
import { Icon, Link, LanguageSelection } from '@app/components';
import { config } from '@app/config';
import { authService } from '@app/services';
import { useStyles } from './styles';

interface Props {
  user?: User;
  navItems: NavItem[];
  onSidebarOpen: () => void;
}

export const Header = (props: Props): JSX.Element => {
  const { onSidebarOpen, navItems, user } = props;
  const classes = useStyles();
  const notifications = [{}, {}];
  const loginNavItems: NavItem[] = [
    {
      id: 'login',
      link: '/login',
      text: 'Log In',
      icon: 'Login',
    },
    {
      id: 'register',
      link: '/register',
      text: 'Register',
      icon: 'Register',
    },
  ];

  const renderNavItem = (navItem: NavItem): JSX.Element => (
    <Button color='inherit' className={classes.menuItemButton} key={`${navItem.link}${navItem.text}`}>
      {navItem.icon && <Icon name={navItem.icon} />}
      <span className={classes.menuItemText}>{navItem.text}</span>
    </Button>
  );

  const renderLinkNavItem = (navItem: NavItem): JSX.Element => {
    if (navItem.link) {
      return (
        <Link href={navItem.link} key={`${navItem.link}${navItem.text}`} className={classes.menuItem}>
          {renderNavItem(navItem)}
        </Link>
      );
    }
    return renderNavItem(navItem);
  };

  const logout = (): void => {
    authService.logout();
    resetStore();
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Link href='/' title='Home'>
          <img className={classes.logo} alt='Logo' src={`${config.storageLocation.static}/images/logo.svg`} />
        </Link>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <div>
            {navItems.map(renderLinkNavItem)}
            {!user && <NoSsr>{loginNavItems.map(renderLinkNavItem)}</NoSsr>}
          </div>
        </Hidden>
        <LanguageSelection />
        <IconButton color='inherit' aria-label='notification'>
          <Badge badgeContent={notifications.length} color='primary' variant='dot'>
            <Icon name='Notifications' />
          </Badge>
        </IconButton>
        {user && (
          <NoSsr>
            <Typography variant='subtitle2'>{user.displayName}</Typography>
            <IconButton color='inherit' aria-label='logout' onClick={logout}>
              <Icon name='Input' />
            </IconButton>
          </NoSsr>
        )}
        <Hidden mdUp>
          <IconButton color='inherit' onClick={onSidebarOpen} data-testid='menu-icon' aria-label='menu'>
            <Icon name='Menu' />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
