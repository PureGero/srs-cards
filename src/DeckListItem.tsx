import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const Button = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
`;

interface DeckListItemProps {
  key: string;
  deckId: string;
};

const DeckListItem = (props: DeckListItemProps) => {
  const db = firebase.firestore();
  const history = useHistory();

  const [name, setName] = useState('Loading...');

  useEffect(() => {
    const deck = db.collection('decks').doc(props.deckId);

    console.log(`Subscribing to ${deck.path}`);

    const unsubscribeDeck = deck.onSnapshot(doc => {
      setName(doc.data()?.name || 'Unnamed deck');
    }, console.error);

    return unsubscribeDeck;
  }, [props.deckId]);

  const openDeck = async () => {
    history.push(`/deck/${props.deckId}`);
  };

  return (
    <Button onClick={() => openDeck()}>{name} &gt;</Button>
  );
}

export default DeckListItem;