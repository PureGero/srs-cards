import { useEffect, useState } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import AppLogo from './AppLogo';
import ClickButton from './ClickButton';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

const auth = firebase.auth();

const authUiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return unregisterAuthObserver;
  }, []);

  if (isSignedIn === null) {
    return (
      <AppContainer>
        <AppHeader>
          <AppLogo src={logo} alt="logo" />
          <p>Loading...</p>
        </AppHeader>
      </AppContainer>
    );
  }

  if (!isSignedIn) {
    return (
      <AppContainer>
        <AppHeader>
          <h1>SRS Cards</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={authUiConfig} firebaseAuth={auth} />
        </AppHeader>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <AppHeader>
        <p>Welcome {auth.currentUser && auth.currentUser.displayName}! You are now signed-in!</p>
        <button onClick={() => auth.signOut()}>Sign-out</button>
        <AppLogo src={logo} alt="logo" />
        <ClickButton />
      </AppHeader>
    </AppContainer>
  );
}

export default App;
