/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer, initialCartState } from "../utils/cartReducer";
import { getLocalCart } from "../utils/cartLocalStorage";
import { ProductContext } from "./productContext";

export const CartContext = createContext(null);
export const CartDispatchContext = createContext(null);

const CartProvider = ({ children }) => {
  const { products } = useContext(ProductContext);
  const localCart = getLocalCart();
  const [cartState, cartDispatch] = useReducer(
    cartReducer,
    localCart ? localCart : initialCartState
  );
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem("userCart", JSON.stringify(cartState));
    const calculateTotal = (cart) => {
      const amounts = cart.id.map(
        (item) => +cart.items[item].quantity * +cart.items[item].price
      );
      return amounts.reduce((acc, curr) => +acc + +curr, 0);
    };
    setTotalAmount(() => calculateTotal(cartState));
    return () => {};
  }, [cartState]);
  useEffect(() => {
    const referenceProduct = products?.slice();
    cartState.id.map((itemId) => {
      const inProducts = referenceProduct?.findIndex(
        (prod) => prod.id === itemId
      );
      if (inProducts < 0)
        cartDispatch({ type: "REMOVE_FROM_CART", payload: itemId });
    });
  }, [products, cartState]);

  return (
    <CartContext.Provider value={{ cartState, totalAmount }}>
      <CartDispatchContext.Provider value={{ cartDispatch }}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;
