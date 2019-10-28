import React from 'react';
import styled from 'styled-components';

type Props = {
  onClickRight: () => void;
  onClickLeft: () => void;
};

const Button: React.FC<Props> = ({ onClickRight, onClickLeft }) => {
  return (
    <>
      <ButtonsStyle>
        <ButtonStyleNope onClick={onClickLeft}>NOPE</ButtonStyleNope>
        <ButtonStyleLike onClick={onClickRight}>LIKE</ButtonStyleLike>
      </ButtonsStyle>
    </>
  );
};

const ButtonsStyle = styled.div`
  position: absolute;
  z-index: 1;
  bottom: -30px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonStyle = styled.button`
  width: 100px;
  height: 100px;
  border: none;
  margin: 10px;
  border-radius: 50%;
`;

const ButtonStyleNope = styled(ButtonStyle)`
  color: #c33;
`;

const ButtonStyleLike = styled(ButtonStyle)`
  color: #3b7;
`;

export default Button;
