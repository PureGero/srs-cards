import React from 'react';
import { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import styled from 'styled-components';
import AppLogo from './AppLogo';
import Deck from './Deck';
import DeckList from './DeckList';
import { StyledFirebaseAuth } from 'react-firebaseui';

import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
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

  // Loading auth state
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

  // Not signed in state
  if (!isSignedIn) {
    return (
      <AppContainer>
        <AppHeader>
          <h1>SRS Tester</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={authUiConfig} firebaseAuth={auth} />
        </AppHeader>
      </AppContainer>
    );
  }

  // Signed in
  return (
    <AppContainer>
      <AppHeader>
        <BrowserRouter>
          <Switch>
            <Route path="/deck/:deckId" component={Deck} />
            <Route path="/" component={DeckList} />
          </Switch>
        </BrowserRouter>
      </AppHeader>
    </AppContainer>
  );
}

export default App;
