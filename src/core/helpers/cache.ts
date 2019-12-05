// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cacheStorage: Record<string, any> = {};

const get = <T>(key: string): T => {
  return cacheStorage[key];
};

const clear = (key: string): void => {
  delete cacheStorage[key];
};

const expire = (key: string, time: number): void => {
  setTimeout(() => {
    clear(key);
  }, time);
};

const set = <T>(key: string, value: T, expireTime?: number): void => {
  cacheStorage[key] = value;
  if (expireTime !== undefined) {
    expire(key, expireTime);
  }
};

export const cache = {
  get,
  set,
  clear,
  expire,
};
