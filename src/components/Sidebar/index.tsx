import React from 'react';
import { Drawer } from '@material-ui/core';
import { useStyles } from './styles';

interface Props {
  onClose: () => void;
  open: boolean;
  variant: 'permanent' | 'persistent' | 'temporary' | undefined;
  children?: React.ReactNode;
}

export const Sidebar = ({ onClose, open, variant, children }: Props): JSX.Element => {
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
      {children}
    </Drawer>
  );
};
