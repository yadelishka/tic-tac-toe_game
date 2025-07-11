import { useState } from "react";
import { initialCells, GAME_STATE } from "../App";
import { checkWinCondition } from "../utils/checkWinCondition";
import { GameEndModal } from "../components/GameEndModal";
import { ActivePlayerLabel } from "../components/ActivePlayerLabel";
import { WinnerPlayerLabel } from "../components/WinnerPlayerLabel";
import { Board } from "../components/Board";
import { Button } from "../components/shared/Button";
import { clear, load, save } from "../utils/localStorage";
import { ConfirmationModal } from "../components/shared/ConfirmationModal";

export function GamePage({
  activePlayerValue,
  setActivePlayerValue,
  onReturnToMenu,
  onEndGame,
  gameState,
  onStartNewGame,
  showConfirmation,
  setShowConfirmation,
  onNewGameClick,
}) {
  const gameData = load("gameSave");

  console.log(gameData);

  const [cells, setCells] = useState(gameData?.cells ?? initialCells);
  const [winningCells, setWinningCells] = useState([]);

  function restartGame() {
    setCells(cells.map((cell) => 0));
    setActivePlayerValue(1);
    setWinningCells([]);
    onStartNewGame();
  }

  function changeCellValue(index) {
    if (cells[index] !== 0) return;

    const newCells = cells.map((cell, idx) =>
      idx === index ? activePlayerValue : cell
    );

    setCells(newCells);

    const winIndexes = checkWinCondition(index, newCells, 5, 5, 3);

    if (winIndexes) {
      setWinningCells(winIndexes);
      clear("gameSave");
      return onEndGame();
    }

    setActivePlayerValue(activePlayerValue === 1 ? 2 : 1);

    save("gameSave", {
      cells: newCells,
      activePlayer: activePlayerValue === 1 ? 2 : 1,
    });
  }

  const isPlaying = gameState === GAME_STATE.Playing;
  const isEndGame = gameState === GAME_STATE.EndGame;

  return (
    <>
      <GameEndModal
        activePlayerValue={activePlayerValue}
        isEndGame={isEndGame}
      />
      {isPlaying ? (
        <ActivePlayerLabel activePlayerValue={activePlayerValue} />
      ) : (
        <WinnerPlayerLabel />
      )}
      <Board
        activePlayerValue={activePlayerValue}
        setActivePlayerValue={setActivePlayerValue}
        cells={cells}
        setCells={setCells}
        changeCellValue={changeCellValue}
        winningCells={winningCells}
        gameState={gameState}
      />
      <div className="game-actions">
        <Button onClick={onReturnToMenu}>В меню</Button>
        <Button onClick={onNewGameClick}>Новая игра</Button>
        <ConfirmationModal
          message="Вы уверены, что хотите начать новую игру?"
          onConfirm={() => {
            setShowConfirmation(false);
            restartGame();
          }}
          onCancel={() => setShowConfirmation(false)}
          modalClassNameVisible="new-game-modal-visible"
          modalClassName="new-game-modal"
          buttonClassName="button"
          showConfirmation={showConfirmation}
          overlayClassName={"confirm-modal-overlay"}
        />
      </div>
    </>
  );
}
