import { IconButton as MuiIconButton } from '@material-ui/core';
import { IconButtonProps as MuiIconButtonProps } from '@material-ui/core/IconButton';

export const IconButton = MuiIconButton;
export type IconButtonProps = MuiIconButtonProps & {
  customColor?: string;
};
