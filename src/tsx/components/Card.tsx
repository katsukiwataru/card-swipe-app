import React, { useState } from 'react';
import Img from '../../img/orca.png';
import { useSprings, animated, interpolate, UseSpringProps, AnimatedValue } from 'react-spring';
import { useDrag } from 'react-use-gesture';

// type Props = {
//   updateParentState(): void;
// };

type DeckProps = {
  x: number;
  y: number;
  scale: number;
  rot: number;
  delay?: number;
};

type useSpringsOverride<T extends Object> = [
  AnimatedValue<T>[],
  (callback: (i: number) => Partial<UseSpringProps<T>> | undefined) => void,
];

const to = (i: number): DeckProps => ({
  x: 0,
  y: i * -4,
  // y: 0,
  scale: 1,
  rot: 0,
  delay: 0,
});

const from = (_: number): DeckProps => ({ x: 0, rot: 0, scale: 1, y: 0 });

const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const App: React.FC = () => {
  const cards = [Img, Img, Img];
  const [length, setLength] = useState(cards.length);
  const [gone] = useState<Set<number>>(() => new Set());
  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })) as useSpringsOverride<DeckProps>;
  // console.log('props', props);
  const bind = useDrag(({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
    animation({ index, down, xDelta, xDir, velocity });
    // console.log(velocity);
    // if (!down && gone.size === cards.length) {
    //   setTimeout(() => {
    //     gone.clear();
    //     set((i) => to(i));
    //   }, 600);
    // }
  });
  const handleClick = () => {
    if (length <= 0) {
      return;
    }
    console.log('aaa');
    animation({
      index: length - 1,
      down: false,
      xDelta: 100,
      xDir: 1,
      velocity: 0.3,
    });
    setLength(length - 1);
    // if (length === 0) {
    //   setLength(cards.length - 1);
    // }
    // } else {
    //   setLength(length - 1);
    // }
  };

  const animation = ({ index, down, xDelta, xDir, velocity }: any) => {
    const trigger = velocity > 0.2;
    const dir = xDir < 0 ? -1 : 1;
    if (!down && trigger) {
      gone.add(index);
      // console.log({ args: [index], down, delta: [xDelta], direction: [xDir], velocity });
    }
    set((i) => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
      const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
      const scale = down ? 1.1 : 1;
      console.log(gone, 'isGone', isGone, 'x', x, 'rot', rot, 'scale', scale);
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      };
    });
  };

  return (
    <>
      <button onClick={handleClick}>aaa</button>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div
          key={i}
          style={{
            transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
          }}
        >
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
            }}
          >
            <h1>hoge</h1>
          </animated.div>
        </animated.div>
      ))}
    </>
  );
};

export default App;
