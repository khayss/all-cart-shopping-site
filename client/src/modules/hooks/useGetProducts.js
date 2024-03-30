import { useEffect, useState } from "react";
import { getProductsApi } from "../api";

export const useGetProducts = () => {
  const [products, setProducts] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isFetching, setisFetching] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const fetchProduct = async () => {
      try {
        setisFetching(true);
        setIsError(false);
        const response = await getProductsApi();
        if (response) {
          if (response.status === 200 && response.data) {
            setIsError(false);
            setProducts(response.data.products);
          } else {
            throw new Error("server returned  an error");
          }
        } else {
          throw new Error("error getting product");
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setisFetching(false);
      }
    };
    fetchProduct();

    return () => {
      controller.abort();
    };
  }, []);

  return { products, isError, isFetching };
};
