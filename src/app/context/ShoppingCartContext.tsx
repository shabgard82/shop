"use client";
import { createContext, useContext, useState } from "react";

type ShoppingCartContextType = {
  children: React.ReactNode;
};

type cartItemType = {
  id: number;
  qty: number;
};

type TshoppingCartType = {
  cartItems: cartItemType[];
  handleAddBtn: (id: number) => void;
};

const ShoppingCardContext = createContext({} as TshoppingCartType);

export const useShoppingCartContext = () => {
  return useContext(ShoppingCardContext);
};

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextType) {
  const [cartItems, setCartItems] = useState<cartItemType[]>([]);

  const handleAddBtn = (id: number) => {
    setCartItems((currentItem) => {
      const isNotProductExists =
        currentItem.find((item) => item.id == id) == null; //is not product exsist === true

      if (isNotProductExists) {
        return [...currentItem, { id: id, qty: 1 }];
      } else {
        return currentItem?.map((item) => {
          if (item.id == id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  return (
    <ShoppingCardContext.Provider value={{ cartItems, handleAddBtn }}>
      {children}
    </ShoppingCardContext.Provider>
  );
}
