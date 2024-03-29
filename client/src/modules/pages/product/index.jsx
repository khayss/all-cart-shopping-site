import { useParams } from "react-router-dom";
import { useGetProduct } from "../../hooks/useGetProduct";
import { useEffect } from "react";
import { useAddToCart } from "../../hooks/useAddToCart";
import { CircularProgress, Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { numberWithCommas } from "../../utils/formatNumber";

const Product = () => {
  const { getProductById, product } = useGetProduct();
  const { handleAddToCart } = useAddToCart();
  const { id } = useParams();
  useEffect(() => {
    getProductById(id);
  }, [getProductById, id]);
  return product === null ? (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <CircularProgress />
      <h1>Loading...</h1>
    </div>
  ) : product ? (
    <div className="flex flex-col w-full h-full px-4 md:px-[25%]">
      <h2 className="text-xl font-medium px-4 py-2  ">{product?.title}</h2>
      <div className="w-full h-48 px-4 flex items-center justify-center">
        <img src={product?.images[0]} className="object-cover w-full h-full" />
      </div>
      <div className="w-full px-4 mt-2">
        <Rating value={parseFloat(product?.rating)} precision={0.1} readOnly />
      </div>
      <p className="flex flex-col items-start xl:items-center xl:flex-row xl:gap-x-2 px-4">
        <span className="text-md font-medium line-through">
          $
          {numberWithCommas(
            +product?.price +
              (+product?.price * +product?.discountPercentage) / 100
          )}
        </span>
        <span className="text-xl font-semibold">
          ${numberWithCommas(+product?.price)}
        </span>
      </p>
      <div className="px-4 md:flex md:items-center md:gap-x-4">
        <h3 className="font-medium">{product?.brand}</h3>
        <div className="text-[0.5rem] hidden md:block">
          <CircleIcon fontSize="inherit" />
        </div>
        <p className="text-sm italic capitalize">{product?.category}</p>
      </div>
      <p className="px-4 text-sm">{product?.description}</p>
      <div className="px-4">
        <button
          className={`bg-gray-200 p-3 font-medium w-full mt-1 hover:bg-gray-400 ${
            product?.inCart ? "text-red-400" : null
          }`}
          onClick={() => handleAddToCart(product)}
        >
          {product?.inCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
      <div className="w-full px-4 flex flex-col gap-y-4 py-4">
        {product?.images.slice(1).map((image, index) => (
          <div
            key={index}
            className="w-full h-48 flex items-center justify-center"
          >
            <img src={image} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default Product;
