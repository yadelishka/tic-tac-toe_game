import { GAME_STATE } from "../App";
import { Cell } from "./Cell";

export function Board({ cells, changeCellValue, winningCells, gameState }) {
  const isDisabled = gameState === GAME_STATE.EndGame;

  return (
    <div className={isDisabled ? "board disabled" : "board"}>
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
