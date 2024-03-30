import { useContext } from "react";
import Product from "./components/Product";
import { ProductContext } from "../../contexts/productContext";
import { CircularProgress } from "@mui/material";
import ShopError from "../../error";
import { CartContext, CartDispatchContext } from "../../contexts/cartContext";

const Shop = () => {
  const { products = [], isError, isFetching } = useContext(ProductContext);
  const { cartDispatch } = useContext(CartDispatchContext);
  const { cartState } = useContext(CartContext);

  return isFetching ? (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <CircularProgress />
      <h1>Loading...</h1>
    </div>
  ) : isError ? (
    <ShopError
      errorMessage={"Ooops...error displaying items"}
      action={""}
      buttonText={"Reload"}
    />
  ) : (
    <div className="flex flex-col w-full items-center justify-center">
      <h1 className="text-xl font-semibold text-center py-4">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full items-center">
        {products &&
          Array.isArray(products) &&
          products.map((product) => (
            <div key={product.id} className="w-full px-2 h-full py-4">
              <Product
                thumbnail={product.thumbnail}
                title={product.title}
                discountPercentage={product.discountPercentage}
                price={product.price}
                rating={product.rating}
                stock={product.stock}
                id={product.id}
                inCart={!!cartState.items[product.id]}
                onClick={() =>
                  cartDispatch({ type: "ADD_TO_CART", payload: product })
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shop;
