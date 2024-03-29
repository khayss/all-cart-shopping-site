/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);
export const SetCartContext = createContext(null);

const localCart = JSON.parse(localStorage.getItem("userCart"));
const initalCart = Array.isArray(localCart) ? localCart : [];

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initalCart);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    localStorage.setItem("userCart", JSON.stringify(cart));
    const calculateTotal = (items) => {
      const amounts = items.map((item) => +item.quantity * +item.price);
      return amounts.reduce((acc, curr) => +acc + +curr, 0);
    };
    setTotalAmount(() => calculateTotal(cart));
    return () => {};
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, itemsCount: cart.length, totalAmount }}
    >
      <SetCartContext.Provider value={{ setCart }}>
        {children}
      </SetCartContext.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;
