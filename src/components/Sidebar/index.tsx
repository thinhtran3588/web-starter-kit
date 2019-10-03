import React from 'react';
import Link from 'next/link';
import { Drawer, List, ListItem, Button } from '@material-ui/core';
import { NavItem } from '@app/core';
import { useStyles } from './styles';

interface Props {
  onClose: () => void;
  open: boolean;
  variant: 'permanent' | 'persistent' | 'temporary' | undefined;
  navItems: NavItem[];
}

export const Sidebar = ({ onClose, open, variant, navItems }: Props): JSX.Element => {
  const classes = useStyles();

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
        {navItems.map((navItem) => (
          <ListItem className={classes.item} disableGutters key={navItem.link}>
            <Link href={navItem.link} key={navItem.link}>
              <Button className={classes.button}>
                <a href={navItem.link} className={classes.link}>
                  {navItem.text}
                </a>
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
