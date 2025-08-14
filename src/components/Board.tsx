import { GameState } from "../App";
import { Cell } from "./Cell";

interface BoardProps {
  cells: number[];
  changeCellValue: (index: number) => void;
  winningCells: number[];
  gameState: GameState;
}

export function Board({
  cells,
  changeCellValue,
  winningCells,
  gameState,
}: BoardProps) {
  const isDisabled = gameState === GameState.EndGame;

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
