import dayjs from 'dayjs';
import { config } from '@app/config';
import { FieldValueType } from '../interfaces';

export const formatDateTime = (value: FieldValueType): string => {
  if (!value) {
    return '';
  }
  return dayjs.unix(parseFloat((value as string).substring(0, 10))).format(config.dateTimeFormat);
};
