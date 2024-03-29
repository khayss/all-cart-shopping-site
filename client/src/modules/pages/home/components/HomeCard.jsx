/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const HomeCard = ({ src, header, to, inCart, onClick, withButton }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg w-full overflow-hidden h-full">
      <Link
        to={to}
        className="relative w-full flex items-center justify-center h-full"
      >
        <h3 className="absolute top-0 w-full bg-gray-300 bg-opacity-90 py-3 px-4 font-medium truncate">
          {header}
        </h3>
        <img src={src} className="object-cover h-48 w-full" />
      </Link>

      {withButton ? (
        <button
          className={`bg-gray-200 p-3 font-medium w-full mt-1 hover:bg-gray-400 ${
            inCart ? "text-red-400" : null
          }`}
          onClick={onClick}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      ) : null}
    </div>
  );
};

export default HomeCard;
