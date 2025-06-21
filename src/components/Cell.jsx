import { cellViews } from "../App";

export function Cell({ value, changeCellValue, isWinning }) {
  return (
    <div
      className={isWinning ? "green cell" : "cell"}
      onClick={changeCellValue}
    >
      {cellViews[value]}
    </div>
  );
}
