import { CellState, cellViews } from "../App";

interface CellProps {
  value: CellState;
  changeCellValue: () => void;
  isWinning: boolean;
}

export function Cell({ value, changeCellValue, isWinning }: CellProps) {
  return (
    <div
      className={isWinning ? "green cell" : "cell"}
      onClick={changeCellValue}
    >
      {cellViews[value]}
    </div>
  );
}
