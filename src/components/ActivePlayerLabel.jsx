import { cellViews } from "../App";

export function ActivePlayerLabel({ activePlayerValue }) {
  return (
    <div className="player-label">{`Сейчас ходит ${cellViews[activePlayerValue]} `}</div>
  );
}
