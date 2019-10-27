import React from 'react';
import { AppBar, Toolbar, Hidden, Badge, Button, IconButton } from '@material-ui/core';
import { NavItem } from '@app/core';
import { Icon, Link, LanguageMenu } from '@app/components';
import { config } from '@app/config';
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
        <Link href={navItem.link} key={`${navItem.link}${navItem.text}`} className={classes.menuItem}>
          {renderNavItem(navItem)}
        </Link>
      );
    }
    return renderNavItem(navItem);
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Link href='/' title='Home'>
          <img className={classes.logo} alt='Logo' src={`${config.storageLocation.static}/images/logo.svg`} />
        </Link>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <div>{navItems.map(renderLinkNavItem)}</div>
        </Hidden>
        <LanguageMenu />
        <IconButton color='inherit' aria-label='notification'>
          <Badge badgeContent={notifications.length} color='primary' variant='dot'>
            <Icon name='Notifications' />
          </Badge>
        </IconButton>
        <IconButton color='inherit' aria-label='logout'>
          <Icon name='Input' />
        </IconButton>
        <Hidden mdUp>
          <IconButton color='inherit' onClick={onSidebarOpen} data-testid='menu-icon' aria-label='menu'>
            <Icon name='Menu' />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
