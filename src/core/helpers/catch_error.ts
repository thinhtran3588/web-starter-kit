/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleError } from './handle_error';

export const catchError = <T>(
  action: T,
  setIsBusy?: (f: (draft: boolean) => boolean | void) => void,
  matchedCodes?: { [code: string]: string },
  ignoreCodes?: { [code: string]: true },
): T => {
  return ((async (...params: any[]): Promise<any> => {
    try {
      setIsBusy && setIsBusy(() => true);
      return await (action as any)(...(params as any));
    } catch (error) {
      handleError(error, matchedCodes, ignoreCodes);
    } finally {
      setIsBusy && setIsBusy(() => false);
    }
    return undefined;
  }) as unknown) as T;
};
