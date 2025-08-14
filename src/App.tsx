import { useState } from "react";
import { clear, load } from "./utils/localStorage";
import { MenuPage } from "./pages/MenuPage";
import { GamePage } from "./pages/GamePage";

export const initialCells: number[] = new Array(25).fill(0, 0, 25);

export enum CellState {
  Empty = 0,
  PlayerCross = 1,
  PlayerNull = 2,
}

export type ActivePlayerValue = CellState.PlayerCross | CellState.PlayerNull;

export const cellViews = {
  [CellState.Empty]: "",
  [CellState.PlayerCross]: "X",
  [CellState.PlayerNull]: "O",
};

export enum GameState {
  Menu = "menu",
  Playing = "playing",
  EndGame = "endGame",
}

export default function App() {
  const gameData = load("gameSave");

  const [activePlayerValue, setActivePlayerValue] = useState(
    gameData?.activePlayer ?? 1
  );
  const [gameState, setGameState] = useState(GameState.Menu);

  function continueGame() {
    setGameState(GameState.Playing);
  }

  function startNewGame() {
    setGameState(GameState.Playing);
    setActivePlayerValue(1);
    clear();
  }

  function returnToMenu() {
    setGameState(GameState.Menu);
  }

  function endGame() {
    setGameState(GameState.EndGame);
  }

  const isInMenu = gameState === GameState.Menu;
  const isPlaying = gameState === GameState.Playing;
  const isEndGame = gameState === GameState.EndGame;

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleNewGameClick = () => {
    if (gameData !== null) setShowConfirmation(true);
    else startNewGame();
  };

  return (
    <div>
      <h1 className="header">Крестики-нолики</h1>
      {isInMenu && (
        <MenuPage
          onContinueGame={continueGame}
          onStartNewGame={startNewGame}
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          onNewGameClick={handleNewGameClick}
        />
      )}
      {(isPlaying || isEndGame) && (
        <GamePage
          activePlayerValue={activePlayerValue}
          setActivePlayerValue={setActivePlayerValue}
          onReturnToMenu={returnToMenu}
          onEndGame={endGame}
          gameState={gameState}
          onStartNewGame={startNewGame}
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          onNewGameClick={handleNewGameClick}
        />
      )}
    </div>
  );
}
