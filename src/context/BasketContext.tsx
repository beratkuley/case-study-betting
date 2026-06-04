import { createContext, useCallback, useContext, useState } from "react";

import { BasketItem } from "@/components/Basket/types";

interface BasketContextType {
  selectedBets: BasketItem[];
  toggleBet: (item: BasketItem) => void;
  removeBet: (id: string) => void;
  isOpen: boolean;
  openBasket: () => void;
  closeBasket: () => void;
}

const BasketContext = createContext<BasketContextType | null>(null);

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedBets, setSelectedBets] = useState<BasketItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleBet = useCallback((currentItem: BasketItem) => {
    setSelectedBets((previousState) => {
      const exists = previousState.find((item) => item.id === currentItem.id);
      return exists
        ? previousState.filter((item) => item.id !== currentItem.id)
        : [...previousState, currentItem];
    });
  }, []);

  const removeBet = useCallback((id: string) => {
    setSelectedBets((previousState) => previousState.filter((item) => item.id !== id));
  }, []);

  const openBasket = useCallback(() => setIsOpen(true), []);
  const closeBasket = useCallback(() => setIsOpen(false), []);

  return (
    <BasketContext.Provider value={{ selectedBets, toggleBet, removeBet, isOpen, openBasket, closeBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error("useBasket must be used within BasketProvider");
  return ctx;
};
