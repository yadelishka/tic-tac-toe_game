import { ActivePlayerValue, cellViews } from "../App";

export function ActivePlayerLabel({
  activePlayerValue,
}: {
  activePlayerValue: ActivePlayerValue;
}) {
  return (
    <div className="player-label">{`Сейчас ходит ${cellViews[activePlayerValue]} `}</div>
  );
}
