import styled from "@emotion/styled";
import { KeyCard, Role } from "../../types";

const getRoleColor = (role: Role): string => {
  switch (role) {
    case "red" as Role:
      return "#E63946";
    case "blue" as Role:
      return "rgba(77, 121, 255, 0.7)";
    case "bystander" as Role:
      return "rgba(217, 217, 217, 0.7)";
    case "assassin" as Role:
      return "rgba(51, 51, 51, 0.8)";
    default:
      return "#A8A8A8";
  }
};

// Grid container
const KeyCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // 5 columns
  gap: 8px;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  margin-left: auto;
  max-width: 400px;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto; /* Center the container on small screens */
  }
`;

// Individual KeyCard tile
const KeyCardTile = styled.div<{ role: Role }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 6px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  background: ${(props) => getRoleColor(props.role)};
`;

const KeyCardDisplay = ({ keyCards }: { keyCards: KeyCard[] }) => {
  return (
    <KeyCardGrid>
      {keyCards.map((card) => (
        <KeyCardTile key={card.id} role={card.color as Role}></KeyCardTile>
      ))}
    </KeyCardGrid>
  );
};

export default KeyCardDisplay;
