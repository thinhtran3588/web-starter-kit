import defaultConfig from './default_config';
import overrideConfig from './override_config';

const regexConfig = {
  regex: {
    username: /^[a-z0-9]{5,15}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/,
    email: /^[a-z][a-z0-9_.]{0,40}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/,
    phone: /^[0-9]{8,}$/,
  },
};

export const config = Object.freeze({
  ...defaultConfig,
  ...overrideConfig,
  ...regexConfig,
});
