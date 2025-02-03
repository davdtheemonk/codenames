import { GameBoard } from "./Components/GameBoard";
import { GameProvider } from "./context/gameContext";
import "./App.css";
import { Toaster } from "react-stacked-toast";
function App() {
  return (
    <GameProvider>
      <Toaster position="center" />
      <GameBoard />
    </GameProvider>
  );
}

export default App;
