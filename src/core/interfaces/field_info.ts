import { PickerDataItem, FieldType } from '@app/core';

export interface FieldInfo {
  name: string;
  text: string;
  type?: FieldType; // default = text
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pickerDataSources?: PickerDataItem<any>[];
}
