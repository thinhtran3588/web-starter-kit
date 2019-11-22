import { PickerDataItem, FieldType, FieldValueType } from '@app/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { GridSize } from '@material-ui/core/Grid';

export interface FieldInfo<T> extends Partial<Record<Breakpoint, boolean | GridSize>> {
  name: keyof T;
  label: string;
  placeholder?: string;
  /** default: "text" */
  type?: FieldType;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pickerDataSources?: PickerDataItem<any>[];
  isPassword?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  /** custom render, use setFieldValue to update field value */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customRender?: (params: { data: any; setFieldValue: (field: string, value: FieldValueType) => void }) => JSX.Element;
}
