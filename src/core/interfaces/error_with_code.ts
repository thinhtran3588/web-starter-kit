export interface ErrorWithCode extends Error {
  code?: string;
  message: string;
}
