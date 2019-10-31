import firebase, { auth } from 'firebase/app';
import { User, LoginType, AppError } from '@app/core';
import { config } from '@app/config';

interface LoginResultSuccess {
  isSuccessful: true;
  user: User;
}

interface LoginResultFail {
  isSuccessful: false;
  isCancelled: boolean;
  errorMessage: string;
}

export type LoginResult = LoginResultSuccess | LoginResultFail;

const FACEBOOK_PROVIDER_ID = 'facebook.com';
const GOOGLE_PROVIDER_ID = 'google.com';
const PHONE_PROVIDER_ID = 'phone';

// if (typeof window !== 'undefined') {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
//     size: 'normal',
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
//     callback: (_response: any) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//       // ...
//     },
//     'expired-callback': () => {
//       // Response expired. Ask user to solve reCAPTCHA again.
//       // ...
//     },
//   });
// }

const getUser = (user: firebase.User): User => {
  const avatarUrl =
    user.photoURL && user.photoURL.indexOf('facebook') > -1 ? `${user.photoURL}?height=500` : user.photoURL;
  let loginType: LoginType = 'EMAIL';
  if (!user.providerData || user.providerData.length === 0) {
    loginType = 'EMAIL';
  } else if (user.providerData[0] && user.providerData[0].providerId === FACEBOOK_PROVIDER_ID) {
    loginType = 'FACEBOOK';
  } else if (user.providerData[0] && user.providerData[0].providerId === GOOGLE_PROVIDER_ID) {
    loginType = 'GOOGLE';
  } else if (user.providerData[0] && user.providerData[0].providerId === PHONE_PROVIDER_ID) {
    loginType = 'PHONE_NO';
  } else {
    loginType = 'EMAIL';
  }
  let displayName = user.displayName || undefined;
  if (!displayName) {
    if (loginType === 'PHONE_NO') {
      displayName = (user.phoneNumber as unknown) as string;
    } else if (loginType === 'EMAIL') {
      displayName = (user.email as unknown) as string;
    }
  }
  return {
    id: user.uid,
    displayName,
    avatarUrl: avatarUrl || undefined,
    isLoggedIn: true,
    email: user.email || undefined,
    emailVerified: user.emailVerified,
    loginType,
  };
};

const login = async (
  provider: firebase.auth.AuthProvider,
  language: string = config.i18n.defaultLang,
): Promise<LoginResult> => {
  firebase.auth().languageCode = language;
  const result = await auth().signInWithPopup(provider);
  if (!result.user) {
    return {
      isSuccessful: false,
      isCancelled: true,
      errorMessage: '',
    };
  }
  return {
    user: getUser(result.user),
    isSuccessful: true,
  };
};

const loginFacebook = async (language: string = config.i18n.defaultLang): Promise<LoginResult> => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  provider.addScope('email');
  provider.setCustomParameters({
    display: 'popup',
    // eslint-disable-next-line @typescript-eslint/camelcase
    login_hint: 'user@example.com',
  });
  return login(provider, language);
};

const loginGoogle = async (language: string = config.i18n.defaultLang): Promise<LoginResult> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    display: 'popup',
  });
  return login(provider, language);
};

const createUserWithEmailAndPassword = async (
  email: string,
  password: string,
  language: string = config.i18n.defaultLang,
): Promise<User> => {
  auth().languageCode = language;
  const { user } = await auth().createUserWithEmailAndPassword(email, password);
  if (!user) {
    throw new AppError('auth/user-not-found', 'User not found');
  }
  await user.updateProfile({
    displayName: email,
  });
  await user.reload();
  await user.sendEmailVerification();
  return getUser(user);
};

const signInWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  const { user } = await auth().signInWithEmailAndPassword(email, password);
  if (!user) {
    throw new AppError('auth/user-not-found', 'User not found');
  }
  return getUser(user);
};

const isEmailRegistered = async (email: string): Promise<boolean> => {
  try {
    await auth().signInWithEmailAndPassword(email, ' ');
  } catch (error) {
    if (!error.code) {
      throw error;
    }
    if (error.code !== 'auth/user-not-found') {
      return true;
    }
  }
  return false;
};

const isEmailVerified = async (): Promise<boolean> => {
  const currentUser = await auth().currentUser;
  if (!currentUser) {
    return false;
  }
  await currentUser.reload();
  return currentUser.emailVerified;
};

const getCurrentUser = (): User | undefined => {
  const { currentUser } = auth();
  return currentUser ? getUser(currentUser) : undefined;
};

const logout = async (): Promise<void> => {
  const user = auth().currentUser;
  if (!user) {
    return;
  }
  await auth().signOut();
};

const resendVerificationEmail = async (language: string = config.i18n.defaultLang): Promise<void> => {
  const user = auth().currentUser;
  if (user) {
    auth().languageCode = language;
    user && (await user.sendEmailVerification());
  }
};

const changePassword = async (newPassword: string): Promise<void> => {
  const user = auth().currentUser;
  user && (await user.updatePassword(newPassword));
};

const sendSmsVerification = async (
  phoneNo: string,
  language: string = config.i18n.defaultLang,
): Promise<auth.ConfirmationResult> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appVerifier = (window as any).recaptchaVerifier;
  auth().languageCode = language;
  return auth().signInWithPhoneNumber(phoneNo, appVerifier);
};

const verifySmsCode = async (confirmationResult: auth.ConfirmationResult, code: string): Promise<User | undefined> => {
  const credential = await confirmationResult.confirm(code);
  return credential && credential.user ? getUser(credential.user) : undefined;
};

const sendPasswordResetEmail = async (email: string, language: string = config.i18n.defaultLang): Promise<void> => {
  auth().languageCode = language;
  await auth().sendPasswordResetEmail(email);
};

export const authService = {
  loginFacebook,
  loginGoogle,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  isEmailRegistered,
  isEmailVerified,
  getCurrentUser,
  logout,
  resendVerificationEmail,
  changePassword,
  sendSmsVerification,
  verifySmsCode,
  sendPasswordResetEmail,
  getUser,
};
