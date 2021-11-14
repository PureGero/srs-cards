import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import DeckItem from './DeckItem';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Button = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #ff7777;
`;

interface DeckParams {
  deckId: string;
};

const Deck = () => {
  const { deckId } = useParams<DeckParams>();

  const cardsCollection = firebase.firestore().collection('decks').doc(deckId).collection('cards');

  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    console.log(`Subscribing to ${cardsCollection.path}`);

    const unsubscribeWords = cardsCollection.onSnapshot(doc => {
      setCards(doc.docs);
    }, console.error);

    return unsubscribeWords;
  }, [deckId]);

  let columnCount = cards.reduce((count, card) => {
    if (card.data().columns.length > count) {
      count = card.data().columns.length;
    }
    return count;
  }, 2);

  return (
    <div>
      <Link to="/">&lt; View your decks</Link>
      <h1>Deck: {deckId}</h1>
      { 
        cards.map(card => (
          <DeckItem key={card.id} deckId={deckId} cardId={card.id} columns={card.data().columns}/>
        ))
      }
      <p/>
      <small>Create a new row:</small>
      <DeckItem deckId={deckId} columns={new Array(columnCount).fill('')}/>
    </div>
  );
}

export default Deck;