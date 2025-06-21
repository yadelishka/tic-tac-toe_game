import { Button } from "../components/shared/Button";
import { load } from "../utils/localStorage";

export function MenuPage({ onNewGame }) {
  const gameData = load("gameSave");
  const isBlockContinue = !gameData;

  console.log(isBlockContinue);

  return (
    <div className="menu">
      <Button disabled={isBlockContinue} onClick={onNewGame}>
        Продолжить
      </Button>
      <Button onClick={onNewGame}>Новая игра</Button>
      <Button>Об авторе</Button>
    </div>
  );
}
