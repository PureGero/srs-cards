import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

const ErrorMessage = styled.div`
  color: #ff7777;
`;

interface DeckParams {
  deckId: string;
};

const DeckList = () => {
  const { deckId } = useParams<DeckParams>();

  return (
    <div>
      <h1>Deck: {deckId}</h1>
      <Link to="/">View your decks</Link>
    </div>
  );
}

export default DeckList;