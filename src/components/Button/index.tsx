import React from 'react';
import { Button as MuiButton, useTheme, Theme } from '@material-ui/core';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { Color } from '@app/core';

export type ButtonProps = {
  color?: Color;
} & Omit<MuiButtonProps, 'color'>;

export const Button = (props: ButtonProps): JSX.Element => {
  const { color: buttonColor, ...other } = props;
  const theme = useTheme<Theme>();
  const color = (buttonColor === 'error' ? 'primary' : buttonColor) || 'primary';
  const style =
    buttonColor === 'error'
      ? {
          backgroundColor: theme.palette.error.main,
        }
      : {};
  return <MuiButton {...other} color={color} style={style} variant={props.variant || 'contained'} />;
};
