import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import CreateDeckButton from './CreateDeckButton';
import DeckListItem from './DeckListItem';

const Button = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #ff7777;
`;

const DeckList = () => {
  const myDecks = firebase.firestore().collection('users').doc(firebase.auth().currentUser?.uid).collection('decks');

  const [decks, setDecks] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(`Subscribing to ${myDecks.path}`);

    const unsubscribeDecks = myDecks.onSnapshot(doc => {
      setDecks(doc.docs);
    }, error => {
      console.error(error);
      if (error.code == 'resource-exhausted') {
        setMessage('The free-tier quota has been exceeded.');
      } else {
        setMessage(error.message);
      }
    });

    return unsubscribeDecks;
  }, []);

  return (
    <div>
      <h1>Welcome {firebase.auth().currentUser?.displayName}!</h1>
      <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
      <ErrorMessage>
        { message ? message : '' }
      </ErrorMessage>
      <CreateDeckButton />
      {decks.map(deck => 
        <DeckListItem key={deck.id} deckId={deck.id} />
      )}
    </div>
  );
}

export default DeckList;