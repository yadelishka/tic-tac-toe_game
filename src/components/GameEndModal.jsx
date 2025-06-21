import { cellViews } from "../App";

export function GameEndModal({ activePlayerValue, isEndGame }) {
  return (
    <div
      className={
        isEndGame ? "game-end-modal game-end-modal-visible" : "game-end-modal"
      }
    >{`${cellViews[activePlayerValue]} победил!`}</div>
  );
}
