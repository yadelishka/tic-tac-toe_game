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

export function checkWinCondition(
  lastMoveIndex,
  cells,
  rowCount,
  columnCount,
  winCount
) {
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
