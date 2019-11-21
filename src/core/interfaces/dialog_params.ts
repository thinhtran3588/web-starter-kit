export interface DialogParams<T> {
  open: boolean;
  mode: 'create' | 'update';
  data?: T | undefined;
}
