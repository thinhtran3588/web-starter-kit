import { OffsetPaginationResult } from './offset_pagination_result';
import { SearchRecord } from './search_record';

export interface SearchResult {
  data: ({ isChecked: boolean } & SearchRecord)[];
  pagination: OffsetPaginationResult;
}
