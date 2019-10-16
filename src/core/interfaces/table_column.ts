export interface TableColumn {
  field: string | string[];
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customRender?: (data: Record<string, any>) => JSX.Element;
}
