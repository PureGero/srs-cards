import React from 'react';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { StyledFirebaseAuth } from 'react-firebaseui';

import firebase from 'firebase/app';
import 'firebase/auth';

const SignIn = () => {
  const auth = firebase.auth();

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return unregisterAuthObserver;
  }, []);
  
  const authUiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ]
  };

  if (isSignedIn) {
    return <Redirect to={{ pathname: "/" }} />
  }

  return (
    <div>
      <h1>SRS Tester</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={authUiConfig} firebaseAuth={auth} />
    </div>
  );
}

export default SignIn;
