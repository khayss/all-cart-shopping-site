import { useContext } from "react";
import { SetCartContext } from "../contexts/cartContext";
import { ProductContext } from "../contexts/productContext";

export const useAddToCart = () => {
  const { setCart } = useContext(SetCartContext);
  const { setProducts } = useContext(ProductContext);
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const isFound = prev.findIndex((item) => item.id === product.id);
      if (isFound < 0) {
        return [...prev, { ...product, quantity: 1, inCart: true }];
      }
      return prev.filter((item) => item.id !== product.id);
    });
    setProducts((prev) =>
      prev?.map((item) => {
        if (item.id === product.id) {
          return { ...item, inCart: !item.inCart };
        }
        return item;
      })
    );
  };

  return { handleAddToCart };
};
