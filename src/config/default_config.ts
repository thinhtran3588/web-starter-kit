export default {
  apiEndpoint: 'http://localhost:3001',
  author: 'Thinh Tran',
  copyRightYear: 2019,
  dateFormat: 'DD/MM/YYYY',
  dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
  debounceDelay: 300,
  defaultLanguage: 'en',
  languages: [
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'vi',
      name: 'Tiếng Việt',
    },
  ],
  rowsPerPageOptions: [10, 20, 50],
  signInOptions: ['email', 'phone', 'facebook', 'google'],
  siteName: 'Web Starter Kit',
  firebaseConfig: {
    apiKey: 'should_be_replaced',
    authDomain: 'should_be_replaced',
    databaseURL: 'should_be_replaced',
    projectId: 'should_be_replaced',
    storageBucket: 'should_be_replaced',
    messagingSenderId: 'should_be_replaced',
    appId: 'should_be_replaced',
    measurementId: 'should_be_replaced',
  },
  storageLocation: {
    base: '',
    static: '/static',
    public: '/public',
  },
};
