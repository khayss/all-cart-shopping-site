import { useContext } from "react";
import { ProductContext } from "../../contexts/productContext";
import HomeCard from "./components/HomeCard";
import { useAddToCart } from "../../hooks/useAddToCart";
import { CircularProgress } from "@mui/material";
import HomeError from "../../error";

const LandingPage = () => {
  const { products, isFetching, isError } = useContext(ProductContext);
  const { handleAddToCart } = useAddToCart();
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
          {products &&
            Array.isArray(products) &&
            products
              ?.slice(1, 4)
              .reverse()
              .map((product) => (
                <HomeCard
                  key={product.id}
                  header={product.title}
                  src={product.thumbnail}
                  inCart={product.inCart}
                  to={`/product/${product.id}`}
                  onClick={() => handleAddToCart(product)}
                  withButton={true}
                />
              ))}
        </div>
      </div>
      <div className="border-t-2 border-gray-200 h-auto">
        <h2 className="text-xl font-medium py-2">Popular Brands</h2>
        <div className="grid grid-cols-1 gap-y-2 md:gap-y-0 md:gap-x-2 md:grid-cols-2 lg:grid-cols-3 h-auto">
          {products &&
            Array.isArray(products) &&
            products
              ?.slice()
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((product) => (
                <HomeCard
                  key={product.id}
                  header={product.brand}
                  src={product.images[1]}
                  inCart={product.inCart}
                  to={""}
                />
              ))}
        </div>
      </div>
      <div className="border-t-2 border-gray-200">
        <h2 className="text-xl font-medium py-2">Featured Categories</h2>
        <div className="grid grid-cols-1 gap-y-2 md:gap-y-0 md:gap-x-2 md:grid-cols-2 lg:grid-cols-3 h-auto">
          {products &&
            Array.isArray(products) &&
            products
              .slice()
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((product) => (
                <HomeCard
                  key={product.id}
                  header={product.category}
                  src={product.images[2]}
                  inCart={product.inCart}
                  to={""}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;