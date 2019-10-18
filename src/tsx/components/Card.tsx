import React, { useState } from 'react';
import Img from '../../img/orca.png';
import { useSprings, animated, interpolate, UseSpringProps, AnimatedValue } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const cards = [Img, Img, Img];

type DeckProps = {
  x: number;
  y: number;
  scale: number;
  rot: number;
  delay?: number;
};

type useSpringsOverride<T extends Object> = [
  AnimatedValue<T>[],
  (cb: (i: number) => Partial<UseSpringProps<T>> | undefined) => void,
];

const to = (i: number): DeckProps => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});

const from = (_: number): DeckProps => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

function App() {
  const [gone] = useState<Set<number>>(() => new Set());
  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })) as useSpringsOverride<DeckProps>;

  const bind = useDrag(({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2;
    const dir = xDir < 0 ? -1 : 1;

    if (!down && trigger) gone.add(index);

    set((i) => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
      const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

      const scale = 1;
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      };
    });

    //終わったあとの処理
    if (!down && gone.size === cards.length) {
      setTimeout(() => {
        gone.clear();
        set((i) => to(i));
      }, 600);
    }
  });

  return (
    <>
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
          />
        </animated.div>
      ))}
    </>
  );
}

export default App;
