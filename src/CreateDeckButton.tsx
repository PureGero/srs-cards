import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const Button = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
`;

const CreateDeckButton = () => {
  const db = firebase.firestore();
  const history = useHistory();

  const [message, setMessage] = useState('Create new deck +');
  
  const createNewDeck = async () => {
    try {
      setMessage('Creating deck...');

      // Create deck in global environment
      const deckDoc = await db.collection('decks').add({
        uid: firebase.auth().currentUser?.uid,
        name: `${firebase.auth().currentUser?.displayName}'s deck`,
        created: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Create reference to deck in the user's collection
      await db.collection('users').doc(firebase.auth().currentUser?.uid).collection('decks').doc(deckDoc.id).set({
        joined: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Redirect to the deck
      history.push(`/deck/${deckDoc.id}`);
    } catch (e) {
      console.error(e);
      setMessage('Error: ' + e);
    }
  };

  return (
    <Button onClick={() => createNewDeck()}>{message}</Button>
  );
}

export default CreateDeckButton;