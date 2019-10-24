import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import { config } from '@app/config';

import('firebase/auth');
export function withFirebase<P>(PageComponent: React.ComponentType<P>): React.ComponentType<P> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WithFirebase = (props: any): any => {
    useEffect(() => {
      firebase.apps.length === 0 && firebase.initializeApp(config.firebaseConfig);
    }, []);
    return (
      <>
        <PageComponent {...props} />
      </>
    );
  };
  return WithFirebase;
}
