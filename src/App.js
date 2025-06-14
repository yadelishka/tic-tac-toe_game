import { useState } from "react";

const initialCells = new Array(25).fill(0, 0, 25);

const cellViews = {
  0: "",
  1: "X",
  2: "O",
};

function checkWinCondition(
  lastMoveIndex,
  cells,
  rowCount,
  columnCount,
  winCount
) {
  /* const rows = cells.reduce((acc, _, index) => {
    const rowIndex = Math.floor(index / columnCount);
    if (acc[rowIndex] === undefined) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(index);
    return acc;
  }, []);
  const columns = cells.reduce((acc, _, index) => {
    const columnIndex = index % columnCount;
    if (acc[columnIndex] === undefined) {
      acc[columnIndex] = [];
    }
    acc[columnIndex].push(index);
    return acc;
  }, []);
  console.log(rows, columns); */
  const value = cells[lastMoveIndex];
  const rowIndex = Math.floor(lastMoveIndex / columnCount);
  const columnIndex = lastMoveIndex % columnCount;
  let winningCells = [];

  let winCounter = 1;
  let tempIndex = lastMoveIndex + 1;
  while (
    // winCounter < winCount &&
    rowIndex === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    winCounter++;
    tempIndex++;
  }
  tempIndex = lastMoveIndex - 1;
  while (
    // winCounter < winCount &&
    rowIndex === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    winCounter++;
    tempIndex--;
  }
  winningCells.push(lastMoveIndex);
  if (winCounter >= winCount) return winningCells;

  winningCells.splice(0, winningCells.length);
  winCounter = 1;
  tempIndex = lastMoveIndex - columnCount;
  while (
    // winCounter < winCount &&
    columnIndex === tempIndex % columnCount &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    winCounter++;
    tempIndex -= columnCount;
  }
  tempIndex = lastMoveIndex + columnCount;
  while (
    // winCounter < winCount &&
    columnIndex === tempIndex % columnCount &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    winCounter++;
    tempIndex += columnCount;
  }
  winningCells.push(lastMoveIndex);
  if (winCounter >= winCount) return winningCells;

  winningCells.splice(0, winningCells.length);
  winCounter = 1;
  tempIndex = lastMoveIndex + columnCount + 1;
  let tempRow = rowIndex + 1;
  while (
    // winCounter < winCount &&
    tempRow === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    winCounter++;
    tempIndex += columnCount + 1;
    tempRow++;
  }
  tempIndex = lastMoveIndex - columnCount - 1;
  tempRow = rowIndex - 1;
  while (
    // winCounter < winCount &&
    tempRow === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    winCounter++;
    tempIndex -= columnCount + 1;
    tempRow--;
  }
  winningCells.push(lastMoveIndex);
  if (winCounter >= winCount) return winningCells;

  winningCells.splice(0, winningCells.length);
  winCounter = 1;
  tempIndex = lastMoveIndex + columnCount - 1;
  tempRow = rowIndex + 1;
  while (
    // winCounter < winCount &&
    tempRow === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    winCounter++;
    tempIndex += columnCount - 1;
    tempRow++;
  }
  tempIndex = lastMoveIndex - columnCount + 1;
  tempRow = rowIndex - 1;
  while (
    // winCounter < winCount &&
    tempRow === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    winCounter++;
    tempIndex -= columnCount - 1;
    tempRow--;
  }
  winningCells.push(lastMoveIndex);
  if (winCounter >= winCount) return winningCells;

  winningCells.splice(0, winningCells.length);
  return false;
}

const GAME_STATE = { Menu: "menu", Playing: "playing", EndGame: "endGame" };

export default function App() {
  const [activePlayerValue, setActivePlayerValue] = useState(1);
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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function MenuPage({ onNewGame }) {
  return (
    <div className="menu">
      <Button onClick={onNewGame}>Новая игра</Button>
      <Button>Об авторе</Button>
    </div>
  );
}

function GamePage({
  activePlayerValue,
  setActivePlayerValue,
  onReturnToMenu,
  onEndGame,
  gameState,
  onStartNewGame,
}) {
  const [cells, setCells] = useState(initialCells);
  const [winningCells, setWinningCells] = useState([]);

  console.log("123");

  function restartGame() {
    setCells(cells.map((cell) => 0));
    setActivePlayerValue(1);
    onStartNewGame();
  }

  function changeCellValue(index) {
    if (cells[index] !== 0) return;

    const newCells = cells.map((cell, idx) =>
      idx === index ? activePlayerValue : cell
    );

    setCells(newCells);

    const winIndexes = checkWinCondition(index, newCells, 5, 5, 3);

    console.log("Win:", winIndexes);

    if (winIndexes) {
      setWinningCells(winIndexes);
      return onEndGame();
    }

    setActivePlayerValue(activePlayerValue === 1 ? 2 : 1);
  }

  const isPlaying = gameState === GAME_STATE.Playing;
  const isEndGame = gameState === GAME_STATE.EndGame;

  return (
    <>
      {isEndGame && <GameEndModal activePlayerValue={activePlayerValue} />}
      {isPlaying && <ActivePlayerLabel activePlayerValue={activePlayerValue} />}
      <Board
        activePlayerValue={activePlayerValue}
        setActivePlayerValue={setActivePlayerValue}
        cells={cells}
        setCells={setCells}
        changeCellValue={changeCellValue}
        winningCells={winningCells}
      />
      <div className="game-actions">
        <Button onClick={onReturnToMenu}>В меню</Button>
        <Button onClick={restartGame}>Новая игра</Button>
      </div>
    </>
  );
}

function GameEndModal({ activePlayerValue }) {
  return (
    <div className="game-end-modal">{`${cellViews[activePlayerValue]} победил!`}</div>
  );
}

function Board({ cells, changeCellValue, winningCells }) {
  console.log(winningCells);
  return (
    <div className="board">
      {cells.map((value, index) => (
        <Cell
          value={value}
          changeCellValue={() => changeCellValue(index)}
          isWinning={winningCells.includes(index)}
        />
      ))}
    </div>
  );
}

function Cell({ value, changeCellValue, isWinning }) {
  return (
    <div
      className={isWinning ? "green cell" : "cell"}
      onClick={changeCellValue}
    >
      {cellViews[value]}
    </div>
  );
}

function ActivePlayerLabel({ activePlayerValue }) {
  return (
    <div className="active-player-label">{`Сейчас ходит ${cellViews[activePlayerValue]} `}</div>
  );
}
