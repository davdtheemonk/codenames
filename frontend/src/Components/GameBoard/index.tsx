import CardGrid from "../CardGrid";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/gameContext";
import Card from "../Card";
import Button from "../Button";
import { Join } from "../Join";
import { TbLoader3 } from "react-icons/tb";
import styled from "@emotion/styled";
import { toast } from "react-stacked-toast";
import PlayerList from "../PlayerList";
import KeyCardDisplay from "../KeyCard";
import parse from "html-react-parser";
import { socket } from "../../utils/socket";
import { CardColor, Card as CardType } from "../../types";
import Scoreboard from "../Scoreboard";
import WinnerDisplay from "../WinnerDisplay";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: row; /* Default for larger screens */
  background-color: white;
  align-items: center;
  border-radius: 8px;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column; /* Change to column on smaller screens */
  }
`;
const WaitContainer = styled.div`
  display: flex;
  height: full;
  width: 250px;
  border: 1px solid rgba(241, 139, 53, 255);
  padding: 15px;
  font-size: 18px;
  align-items: center;
  border-radius: 8px;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
`;
const GameStatusContainer = styled.div`
  display: flex;
  height: full;
  max-width: 400px;
  border: 1px solid rgba(241, 139, 53, 255);
  padding: 15px;

  align-items: center;
  border-radius: 8px;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
`;

const SpinningIcon = styled(TbLoader3)`
  animation: spin 1s linear infinite;
  color: rgba(241, 139, 53, 255);
  font-size: 55px;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const GameBoard = () => {
  const {
    gameStatus,
    startGame,
    setGuessesLeft,
    keyCards,
    setWinner,
    currentTurn,
    players,
    setBlueScore,
    cards,
    me,
    winner,
    setCards,
    redScore,
    blueScore,
    guessesLeft,
    setRedScore,
    setCurrentTurn,
    clueNumber,
  } = useContext(GameContext);

  const [showKeyCard, setShowKeyCard] = useState<boolean>(false);

  const isSpyMaster = me
    ? players.some(
        (player) => player.id === me.id && player.role === "spymaster"
      )
    : false;

  const handleStartButton = () => {
    if (players.length < 4) {
      return toast.error("You need a minimum of 4 players");
    }
    startGame();
  };
  const handleCardClick = (card: CardType) => {
    if (card.revealed || winner) return; // Ignore if already revealed or game over

    if (!me || me.team !== currentTurn || me.role === "spymaster") {
      toast.error("Only operatives click");
      return;
    }

    if (!clueNumber) {
      toast.error("Please wait for your spymaster to send a clue");
      return;
    }

    const updatedCards = [...cards]; // Clone the cards array
    const cardIndex = cards.findIndex((c) => c.id === card.id);
    if (cardIndex === -1) return;

    const cardRole = keyCards[cardIndex]?.color;

    updatedCards[cardIndex] = {
      ...updatedCards[cardIndex],
      revealed: true,
      color: cardRole,
    };

    let updatedRedScore = redScore;
    let updatedBlueScore = blueScore;
    let updatedWinner = winner;
    let updatedGuessesLeft = guessesLeft; // Start with current guess count
    let updatedTurn = currentTurn;

    if (cardRole === currentTurn) {
      if (cardRole === "red") {
        updatedRedScore++;
      } else {
        updatedBlueScore++;
      }
      updatedGuessesLeft--;

      if (updatedRedScore === 8) updatedWinner = "red";
      if (updatedBlueScore === 7) updatedWinner = "blue";

      if (updatedGuessesLeft < 0) {
        updatedGuessesLeft = 0;
        updatedTurn = currentTurn === "red" ? "blue" : "red"; // Switch turn only if guesses run out
      }
    } else if (cardRole === "red" || cardRole === "blue") {
      if (cardRole === "red") {
        updatedRedScore++; // Opponent gets a point
      } else {
        updatedBlueScore++; // Opponent gets a point
      }
      updatedGuessesLeft = 0; // End turn immediately
      updatedTurn = currentTurn === "red" ? "blue" : "red";
    } else if (cardRole === "bystander") {
      updatedTurn = currentTurn === "red" ? "blue" : "red"; // Switch turn
      updatedGuessesLeft = 0;
    } else if (cardRole === "assassin") {
      updatedWinner = currentTurn === "red" ? "blue" : "red"; // Other team wins
      updatedGuessesLeft = 0;
    }

    setCards(updatedCards);
    setRedScore(updatedRedScore);
    setBlueScore(updatedBlueScore);
    setWinner(updatedWinner);
    setGuessesLeft(updatedGuessesLeft);
    setCurrentTurn(updatedTurn);

    socket.emit("gameUpdate", {
      cards: updatedCards,
      currentTurn: updatedTurn,
      redScore: updatedRedScore,
      blueScore: updatedBlueScore,
      winner: updatedWinner,
      guessesLeft: updatedGuessesLeft,
    });
  };

  console.log(winner);

  return (
    <Container>
      {me === undefined ? (
        <Join />
      ) : me && gameStatus === "started" && !winner ? (
        <GridContainer>
          {isSpyMaster && showKeyCard ? (
            <KeyCardDisplay keyCards={keyCards.flat()} />
          ) : (
            <CardGrid>
              {cards.map((card) => (
                <Card
                  key={card.id}
                  color={card.color as any}
                  revealed={card.revealed}
                  onClick={() => {
                    handleCardClick(card);
                  }}
                >
                  {parse(card.image)}
                </Card>
              ))}
            </CardGrid>
          )}
          <GameStatusContainer>
            <Scoreboard
              redScore={redScore}
              blueScore={blueScore}
              currentTurn={currentTurn}
            />
            <PlayerList
              players={players}
              showKeyCard={showKeyCard}
              setShowKeyCard={setShowKeyCard}
            />
          </GameStatusContainer>
        </GridContainer>
      ) : me && gameStatus === undefined ? (
        <WaitContainer>
          <SpinningIcon />
          <p>
            {players.length > 0 && players[0].id === me.id
              ? "People are waiting for the game to start"
              : "Wait for Game to start"}
          </p>
          <p>Online Players: {players.length}</p>
          {players.length > 0 && players[0].id === me.id && (
            <Button onClick={() => handleStartButton()}>Start Game</Button>
          )}
        </WaitContainer>
      ) : me && winner ? (
        <WinnerDisplay winner={winner} />
      ) : me && gameStatus === "ended" ? (
        <div>
          <p>hello</p>
        </div>
      ) : (
        <div></div>
      )}
    </Container>
  );
};
