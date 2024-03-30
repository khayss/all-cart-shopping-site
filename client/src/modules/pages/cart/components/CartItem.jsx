/* eslint-disable react/prop-types */
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
const CartItem = ({
  title,
  price,
  quantity,
  description,
  thumbnail,
  onAddBtnClick,
  onMinusBtnClick,
  totalPrice,
  onQuantityChange,
  onBlur,
  onDeleteBtnClick,
  productId,
}) => {
  return (
    <div className="grid grid-cols-7 grid-rows-3 gap-1 my-6 h-32">
      <Link
        to={`/product/${productId}`}
        className="flex items-center md:justify-start justify-center col-span-2 row-start-1 row-end-2 w-full rounded-sm overflow-hidden"
      >
        <img src={thumbnail} className="object-cover h-full w-full" />
      </Link>
      <Link
        to={`/product/${productId}`}
        className="w-full col-span-5 row-start-1 row-end-2"
      >
        <h3 className="font-medium truncate">{title}</h3>
        <p className="truncate text-sm">{description}</p>
      </Link>
      <p className="col-start-1 col-end-4 row-start-2 row-end-3 flex flex-col items-start">
        <span className="text-sm">Unit Price</span>
        <span className="font-medium">${price}</span>
      </p>
      <button
        onClick={onAddBtnClick}
        className="bg-gray-300 w-full rounded-md text-2xl hover:bg-gray-400 col-start-1 col-end-3 row-start-3 row-end-4"
      >
        +
      </button>
      <input
        type="number"
        value={quantity}
        onChange={onQuantityChange}
        onBlur={onBlur}
        className="w-full border-2 border-gray-200 rounded-md py-1 text-center col-start-3 col-end-5 row-start-3 row-end-4"
      />
      <button
        onClick={onMinusBtnClick}
        className="bg-gray-300 w-full rounded-md text-2xl hover:bg-gray-400 col-start-5 col-end-7 row-start-3 row-end-4"
      >
        -
      </button>
      <p className="col-start-4 col-end-8 row-start-2 row-end-3 flex flex-col items-end">
        <span className="text-sm">Total Price</span>
        <span className="font-medium">${totalPrice}</span>
      </p>
      <button
        onClick={onDeleteBtnClick}
        className="col-start-7 col-end-8 row-start-3 row-end-4"
      >
        <DeleteIcon color="error" />
      </button>
    </div>
  );
};

export default CartItem;
