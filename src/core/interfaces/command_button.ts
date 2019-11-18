import { PropTypes } from '@material-ui/core';

export interface CommandButton {
  text: string;
  color?: PropTypes.Color;
  onClick: (() => void) | (() => Promise<void>);
}
