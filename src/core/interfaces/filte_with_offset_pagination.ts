import { Filter } from './filter';

export type FilterWithOffsetPagination = Filter & {
  pageIndex: number;
  itemsPerPage: number;
};
