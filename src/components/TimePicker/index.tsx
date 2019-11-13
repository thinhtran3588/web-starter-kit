import React from 'react';
import { KeyboardTimePicker, MuiPickersUtilsProvider, KeyboardTimePickerProps } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';

type Props = KeyboardTimePickerProps;

export const TimePicker = (props: Props): JSX.Element => {
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <KeyboardTimePicker {...props} />
    </MuiPickersUtilsProvider>
  );
};
