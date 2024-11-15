import { Input } from "antd";
import React from "react";

const InputCustom = ({
  labelContent,
  placeholder,
  handleChange,
  name,
  id,
  error,
  touched,
  handleBlur,
  value,
  type = "text",
}) => {
  return (
    <div>
      <label className="inline-block font-medium mb-2" htmlFor={id}>
        {labelContent}
      </label>
      <Input
        value={value}
        name={name}
        id={id}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        type={type}
      />
      {touched && error ? <p className="text-red-500">{error}</p> : null}
    </div>
  );
};

export default InputCustom;
