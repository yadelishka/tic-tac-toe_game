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

  let winCounter = 1;
  let tempIndex = lastMoveIndex + 1;
  while (
    winCounter < winCount &&
    rowIndex === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winCounter++;
    tempIndex++;
  }
  tempIndex = lastMoveIndex - 1;
  while (
    winCounter < winCount &&
    rowIndex === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winCounter++;
    tempIndex--;
  }
  if (winCounter >= winCount) return true;

  winCounter = 1;
  tempIndex = lastMoveIndex - columnCount;
  while (
    winCounter < winCount &&
    columnIndex === tempIndex % columnCount &&
    cells[tempIndex] === value
  ) {
    winCounter++;
    tempIndex -= columnCount;
  }
  tempIndex = lastMoveIndex + columnCount;
  while (
    winCounter < winCount &&
    columnIndex === tempIndex % columnCount &&
    cells[tempIndex] === value
  ) {
    winCounter++;
    tempIndex += columnCount;
  }
  if (winCounter >= winCount) return true;

  winCounter = 1;
  tempIndex = lastMoveIndex + columnCount + 1;
  let tempRow = rowIndex + 1;
  while (
    winCounter < winCount &&
    tempRow === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winCounter++;
    tempIndex += columnCount + 1;
    tempRow++;
  }
  tempIndex = lastMoveIndex - columnCount - 1;
  tempRow = rowIndex - 1;
  while (
    winCounter < winCount &&
    tempRow === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winCounter++;
    tempIndex -= columnCount + 1;
    tempRow--;
  }
  if (winCounter >= winCount) return true;

  winCounter = 1;
  tempIndex = lastMoveIndex + columnCount - 1;
  tempRow = rowIndex + 1;
  while (
    winCounter < winCount &&
    tempRow === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winCounter++;
    tempIndex += columnCount - 1;
    tempRow++;
  }
  tempIndex = lastMoveIndex - columnCount + 1;
  tempRow = rowIndex - 1;
  while (
    winCounter < winCount &&
    tempRow === Math.floor(tempIndex / columnCount) &&
    cells[tempIndex] === value
  ) {
    winCounter++;
    tempIndex -= columnCount - 1;
    tempRow--;
  }
  if (winCounter >= winCount) return true;

  return false;
}

export default function App() {
  const [activePlayerValue, setActivePlayerValue] = useState(1);
  return (
    <div>
      <h1 className="header">Крестики-нолики</h1>
      <Board
        activePlayerValue={activePlayerValue}
        setActivePlayerValue={setActivePlayerValue}
      />
      <ActivePlayerLabel activePlayerValue={activePlayerValue} />
    </div>
  );
}

function Board({ activePlayerValue, setActivePlayerValue }) {
  const [cells, setCells] = useState(initialCells);
  console.log(cells);
  function changeCellValue(index) {
    if (cells[index] !== 0) return;

    const newCells = cells.map((cell, idx) =>
      idx === index ? activePlayerValue : cell
    );

    setCells(newCells);

    const isWin = checkWinCondition(index, newCells, 5, 5, 3);

    console.log("Win:", isWin);

    setActivePlayerValue(activePlayerValue === 1 ? 2 : 1);
    console.log(index);
    console.log(cells);
  }

  return (
    <div className="board">
      {cells.map((value, index) => (
        <Cell value={value} changeCellValue={() => changeCellValue(index)} />
      ))}
    </div>
  );
}

function Cell({ value, changeCellValue }) {
  return (
    <div className="cell" onClick={changeCellValue}>
      {cellViews[value]}
    </div>
  );
}

function ActivePlayerLabel({ activePlayerValue }) {
  return (
    <div className="active-player-label">{`Сейчас ходит ${cellViews[activePlayerValue]} `}</div>
  );
}
