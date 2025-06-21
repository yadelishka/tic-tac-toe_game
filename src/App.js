import { useState } from "react";
import { GamePage } from "./pages/GamePage";
import { MenuPage } from "./pages/MenuPage";
import { load } from "./utils/localStorage";

export const initialCells = new Array(25).fill(0, 0, 25);

export const cellViews = {
  0: "",
  1: "X",
  2: "O",
};

export const GAME_STATE = {
  Menu: "menu",
  Playing: "playing",
  EndGame: "endGame",
};

export default function App() {
  const gameData = load("gameSave");

  const [activePlayerValue, setActivePlayerValue] = useState(
    gameData?.activePlayer ?? 1
  );
  const [gameState, setGameState] = useState(GAME_STATE.Menu);

  function startNewGame() {
    setGameState(GAME_STATE.Playing);
  }

  function returnToMenu() {
    setGameState(GAME_STATE.Menu);
  }

  function endGame() {
    setGameState(GAME_STATE.EndGame);
  }

  const isInMenu = gameState === GAME_STATE.Menu;
  const isPlaying = gameState === GAME_STATE.Playing;
  const isEndGame = gameState === GAME_STATE.EndGame;

  return (
    <div>
      <h1 className="header">Крестики-нолики</h1>
      {isInMenu && <MenuPage onNewGame={startNewGame} />}
      {(isPlaying || isEndGame) && (
        <GamePage
          activePlayerValue={activePlayerValue}
          setActivePlayerValue={setActivePlayerValue}
          onReturnToMenu={returnToMenu}
          onEndGame={endGame}
          gameState={gameState}
          onStartNewGame={startNewGame}
        />
      )}
    </div>
  );
}
