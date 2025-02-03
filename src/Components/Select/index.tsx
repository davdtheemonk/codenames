import React from "react";
import styled from "@emotion/styled";
import { Team, selectProps } from "../../types";

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

const SelectStyled = styled.select`
  width: 100%;
  height: 29px;
  padding-left: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  appearance: none;
  color: grey;
  outline: none;

  &:focus {
    border-color: rgba(241, 139, 53, 255);
  }
`;

const Select: React.FC<selectProps> = ({ options, value, setTeam }) => {
  return (
    <SelectWrapper>
      <SelectStyled
        value={value}
        onChange={(e) => setTeam(e.target.value as Team)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectStyled>
    </SelectWrapper>
  );
};

export default Select;
