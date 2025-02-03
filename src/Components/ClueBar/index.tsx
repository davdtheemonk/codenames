import { useContext } from "react";
import styled from "@emotion/styled";
import { GameContext } from "../../context/gameContext";
import { toast } from "react-stacked-toast";
const ClueBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const ClueInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
  }
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ClueBar = () => {
  const { clue, setClue, sendClue, currentTurn, me } = useContext(GameContext);

  return (
    <ClueBarContainer>
      <ClueInput
        type="text"
        placeholder="Enter your clue..."
        value={clue}
        onChange={(e) => setClue(e.target.value)}
      />
      <SendButton
        onClick={() => {
          if (currentTurn === me?.team) {
            sendClue();
          } else {
            toast.error("Its not your turn dummy");
          }
        }}
        disabled={!clue.trim()}
      >
        Send
      </SendButton>
    </ClueBarContainer>
  );
};

export default ClueBar;
