import React from 'react';
// import {
//   useSprings,
//   animated,
//   interpolate,
//   UseSpringProps,
//   AnimatedValue
// } from "react-spring";

import { useSpring, animated } from 'react-spring';
import Img from '../../img/orca.png';

interface Props {}

const Card: React.FC<Props> = () => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const cards: string[] = [Img, Img, Img];

  return (
    <div>
      <img src={cards[1]} alt="" />
      <animated.h1 style={props}>hello</animated.h1>
    </div>
  );
};

export default Card;
