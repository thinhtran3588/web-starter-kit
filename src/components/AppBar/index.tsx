import React from 'react';
import { AppBar as MuiAppBar, useTheme, Theme } from '@material-ui/core';
import { AppBarProps as MuiAppBarProps } from '@material-ui/core/AppBar';
import { Color } from '@app/core';

export type AppBarProps = {
  color?: Color;
} & Omit<MuiAppBarProps, 'color'>;

export const AppBar = (props: AppBarProps): JSX.Element => {
  const { color: appBarColor, ...other } = props;
  const theme = useTheme<Theme>();
  const color = (appBarColor === 'error' ? 'primary' : appBarColor) || 'primary';
  const style =
    appBarColor === 'error'
      ? {
          backgroundColor: theme.palette.error.main,
        }
      : {};
  return <MuiAppBar {...other} color={color} style={style} />;
};
