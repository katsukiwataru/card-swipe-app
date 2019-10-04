import React from 'react';
import { Cards, Card } from 'react-swipe-card';

const Wrapper: React.FC = () => {
  return (
    <Cards onEnd={() => {}}>
      <Card></Card>
    </Cards>
  );
};

export default Wrapper;
