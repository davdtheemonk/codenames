import styled from "@emotion/styled";
import { CardProps } from "../../types";

const Card = styled.div<CardProps>`
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  svg {
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: ${({ revealed, color }) => {
      return revealed
        ? color === "red"
          ? "rgba(255, 77, 77, 0.7)"
          : color === "blue"
          ? "rgba(77, 121, 255, 0.7)"
          : color === "bystander"
          ? "rgba(217, 217, 217, 0.7)"
          : color === "assassin"
          ? "rgba(51, 51, 51, 0.8)"
          : "transparent"
        : "transparent";
    }};
    transition: background-color 0.3s ease-in-out;
  }
`;

export default Card;
