import React, { useState } from "react";
import "./form_input.css";
const FormInput = (props) => {
  const { label, onChange, errorMessage, id, ...inputProps } = props;
  const [focused, setfocused] = useState(false);
  const handleFocus = (e) => {
    setfocused(true);
  };
  return (
    <div className="form_input">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        onFocus={()=>inputProps.name === "confirmPassword" && setfocused(true)}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
