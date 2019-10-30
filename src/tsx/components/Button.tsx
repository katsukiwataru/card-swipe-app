import React from 'react';
import styled from 'styled-components';

type Props = {
  onClickRight: () => void;
  onClickLeft: () => void;
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<Props> = ({ onClickRight, onClickLeft, onMouseDown, onMouseUp }) => {
  return (
    <>
      <ButtonsStyle>
        <ButtonStyleNope onClick={onClickLeft} onMouseDown={onMouseDown} onMouseUp={onMouseUp} >
          NOPE
        </ButtonStyleNope>
        <ButtonStyleLike onClick={onClickRight} onMouseDown={onMouseDown} onMouseUp={onMouseUp} >
          LIKE
        </ButtonStyleLike>
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
  width: 80px;
  height: 80px;
  border: none;
  margin: 20px;
  border-radius: 50%;
  outline: none;
`;

const ButtonStyleNope = styled(ButtonStyle)`
  color: #c33;
`;

const ButtonStyleLike = styled(ButtonStyle)`
  color: #3b7;
`;

export default Button;
