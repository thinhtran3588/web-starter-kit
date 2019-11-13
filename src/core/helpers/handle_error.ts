import { showNotification } from './show_notification';
import { ErrorWithCode } from '../interfaces';

export const handleError = (
  error: ErrorWithCode,
  matchedCodes: { [code: string]: string },
  ignoreCodes?: { [code: string]: true },
): void => {
  if (!error.code) {
    throw error;
  }
  if (ignoreCodes && ignoreCodes[error.code]) {
    return;
  }
  const message = matchedCodes[error.code] || error.message;
  !!message &&
    showNotification({
      type: 'ERROR',
      message,
    });
};
