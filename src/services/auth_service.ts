import firebase, { auth } from 'firebase/app';
import { AuthUser, LoginType, AppError, initApolloClient, sleep } from '@app/core';
import { config } from '@app/config';
import { gql } from 'apollo-boost';

const FACEBOOK_PROVIDER_ID = 'facebook.com';
const GOOGLE_PROVIDER_ID = 'google.com';
const PHONE_PROVIDER_ID = 'phone';

const verifyRegistration = async (user: firebase.User): Promise<string> => {
  let tokenResult = await user.getIdTokenResult(true);
  if (!tokenResult.claims.id) {
    const token = await user.getIdToken();
    await initApolloClient().mutate({
      variables: {
        token,
      },
      mutation: gql`
        mutation registerWithToken($token: String!) {
          users {
            registerWithToken(payload: { token: $token }) {
              id
            }
          }
        }
      `,
    });
    do {
      // eslint-disable-next-line no-await-in-loop
      tokenResult = await user.getIdTokenResult(true);
      // eslint-disable-next-line no-await-in-loop
      await sleep(1000);
    } while (!tokenResult.claims.id);
  }
  return tokenResult.claims.id;
};

const getUser = async (user: firebase.User): Promise<AuthUser> => {
  const id = await verifyRegistration(user);
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
      displayName = user.phoneNumber as string;
    } else if (loginType === 'EMAIL') {
      displayName = user.email as string;
    }
  }
  return {
    id,
    displayName,
    avatarUrl: avatarUrl || '',
    email: user.email || '',
    emailVerified: user.emailVerified,
    loginType,
  };
};

const login = async (
  provider: firebase.auth.AuthProvider,
  language: string = config.i18n.defaultLang,
): Promise<AuthUser> => {
  firebase.auth().languageCode = language;
  const { user } = await auth().signInWithPopup(provider);
  if (!user) {
    throw new AppError('auth/user-not-found', 'User not found');
  }
  return getUser(user);
};

const loginFacebook = async (language: string = config.i18n.defaultLang): Promise<AuthUser> => {
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

const loginGoogle = async (language: string = config.i18n.defaultLang): Promise<AuthUser> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  provider.setCustomParameters({
    display: 'popup',
  });
  return login(provider, language);
};

const createUserWithEmailAndPassword = async (
  email: string,
  password: string,
  language: string = config.i18n.defaultLang,
): Promise<AuthUser> => {
  auth().languageCode = language;
  const { user } = await auth().createUserWithEmailAndPassword(email, password);
  if (!user) {
    throw new AppError('auth/user-not-found', 'User not found');
  }
  await user.sendEmailVerification();
  return getUser(user);
};

const signInWithEmailAndPassword = async (email: string, password: string): Promise<AuthUser> => {
  const { user } = await auth().signInWithEmailAndPassword(email, password);
  if (!user) {
    throw new AppError('auth/user-not-found', 'User not found');
  }
  return getUser(user);
};

const signInWithUsernameAndPassword = async (username: string, password: string): Promise<AuthUser> => {
  const { data, errors } = await initApolloClient().mutate({
    variables: {
      username,
      password,
    },
    mutation: gql`
      mutation loginWithUsername($username: String!, $password: String!) {
        users {
          loginWithUsername(payload: { username: $username, password: $password }) {
            customToken
          }
        }
      }
    `,
  });
  if (errors) {
    throw new AppError('auth/user-not-found', 'User not found');
  }
  const { customToken } = data.users.loginWithUsername;
  const { user } = await auth().signInWithCustomToken(customToken);
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
  const { currentUser } = auth();
  if (!currentUser) {
    return false;
  }
  await currentUser.reload();
  return currentUser.emailVerified;
};

const getCurrentUser = async (): Promise<AuthUser | undefined> => {
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

const verifySmsCode = async (confirmationResult: auth.ConfirmationResult, code: string): Promise<AuthUser> => {
  const credential = await confirmationResult.confirm(code);
  if (!credential.user) {
    throw new AppError('auth/user-not-found', 'User not found');
  }
  return getUser(credential.user);
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
  signInWithUsernameAndPassword,
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
