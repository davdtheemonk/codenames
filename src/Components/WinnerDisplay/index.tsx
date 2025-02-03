import React from "react";
import styled from "@emotion/styled";
import { WinnerDisplayProps } from "../../types";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const WinnerBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const WinnerText = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner }) => {
  if (!winner) return null; // Hide component if there's no winner

  return (
    <Overlay>
      <WinnerBox>
        <WinnerText>🎉 {winner.toUpperCase()} Team Wins! 🎉</WinnerText>
      </WinnerBox>
    </Overlay>
  );
};

export default WinnerDisplay;
