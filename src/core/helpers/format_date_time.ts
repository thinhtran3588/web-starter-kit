import dayjs from 'dayjs';
import { config } from '@app/config';
import { FieldValueType } from '../interfaces';

export const formatDateTime = (value: FieldValueType): string => {
  if (!value) {
    return '';
  }
  return dayjs(value as string | number).format(config.dateTimeFormat);
};
