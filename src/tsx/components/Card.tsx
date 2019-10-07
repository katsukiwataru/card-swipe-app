import React from 'react';
import { Cards, Card } from 'react-swipe-card';

const Wrapper: React.FC = () => {
  const CustomAlertLeft = () => (
    <span>
      <h1>aaa</h1>
    </span>
  );

  return (
    <Cards alertLeft={<CustomAlertLeft />} onEnd={() => {}}>
      <Card></Card>
    </Cards>
  );
};

export default Wrapper;
