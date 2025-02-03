import styled from "@emotion/styled";
import Input from "../Input";
import { useContext, useState } from "react";
import Button from "../Button";
import { GameContext } from "../../context/gameContext";
import { Team } from "../../types";
import Select from "../Select";
import { toast } from "react-stacked-toast";

const Container = styled.div`
  display: flex;
  height: full;
  width: 250px;
  border: 1px solid rgba(241, 139, 53, 255);
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
`;

const StyledComponents = styled.div`
  display: flex;
  height: full;
  width: 100%;
  align-items: start;

  margin: auto;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
`;

export const Join = () => {
  const { joinGame } = useContext(GameContext);
  const [name, setName] = useState("");

  const [team, setTeam] = useState<Team>("blue");
  const handleClickButton = () => {
    if (!name || !team) {
      return toast.error("Please fill your details");
    }
    joinGame(name, team);
  };

  return (
    <Container>
      <p>Join Codenames Game</p>
      <StyledComponents>
        <p>Enter your name</p>

        <Input value={name} setValue={setName} title="Name" />
      </StyledComponents>
      <StyledComponents>
        <p>Select your team</p>

        <Select
          options={[
            { label: "blue", value: "blue" },
            { label: "red", value: "red" },
          ]}
          value={team}
          setTeam={setTeam}
        />
      </StyledComponents>
      <Button onClick={() => handleClickButton()}>Join</Button>
    </Container>
  );
};
