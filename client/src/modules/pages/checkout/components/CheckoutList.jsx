/* eslint-disable react/prop-types */
const CheckoutList = ({ serialNum, title, price, totalPetItem, quantity }) => {
  return (
    <div className="grid grid-cols-6 gap-x-2 gap-y-0 my-2 w-full">
      <p className="col-span-1 border-b-2 border-dashed border-gray-300">
        {serialNum}
      </p>
      <p className="pl-4 col-span-5 border-b-2 border-dashed border-x-2 border-gray-300">
        {title}
      </p>
      <p className="col-span-2 text-end pr-4 border-b-2 border-dashed border-gray-300">
        {price}
      </p>
      <p className="col-span-2 text-center border-b-2 border-dashed border-x-2 border-gray-300">
        {quantity}
      </p>
      <p className="col-span-2 text-end pr-4 border-b-2 border-dashed border-gray-300">
        {totalPetItem}
      </p>
    </div>
  );
};

export default CheckoutList;
