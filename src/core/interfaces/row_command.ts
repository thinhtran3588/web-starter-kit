export interface RowCommand {
  icon: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hidden?: (data: Record<string, any>) => boolean;
  color?: string;
  disabled?: boolean;
}
