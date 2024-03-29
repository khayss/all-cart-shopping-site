/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { CartContext } from "./cartContext";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const { isError, isFetching, products, setProducts } = useGetProducts();
  const { cart } = useContext(CartContext);

  useEffect(() => {
    setProducts((prev) =>
      prev?.map((item) => {
        const itemInCart = cart?.find((cartItem) => cartItem.id == item.id);
        if (itemInCart) {
          return itemInCart;
        }
        return item;
      })
    );

    return () => {};
  }, [cart, setProducts]);

  return (
    <ProductContext.Provider
      value={{ setProducts, isError, isFetching, products }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
