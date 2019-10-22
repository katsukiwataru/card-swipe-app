import React from 'react';

type Props = {
  onClickRight: () => void;
  onClickLeft: () => void;
};

const Button: React.FC<Props> = ({ onClickRight, onClickLeft }) => {
  return (
    <>
      <button onClick={onClickLeft}>NOPE</button>
      <button onClick={onClickRight}>LIKE</button>
    </>
  );
};

export default Button;
