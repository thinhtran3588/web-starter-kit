import React from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardDatePickerProps } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';

type Props = KeyboardDatePickerProps;

export const DatePicker = (props: Props): JSX.Element => {
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <KeyboardDatePicker {...props} />
    </MuiPickersUtilsProvider>
  );
};
