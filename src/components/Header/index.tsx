import React from 'react';
import clsx from 'clsx';
import { NavItem, AuthUser, resetStore, withTranslation, WithTranslation } from '@app/core';
import { config } from '@app/config';
import { authService, navigationService } from '@app/services';
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
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import 'firebase/auth';
import 'lazysizes';

typeof document !== 'undefined' &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document.addEventListener('lazybeforeunveil', (e: any) => {
    const bg = e.target.getAttribute('data-bg');
    if (bg) {
      // eslint-disable-next-line no-param-reassign
      e.target.style.backgroundImage = `url(${bg})`;
    }
  });

interface Props extends WithTranslation {
  user?: AuthUser;
  navItems: NavItem[];
  loginNavItems?: NavItem[];
  onSidebarOpen: () => void;
}

const BaseHeader = (props: Props): JSX.Element => {
  const { onSidebarOpen, navItems, loginNavItems, user, t } = props;
  const classes = useStyles();
  const notifications = [{}, {}];

  const renderNavItem = (navItem: NavItem): JSX.Element => (
    <Button color='inherit' variant='text' className={classes.menuItemButton} key={`${navItem.link}${navItem.text}`}>
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

  const [anchorEl, setAnchorEl] = React.useState<undefined | HTMLElement>(undefined);

  const openUserMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const closeUserMenu = (): void => {
    setAnchorEl(undefined);
  };

  const logout = (): void => {
    authService.logout();
    resetStore();
    navigationService.navigateTo({
      url: '/',
    });
  };

  const navigateToProfile = (): void => {
    navigationService.navigateTo({
      url: '/profile',
    });
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Link href='/' title='Home'>
          <img
            className={clsx(classes.logo, 'lazyload')}
            alt='Logo'
            data-src={`${config.storageLocation.static}/images/logo.svg`}
          />
        </Link>
        <div className={classes.flexGrow} />
        <Hidden smDown implementation='css'>
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
            <Button onClick={openUserMenu} variant='text'>
              <Typography variant='subtitle2' className={classes.displayName}>
                {user.displayName}
              </Typography>
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeUserMenu}>
              <MenuItem onClick={navigateToProfile}>{t('profile')}</MenuItem>
              <MenuItem onClick={logout}>{t('logout')}</MenuItem>
            </Menu>
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

export const Header = withTranslation('common')(BaseHeader);
