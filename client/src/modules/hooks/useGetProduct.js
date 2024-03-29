import { useContext, useState } from "react";
import { ProductContext } from "../contexts/productContext";

export const useGetProduct = () => {
  const { products } = useContext(ProductContext);
  const [product, setProduct] = useState(null);

  const getProductById = (id) => {
    const productsCopy = products?.slice();
    const item = productsCopy?.find((item) => item.id == id);
    if (item) {
      setProduct(item);
    } else {
      setProduct(null);
    }
  };
  return { product, getProductById };
};
