/* eslint-disable react/prop-types */

const CustomSelect = ({ options, name, onChange }) => {
  return (
    <div className="w-full">
      <select
        name={name}
        className="border-2 rounded-md border-gray-300 px-4 py-2 w-full capitalize"
        onChange={onChange}
      >
        {options?.map((item) => (
          <option className="capitalize" key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
