import { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Button = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
`;

const Warning = styled.div`
  color: #ff7777;
`;

const ClickButton = () => {
  const db = firebase.firestore();
  const counter = db.collection('counts').doc('counter');
  const myCounter = db.collection('user_counts').doc(firebase.auth().currentUser?.uid);

  const [count, setCount] = useState(0);
  const [myCount, setMyCount] = useState(0);
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const unsubscribeCounter = counter.onSnapshot(doc => {
      const data = doc.data();
      setMessage('');
      if (!data) {
        counter.set({});
      } else {
        setCount(data.value);
      }
    });

    (async () => {
      try {
        await counter.get();
      } catch (e) {
        setMessage('Today\'s clicking limit has been reached, come back tomorrow!');
      }
    })();

    return unsubscribeCounter;
  });

  useEffect(() => {
    const unsubscribeMyCounter = myCounter.onSnapshot(doc => {
      const data = doc.data();
      if (!data) {
        myCounter.set({});
      } else {
        setMyCount(data.value);
      }
    });

    return unsubscribeMyCounter;
  });

  const increment = async () => {
    try {
      await Promise.all([
        counter.update({
          value: firebase.firestore.FieldValue.increment(1)
        }),
        myCounter.update({
          value: firebase.firestore.FieldValue.increment(1)
        })
      ]);
    } catch (e) {
      setMessage('Today\'s clicking limit has been reached, come back tomorrow!');
      throw e;
    }
  };

  return (
    <div>
      <p>
        Your clicks: {myCount}
      </p>
      <Button onClick={() => increment()}>
        {message ? message : `Clicks: ${count}`}
      </Button>
      <Warning>
        Limited to 20,000 clicks per day
      </Warning>
    </div>
  );
}

export default ClickButton;