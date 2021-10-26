import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const Button = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
`;

const Warning = styled.div`
  color: #ff7777;
`;

const DeckList = () => {
  const myDecks = firebase.firestore().collection('users').doc(firebase.auth().currentUser?.uid).collection('decks');

  const [decks, setDecks] = useState<any[]>([]);

  useEffect(() => {
    console.log(`Subscribing to ${myDecks.path}`);

    const unsubscribeDecks = myDecks.onSnapshot(doc => {
      setDecks(doc.docs);
    });

    return unsubscribeDecks;
  }, []);

  return (
    <div>
      <h1>Welcome {firebase.auth().currentUser?.displayName}!</h1>
        <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
      <p>
        Your decks: {JSON.stringify(decks)}
      </p>
      <Warning>
        Limited to 20,000 clicks per day
      </Warning>
    </div>
  );
}

export default DeckList;