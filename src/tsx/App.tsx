import React from 'react';
import Card from './containers/Card';
import Img from '../img/orca.png';

interface Props {}

const App: React.FC<Props> = () => {
  const cards = [Img, Img, Img];
  return (
    <>
      <Card cards={cards}></Card>
    </>
  );
};

export default App;
