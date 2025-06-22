import { Button } from "../components/shared/Button";
import { load } from "../utils/localStorage";

export function MenuPage({ onStartNewGame, onContinueGame }) {
  const gameData = load("gameSave");
  const isBlockContinue = !gameData;

  console.log(isBlockContinue);

  return (
    <div className="menu">
      <Button
        disabled={isBlockContinue}
        onClick={onContinueGame}
        disabledClassName={isBlockContinue}
      >
        Продолжить
      </Button>
      <Button onClick={onStartNewGame}>Новая игра</Button>
      <Button>Об авторе</Button>
    </div>
  );
}
