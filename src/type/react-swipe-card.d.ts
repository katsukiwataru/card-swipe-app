declare module 'react-swipe-card' {
  const Cards: React.ComponentClass<CardsProps>;
  export const Card: React.ComponentClass<CardProps>;
  interface CardsProps {
    className?: string;
    onEnd?: () => void;
    alertRight?: JSX.Element;
    alertLeft?: JSX.Element;
    alertTop?: JSX.Element;
    alertBottom?: JSX.Element;
  }

  interface CardProps {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeTop?: () => void;
    onSwipeBottom?: () => void;
  }
  export default Cards;
}
