import { AggregatePermission } from './aggregate_permission';

export type PermissionTree = { [aggregateName: string]: AggregatePermission };
