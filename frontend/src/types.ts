export type CardColor = "red" | "blue" | "bystander" | "assassin";
export type Role = "spymaster" | "operative";
export type Team = "red" | "blue";
export type GameStatus = "started" | "paused" | "ended" | undefined;

export interface CardProps {
  color: CardColor;
  revealed?: boolean;
}

// Define the shape of the context
export interface GameContextType {
  players: Player[];
  cards: Card[];
  keyCards: KeyCard[];
  joinGame: (name: string, team: Team) => void;
  startGame: () => void;
  gameStatus: GameStatus;

  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  me: Player | undefined;
  sendClue: () => void;
  clue: string;
  setClue: React.Dispatch<React.SetStateAction<string>>;
  currentTurn: Team;
  redScore: number;
  setRedScore: React.Dispatch<React.SetStateAction<number>>;
  setBlueScore: React.Dispatch<React.SetStateAction<number>>;
  setWinner: React.Dispatch<React.SetStateAction<string>>;
  blueScore: number;
  winner: string;
  clueNumber: number; // Number of allowed guesses
  setClueNumber: React.Dispatch<React.SetStateAction<number>>;
  guessesLeft: number; // Track remaining guesses
  setCurrentTurn: React.Dispatch<React.SetStateAction<Team>>;
  setGuessesLeft: React.Dispatch<React.SetStateAction<number>>;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export interface WinnerDisplayProps {
  winner: string | null;
}

export interface ScoreboardProps {
  redScore: number;
  blueScore: number;
  currentTurn: "red" | "blue";
}
export interface Card {
  id: number;
  image: string;
  color: CardColor;
  revealed: boolean;
}
export interface Player {
  id: string;
  name: string;
  team: Team;
  role: Role;
}
export type inputProps = {
  value: string;
  type?: string;

  setValue: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  action?: () => void;
};

export interface KeyCard {
  id: number;

  color: CardColor;
}

export interface PlayerListProps {
  players: Player[];
  setShowKeyCard: React.Dispatch<React.SetStateAction<boolean>>;
  showKeyCard: boolean;
}
export type selectProps = {
  options: { label: string; value: string }[];
  value: string;
  setTeam: React.Dispatch<React.SetStateAction<Team>>;
};
