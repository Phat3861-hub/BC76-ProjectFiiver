import { Select } from "antd";
import React from "react";

const SelectCustom = ({ labelContent, options, mode, handleChange }) => {
  return (
    <div>
      <label className="inline-block font-medium mb-2" htmlFor="">
        {labelContent}
      </label>
      <Select
        onChange={handleChange}
        className="w-full"
        options={options}
        mode={mode && mode}
      />
    </div>
  );
};

export default SelectCustom;
