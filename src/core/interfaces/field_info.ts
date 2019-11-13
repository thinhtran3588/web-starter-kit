import { PickerDataItem, FieldType } from '@app/core';

export interface FieldInfo<T> {
  name: keyof T;
  label: string;
  placeholder?: string;
  /** default = "text" */
  type?: FieldType;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pickerDataSources?: PickerDataItem<any>[];
  isPassword?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}
