import { ValidatePermissions } from '../interfaces';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getUpdatedData = <T>(
  oldData: T,
  newData: T,
  validatePermissions?: ValidatePermissions,
  aggreateName?: string,
  action?: string,
): T | undefined => {
  const result: any = {};
  let isUpdated = false;
  Object.keys(newData).forEach((key) => {
    if ((oldData as any)[key] === (newData as any)[key]) {
      return;
    }
    if (!validatePermissions || !aggreateName || !action || !validatePermissions(aggreateName, action, key)) {
      return;
    }
    result[key] = (newData as any)[key];
    isUpdated = true;
  });
  return isUpdated ? result : undefined;
};
