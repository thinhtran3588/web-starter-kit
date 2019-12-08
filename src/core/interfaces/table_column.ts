import { FieldValueType } from './field_value_type';

export interface TableColumn {
  field: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  sortable?: boolean;
  format?: (value: FieldValueType) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customRender?: (data: Record<string, any>) => JSX.Element;
}
