/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useGetProducts } from "../hooks/useGetProducts";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const { isError, isFetching, products } = useGetProducts();

  return (
    <ProductContext.Provider value={{ isError, isFetching, products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
