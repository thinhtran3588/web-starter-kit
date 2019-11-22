import { showNotification } from './show_notification';
import { ErrorWithCode } from '../interfaces';

export const handleError = (
  error: ErrorWithCode,
  matchedCodes?: { [code: string]: string },
  ignoreCodes?: { [code: string]: true },
): void => {
  if (error.message.indexOf('Network error') > -1) {
    showNotification({
      type: 'ERROR',
      message: error.message,
    });
    return;
  }
  if (!error.code) {
    throw error;
  }
  if (ignoreCodes && ignoreCodes[error.code]) {
    return;
  }
  let { message } = error;
  if (matchedCodes && matchedCodes[error.code]) {
    message = matchedCodes[error.code];
  }
  !!message &&
    showNotification({
      type: 'ERROR',
      message,
    });
};
