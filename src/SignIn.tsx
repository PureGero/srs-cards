import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';

import firebase from 'firebase/app';
import 'firebase/auth';

const SignIn = () => {
  const auth = firebase.auth();
  
  const authUiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ]
  };

  return (
    <div>
      <h1>SRS Tester</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={authUiConfig} firebaseAuth={auth} />
    </div>
  );
}

export default SignIn;
