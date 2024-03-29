/* eslint-disable react/prop-types */

const CustomButton = ({ type, text, disabled, onClick }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`bg-gray-300 px-4 rounded-md font-medium py-2 hover:bg-gray-400 w-full my-2 ${
        disabled ? "opacity-50" : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
