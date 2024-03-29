/* eslint-disable react/prop-types */
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../../utils/formatNumber";
const Product = ({
  thumbnail,
  title,
  discountPercentage,
  price,
  rating,
  stock,
  onClick,
  id,
  inCart,
}) => {
  return (
    <div
      className={`${
        parseInt(stock) > 0 ? "" : "opacity-50"
      } border-2 border-gray-100 rounded-lg overflow-hidden flex flex-col items-center w-full`}
    >
      <Link
        to={`/product/${id}`}
        className={`${
          parseInt(stock) > 0 ? "" : "opacity-50"
        } border-2 border-gray-100 rounded-lg overflow-hidden flex flex-col items-center w-full`}
      >
        <div className="w-full flex justify-center h-52 relative">
          <img className="object-cover w-full" src={thumbnail} />
          <div
            className={`absolute top-2 left-2 ${
              parseInt(stock) > 0 ? "bg-green-400" : "bg-red-400 text-white"
            } rounded-full px-2`}
          >
            <p>{parseInt(stock) > 0 ? "In Stock" : "Out of Stock"}</p>
          </div>
        </div>
        <div className="w-full px-4 mt-2">
          <Rating value={parseFloat(rating)} precision={0.1} readOnly />
        </div>
        <div className="w-full">
          <div className="px-4">
            <h4 className="font-medium">{title}</h4>
          </div>
          <div className="px-4 my-1">
            <p className="italic text-sm">{discountPercentage}% off</p>
            <p className="flex flex-col items-start xl:items-center xl:flex-row xl:gap-x-2">
              <span className="text-md font-medium line-through">
                $
                {numberWithCommas(
                  +price + (+price * +discountPercentage) / 100
                )}
              </span>
              <span className="text-xl font-semibold">
                ${numberWithCommas(+price)}
              </span>
            </p>
          </div>
        </div>
      </Link>
      <div className="w-full">
        <button
          className={`bg-gray-200 p-3 font-medium w-full mt-1 hover:bg-gray-400 ${
            inCart ? "text-red-400" : null
          }`}
          onClick={onClick}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default Product;
