/* eslint-disable react/prop-types */
const CustomInput = ({
  label,
  id,
  type,
  value,
  onChange,
  name,
  required,
}) => {
  return (
    <div className="flex flex-col items-start my-2 w-full">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input
        className="border-2 border-gray-300 rounded-md py-1 px-2 w-full"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
      />
    </div>
  );
};

export default CustomInput;
