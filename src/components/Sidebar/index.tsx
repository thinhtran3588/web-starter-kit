import React from 'react';
import Link from 'next/link';
import { Drawer, List, ListItem, Button } from '@material-ui/core';
import { useStyles } from './styles';

interface Props {
  onClose: () => void;
  open: boolean;
  variant: 'permanent' | 'persistent' | 'temporary' | undefined;
}

interface MenuItem {
  link: string;
  text: string;
}

export const Sidebar = ({ onClose, open, variant }: Props): JSX.Element => {
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

  return (
    <Drawer
      anchor='left'
      classes={{
        paper: classes.drawer,
      }}
      onClose={onClose}
      open={open}
      variant={variant}
      data-testid='sidebar'
    >
      <List className={classes.list}>
        {menuItems.map((menuItem) => (
          <ListItem className={classes.item} disableGutters key={menuItem.link}>
            <Link href={menuItem.link} key={menuItem.link}>
              <Button className={classes.button}>
                <a href={menuItem.link} className={classes.link}>
                  {menuItem.text}
                </a>
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
