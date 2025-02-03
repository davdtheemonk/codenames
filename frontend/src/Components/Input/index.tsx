import React from "react";
import styled from "@emotion/styled";
import { inputProps } from "../../types";

const StyledInput = styled.input`
  width: 95%;
  height: 25px;
  border: 1px solid #ccc; /* Ensuring opacity */
  color: dark;
  padding-left: 5px;
  border-radius: 5px;

  font-size: 14px;
  outline: none; /* Remove outline */

  &:focus {
    border-color: rgba(241, 139, 53, 255);
  }
`;

const Input: React.FC<inputProps> = ({
  value,
  setValue,
  title,
  defaultValue,
}) => {
  return (
    <StyledInput
      value={value}
      placeholder={title}
      defaultValue={defaultValue || ""}
      type={title === "Password" ? "password" : "text"}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Input;
