import { createContext, ReactNode, FC, useState, useEffect } from "react";
import {
  Card,
  CardColor,
  GameContextType,
  KeyCard,
  Player,
  GameStatus,
  Team,
} from "../types";
import { IMAGES } from "../constants";
import { toast } from "react-stacked-toast";
import { socket } from "../utils/socket";
import { Role } from "../types";

// Create the context with a default value
export const GameContext = createContext<GameContextType>({
  players: [],
  cards: [],
  keyCards: [],
  joinGame: () => {},
  startGame: () => {},
  gameStatus: undefined,
  setGameStatus: () => {},
  me: undefined,
  sendClue: () => {},
  clue: "",
  setClue: () => {},
  currentTurn: "red",
  redScore: 0,
  blueScore: 0,
  winner: "",
  clueNumber: 0,
  setCards: () => {},
  setClueNumber: () => {},
  guessesLeft: 0,
  setRedScore: () => {},
  setBlueScore: () => {},
  setWinner: () => {},
  setGuessesLeft: () => {},
  setCurrentTurn: () => {},
});

// Define the provider component
export const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [keyCards, setKeyCards] = useState<KeyCard[]>([]);
  const [me, setMe] = useState<Player>();
  const [gameStatus, setGameStatus] = useState<GameStatus>(undefined);
  const [currentTurn, setCurrentTurn] = useState<Team>("red");
  const [redScore, setRedScore] = useState<number>(0);
  const [blueScore, setBlueScore] = useState<number>(0);
  const [winner, setWinner] = useState<string>("");
  const [clueNumber, setClueNumber] = useState<number>(0);
  const [guessesLeft, setGuessesLeft] = useState<number>(0);
  const [clue, setClue] = useState<string>("");

  const sendClue = () => {
    const cluePattern = /^[A-Za-z]+:\s*\d+$/; // Ensures format "Word: Number"
    if (!cluePattern.test(clue)) {
      toast.error(
        "Clue must be in the format 'Word: Number' (e.g., 'Ocean: 2')"
      );
      return;
    }

    socket.emit("sendClue", clue);
    setClue("");
  };

  useEffect(() => {
    setCards(generateGrid());
    setKeyCards(generateKeyCard());
    socket.on("updatePlayers", (data) => {
      if (Array.isArray(data)) {
        setPlayers(data.flat()); // Directly update state
      } else {
        console.error("Invalid data format received:", data);
      }
    });
    socket.on("error", (data) => {
      toast.error(data.error);
    });
    socket.on("clues", (data) => {
      const match = data.match(/\d+/); // Find digits in the string
      const clueNumber = match ? parseInt(match[0], 10) : 0; // Default to 0 if null
      setClueNumber(clueNumber);
      setGuessesLeft(clueNumber);
      return toast({
        title: data,
        icon: "(Clue)💡",
        style: {
          borderRadius: "200px",
          background: "#333",
          color: "#fff",
        },
      });
    });
    socket.on("joined", (data) => {
      toast.success(data.name + " joined");

      setPlayers(data.players.flat());
    });
    socket.on("started", (data) => {
      setPlayers(data.players.flat());
      setGameStatus("started");
      setKeyCards(data.keyCards);
      setCards(data.cards);
      setCurrentTurn(data.currentTurn);
    });
    socket.on("updatedGame", (data) => {
      setCards(data.cards);
      setCurrentTurn(data.currentTurn);
      setRedScore(data.redScore);
      setBlueScore(data.blueScore);
      setWinner(data.winner);
      setGuessesLeft(data.guessesLeft);
    });
    return () => {
      socket.off("joined");
      socket.off("error");
      socket.off("clues");
      socket.off("started");
      socket.off("updatedGame");
      socket.off("updatePlayers");
    };
  }, []);

  const generateGrid = (): Card[] => {
    const uniqueImages = Array.from(new Set(IMAGES));

    if (uniqueImages.length < 20) {
      console.error("Not enough unique images to generate the grid.");
      return [];
    }

    // Shuffle and take the first 20 unique images
    const shuffledImages = uniqueImages
      .sort(() => Math.random() - 0.5)
      .slice(0, 20);

    // Shuffle roles
    const shuffledRoles: CardColor[] = [
      ...Array(8).fill("red"),
      ...Array(7).fill("blue"),
      ...Array(4).fill("bystander"),
      "assassin",
    ].sort(() => Math.random() - 0.5);
    return shuffledImages.map((image, i) => ({
      id: i,
      image: image ?? "default-image.jpg", // Provide a default image
      color: shuffledRoles[i],
      revealed: false,
    }));
  };

  const joinGame = (name: string, team: Team) => {
    const player = {
      id: socket.id || "",
      name: name,
      role: "operative" as Role,
      team: team,
    };
    setMe(player);
    socket.emit("join", player);
  };
  const generateKeyCard = (): KeyCard[] => {
    const roles = [
      ...Array(8).fill("red"), // 8 red cards
      ...Array(7).fill("blue"), // 7 blue cards
      ...Array(4).fill("bystander"), // 4 bystanders
      ...Array(1).fill("assassin"), // 1 assassin
    ];

    // Shuffle the roles
    const shuffledRoles = roles.sort(() => Math.random() - 0.5);

    // Create the keyCards array
    return shuffledRoles.map((color, index) => ({
      id: index + 1, // Unique ID
      color,
    }));
  };

  const startGame = () => {
    if (players.length >= 4 && players[0].name === me?.name) {
      socket.emit("start", {
        cards: cards,
        keyCards: keyCards,
        currentTurn: currentTurn,
      });
    } else {
      toast.error("You need a minimum of 4 players");
    }
  };

  return (
    <GameContext.Provider
      value={{
        players,
        cards,
        keyCards,
        joinGame,
        startGame,
        gameStatus,
        setGameStatus,
        me,
        clue,
        sendClue,
        setClue,
        currentTurn,
        setCurrentTurn,
        redScore,
        setRedScore,
        blueScore,
        setBlueScore,
        winner,
        setWinner,
        clueNumber,
        setClueNumber,
        guessesLeft,
        setGuessesLeft,
        setCards,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
