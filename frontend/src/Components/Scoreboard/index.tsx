import React from "react";
import styled from "@emotion/styled";
import { ScoreboardProps } from "../../types";

const ScoreboardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TeamScore = styled.div<{ color: string; isTurn: boolean }>`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
  opacity: ${({ isTurn }) => (isTurn ? 1 : 0.5)};
`;
const TeamCircle = styled.div<{ team: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ team }) => (team === "red" ? "red" : "blue")};
`;

const Scoreboard: React.FC<ScoreboardProps> = ({
  redScore,
  blueScore,
  currentTurn,
}) => {
  return (
    <ScoreboardContainer>
      <TeamScore color="red" isTurn={currentTurn === "red"}>
        <TeamCircle team={"red"} /> Red: {redScore}
      </TeamScore>
      <TeamScore color="blue" isTurn={currentTurn === "blue"}>
        <TeamCircle team={"blue"} /> Blue: {blueScore}
      </TeamScore>
    </ScoreboardContainer>
  );
};

export default Scoreboard;
