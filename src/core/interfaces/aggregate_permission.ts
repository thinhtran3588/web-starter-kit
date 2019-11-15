export type AggregatePermission = {
  viewAny?: Record<string, 0 | 1>;
  viewOwn?: Record<string, 0 | 1>;
  create?: Record<string, 0 | 1>;
  updateAny?: Record<string, 0 | 1>;
  updateOwn?: Record<string, 0 | 1>;
  deleteAny?: Record<string, 0 | 1>;
  deleteOwn?: Record<string, 0 | 1>;
};
