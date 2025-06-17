import { useState } from "react";

const initialCells = new Array(25).fill(0, 0, 25);

const cellViews = {
  0: "",
  1: "X",
  2: "O",
};

function checkHorizontal(lastMoveIndex, cells, value, rowIndex, columnCount) {
  const winningCells = [lastMoveIndex];

  // Проверка вправо
  let tempIndex = lastMoveIndex + 1;
  while (
    rowIndex === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    tempIndex++;
  }

  // Проверка влево
  tempIndex = lastMoveIndex - 1;
  while (
    rowIndex === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    tempIndex--;
  }

  return winningCells;
}

function checkVertical(lastMoveIndex, cells, value, columnIndex, columnCount) {
  const winningCells = [lastMoveIndex];

  // Проверка вверх
  let tempIndex = lastMoveIndex - columnCount;
  while (
    tempIndex >= 0 &&
    columnIndex === tempIndex % columnCount &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    tempIndex -= columnCount;
  }

  // Проверка вниз
  tempIndex = lastMoveIndex + columnCount;
  while (
    tempIndex < cells.length &&
    columnIndex === tempIndex % columnCount &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    tempIndex += columnCount;
  }

  return winningCells;
}

function checkDiagonalLeft(lastMoveIndex, cells, value, rowIndex, columnCount) {
  const winningCells = [lastMoveIndex];

  // Проверка вниз-вправо
  let tempIndex = lastMoveIndex + columnCount + 1;
  let tempRow = rowIndex + 1;
  while (
    tempRow === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    tempIndex += columnCount + 1;
    tempRow++;
  }

  // Проверка вверх-влево
  tempIndex = lastMoveIndex - columnCount - 1;
  tempRow = rowIndex - 1;
  while (
    tempRow === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    tempIndex -= columnCount + 1;
    tempRow--;
  }

  return winningCells;
}

function checkDiagonalRight(
  lastMoveIndex,
  cells,
  value,
  rowIndex,
  columnCount
) {
  const winningCells = [lastMoveIndex];

  // Проверка вниз-влево
  let tempIndex = lastMoveIndex + columnCount - 1;
  let tempRow = rowIndex + 1;
  while (
    tempRow === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    tempIndex += columnCount - 1;
    tempRow++;
  }

  // Проверка вверх-вправо
  tempIndex = lastMoveIndex - columnCount + 1;
  tempRow = rowIndex - 1;
  while (
    tempRow === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winningCells.push(tempIndex);
    tempIndex -= columnCount - 1;
    tempRow--;
  }

  return winningCells;
}

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

  winningCells = checkHorizontal(
    lastMoveIndex,
    cells,
    value,
    rowIndex,
    columnCount
  );
  if (winningCells.length >= winCount) return winningCells;

  winningCells = checkVertical(
    lastMoveIndex,
    cells,
    value,
    columnIndex,
    columnCount
  );
  if (winningCells.length >= winCount) return winningCells;

  // Проверка диагонали (слева сверху - вправо вниз)
  winningCells = checkDiagonalLeft(
    lastMoveIndex,
    cells,
    value,
    rowIndex,
    columnCount
  );
  if (winningCells.length >= winCount) return winningCells;

  // Проверка диагонали (справа сверху - влево вниз)
  winningCells = checkDiagonalRight(
    lastMoveIndex,
    cells,
    value,
    rowIndex,
    columnCount
  );
  if (winningCells.length >= winCount) return winningCells;

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
