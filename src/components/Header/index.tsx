import React from 'react';
import { NavItem, User, resetStore } from '@app/core';
import { config } from '@app/config';
import { authService } from '@app/services';
import { Icon } from '../Icon';
import { Link } from '../Link';
import { LanguageSelection } from '../LanguageSelection';
import { Button } from '../Button';
import { NoSsr } from '../NoSsr';
import { Typography } from '../Typography';
import { AppBar } from '../AppBar';
import { Toolbar } from '../Toolbar';
import { Hidden } from '../Hidden';
import { Badge } from '../Badge';
import { IconButton } from '../IconButton';
import { useStyles } from './styles';

interface Props {
  user?: User;
  navItems: NavItem[];
  loginNavItems?: NavItem[];
  onSidebarOpen: () => void;
}

export const Header = (props: Props): JSX.Element => {
  const { onSidebarOpen, navItems, loginNavItems, user } = props;
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
            {!user && <NoSsr>{!!loginNavItems && loginNavItems.map(renderLinkNavItem)}</NoSsr>}
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
