import React from 'react';
import { animated, interpolate } from 'react-spring';
import { ReactEventHandlers } from 'react-use-gesture/dist/types';
import styled from 'styled-components';

export type DeckProps = {
  x: number;
  y: number;
  scale: number;
  rot: number;
  delay?: number;
};

type Props = {
  deckList: DeckProps[];
  bind: (i: number) => ReactEventHandlers;
  cards: User[];
};

const Card: React.FC<Props> = ({ deckList, bind, cards }) => {
  return (
    <>
      {deckList.map(({ x, y, rot, scale }, i) => (
        <animated.div
          key={i}
          className="swipeArea"
          style={{
            transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
          }}
        >
          <animated.div
            {...bind(i)}
            className="cardArea"
            style={{
              transform: interpolate(
                [rot, scale],
                (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`,
              ),
              backgroundImage: `url(${cards[i].profileImageUrl})`,
            }}
          >
            <UserName>{cards[i].id}</UserName>
          </animated.div>
        </animated.div>
      ))}
    </>
  );
};

const UserName = styled.h1`
  word-wrap: break-word;
  margin: 30px 30px;
`;

export default Card;
