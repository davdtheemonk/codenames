import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { PlayerListProps } from "../../types";
import { keyframes } from "@emotion/react";
import { GameContext } from "../../context/gameContext";
import Button from "../Button";

import ClueBar from "../ClueBar";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  min-width: 300px;
  padding: 20px;
  background-color: #f4f4f4;
  margin-left: auto;

  border-radius: 10px;
  max-width: 400px;

  @media (max-width: 768px) {
    margin-left: auto;
    width: 350px;
    margin-right: auto; /* Center the container on small screens */
  }
`;

const PlayerCard = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  background-color: white;
  padding: 10px 15px;
  gap: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TeamCircle = styled.div<{ team: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ team }) => (team === "red" ? "red" : "blue")};
`;

const PlayerName = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

const PlayerRole = styled.span<{ role: string }>`
  font-size: 14px;
  margin-left: auto;
  color: ${({ role }) => (role === "spymaster" ? "red" : "blue")};
`;

const textGlow = keyframes`
  0% { text-shadow: 0 0 5px black; }
  50% { text-shadow: 0 0 15px black}
  100% { text-shadow: 0 0 5px black; }
`;

const PlayerTurn = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  color: black;
  animation: ${textGlow} 1.5s infinite ease-in-out;
`;

const UserText = styled.p`
  margin-left: auto;
  font-size: 12px;
  color: grey;
`;

// PlayerList Component
const PlayerList: React.FC<PlayerListProps> = ({
  players,
  setShowKeyCard,
  showKeyCard,
}) => {
  const { me, sendClue, currentTurn } = useContext(GameContext);
  const isSpyMaster = me
    ? players.some(
        (player) => player.id === me.id && player.role === "spymaster"
      )
    : false;

  return (
    <Container>
      {isSpyMaster && (
        <Button onClick={() => setShowKeyCard(!showKeyCard)}>
          Show Keycard
        </Button>
      )}

      <PlayerTurn>
        Its{" "}
        {currentTurn === "red" ? (
          <TeamCircle team={"red"} />
        ) : (
          <TeamCircle team={"blue"} />
        )}
        team turn to play.
      </PlayerTurn>
      <p>Players</p>
      {players.length > 0 ? (
        players.map((player) => (
          <PlayerCard key={player.id}>
            <TeamCircle team={player.team} />
            <PlayerName>{player.name}</PlayerName>
            <PlayerRole role={player.role}>{player.role}</PlayerRole>
          </PlayerCard>
        ))
      ) : (
        <p>No players joined yet.</p>
      )}
      {isSpyMaster && <ClueBar />}
      <UserText>Logged in as {me?.name + "(" + me?.team + ")"}</UserText>
    </Container>
  );
};

export default PlayerList;
