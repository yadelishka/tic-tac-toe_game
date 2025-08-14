import { cellViews } from "../App";

interface GameEndModalProps {
  activePlayerValue: number;
  isEndGame: boolean;
}

export function GameEndModal({
  activePlayerValue,
  isEndGame,
}: GameEndModalProps) {
  return (
    <div
      className={
        isEndGame ? "game-end-modal game-end-modal-visible" : "game-end-modal"
      }
    >{`${
      cellViews[activePlayerValue as keyof typeof cellViews]
    } победил!`}</div>
  );
}
