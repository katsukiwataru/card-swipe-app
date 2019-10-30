import { createContext, useContext } from 'react';

export const CardsContext = createContext<User[]>([]);

export const useCardsContext = () => {
  return useContext(CardsContext);
};
