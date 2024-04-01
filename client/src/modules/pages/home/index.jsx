import { useContext, useMemo } from "react";
import { ProductContext } from "../../contexts/productContext";
import HomeCard from "./components/HomeCard";
import { CircularProgress } from "@mui/material";
import HomeError from "../../error";
import { CartContext, CartDispatchContext } from "../../contexts/cartContext";

const LandingPage = () => {
  const { products, isFetching, isError } = useContext(ProductContext);
  const { cartDispatch } = useContext(CartDispatchContext);
  const { cartState } = useContext(CartContext);

  const randomProducts = (products) => {
    return (
      products &&
      Array.isArray(products) &&
      products
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
    );
  };
  const PopularBrands = useMemo(() => randomProducts(products), [products]);
  const featuredProducts = useMemo(() => randomProducts(products), [products]);
  const trendingCategories = useMemo(
    () => randomProducts(products),
    [products]
  );

  return isFetching && products === null ? (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <CircularProgress />
      <h1>Loading...</h1>
    </div>
  ) : isError ? (
    <HomeError
      errorMessage={"an error occurred...please reload"}
      buttonText="Reload"
      action={""}
    />
  ) : (
    <div className="flex flex-col gap-4 px-4 pb-4 h-auto">
      <h1 className="italic text-2xl text-center py-1">
        Shop online without hassle...
      </h1>
      <div className="border-t-2 border-gray-200 h-auto">
        <h2 className="text-xl font-medium py-2">Featured Items</h2>
        <div className="grid grid-cols-1 gap-y-2 md:gap-y-0 md:gap-x-2 md:grid-cols-2 lg:grid-cols-3 h-auto">
          {featuredProducts?.map((product) => (
            <HomeCard
              key={product.id}
              header={product.title}
              src={product.thumbnail}
              inCart={!!cartState.items[product.id]}
              to={`/product/${product.id}`}
              onClick={() => {
                cartDispatch({ type: "ADD_TO_CART", payload: product });
              }}
              withButton={true}
            />
          ))}
        </div>
      </div>
      <div className="border-t-2 border-gray-200 h-auto">
        <h2 className="text-xl font-medium py-2">Popular Brands</h2>
        <div className="grid grid-cols-1 gap-y-2 md:gap-y-0 md:gap-x-2 md:grid-cols-2 lg:grid-cols-3 h-auto">
          {PopularBrands?.map((product) => (
            <HomeCard
              key={product.id}
              header={product.brand}
              src={product.images[1]}
              to={""}
            />
          ))}
        </div>
      </div>
      <div className="border-t-2 border-gray-200">
        <h2 className="text-xl font-medium py-2">Featured Categories</h2>
        <div className="grid grid-cols-1 gap-y-2 md:gap-y-0 md:gap-x-2 md:grid-cols-2 lg:grid-cols-3 h-auto">
          {trendingCategories?.map((product) => (
            <HomeCard
              key={product.id}
              header={product.category}
              src={product.images[2]}
              to={""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
