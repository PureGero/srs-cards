import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/firestore';

const DeckItemContainer = styled.div`
  
`;

const DeckInput = styled.input`
  
`;

const AddCardButton = styled.button`
  
`;

interface DeckItemProps {
  key?: string;
  deckId: string;
  cardId?: string;
  columns: string[];
};

const timeoutIds: { [key: string]: NodeJS.Timeout } = {};
const requestSave = (cardDoc: firebase.firestore.DocumentReference, originalColumns: string[], columns: string[]) => {
  if (timeoutIds[cardDoc.path]) {
    clearTimeout(timeoutIds[cardDoc.path]);
  }

  timeoutIds[cardDoc.path] = setTimeout(async () => {
    if (JSON.stringify(originalColumns) != JSON.stringify(columns)) {
      console.log('Updating card ' + cardDoc.path + ' to ' + columns);
      await cardDoc.update({ columns });
    }
  }, 2000);
}

const DeckItem = (props: DeckItemProps) => {
  const cardCollection = firebase.firestore().collection('decks').doc(props.deckId).collection('cards');
  const cardDoc = props.cardId ? cardCollection.doc(props.cardId) : null;

  // [[column, setColumn], ...]
  // const stateTemp = props.columns.map(column => useState<string>(column));

  // const columns = stateTemp.map(stateColumn => stateColumn[0]);
  // const setColumns = stateTemp.map(stateColumn => stateColumn[1]);

  const [ columns, setColumns ] = useState<string[]>(props.columns);

  useEffect(() => {
    if (cardDoc) {
      requestSave(cardDoc, props.columns, columns);
    }
  }, [ columns ]);

  useEffect(() => {
    setColumns(props.columns);
  }, [ props.columns ]);

  const onInputChange = (value: string, index: number) => {
    const cols = JSON.parse(JSON.stringify(columns));
    cols[index] = value;
    setColumns(cols);
  };

  const addCard = async () => {
    await cardCollection.add({ columns });
  };

  return (
    <DeckItemContainer>
      {
        columns.map((column, index) => (
          <DeckInput key={index} value={column} onChange={e => onInputChange(e.target.value, index)}/>
        ))
      }
      <br/>
      {
        props.cardId ? null :
          <AddCardButton onClick={addCard}>Add card</AddCardButton>
      }
    </DeckItemContainer>
  );
}

export default DeckItem;