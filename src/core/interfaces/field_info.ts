import { PickerDataItem, FieldType } from '@app/core';

export interface FieldInfo<T> {
  name: keyof T;
  label: string;
  type?: FieldType; // default = text
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pickerDataSources?: PickerDataItem<any>[];
  isPassword?: boolean;
  disabled?: boolean;
}
