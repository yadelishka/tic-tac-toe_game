import { ConfirmationModal } from "../components/shared/ConfirmationModal";
import { Button } from "../components/shared/Button";
import { load } from "../utils/localStorage";

interface MenuPageProps {
  onStartNewGame: () => void;
  onContinueGame: () => void;
  showConfirmation: boolean;
  setShowConfirmation: (value: boolean) => void;
  onNewGameClick: () => void;
}

export function MenuPage({
  onStartNewGame,
  onContinueGame,
  showConfirmation,
  setShowConfirmation,
  onNewGameClick,
}: MenuPageProps) {
  const gameData = load("gameSave");
  const isBlockContinue = !gameData;

  console.log(isBlockContinue);

  return (
    <>
      <div className="menu">
        <Button disabled={isBlockContinue} onClick={onContinueGame}>
          Продолжить
        </Button>
        <Button onClick={onNewGameClick}>Новая игра</Button>
        <Button onClick={() => {}}>Об авторе</Button>
      </div>
      <ConfirmationModal
        message="Вы уверены, что хотите начать новую игру?"
        onConfirm={() => {
          setShowConfirmation(false);
          onStartNewGame();
        }}
        onCancel={() => setShowConfirmation(false)}
        modalClassNameVisible="new-game-modal-visible"
        modalClassName="new-game-modal"
        buttonClassName="button"
        showConfirmation={showConfirmation}
        overlayClassName={"confirm-modal-overlay"}
      />
    </>
  );
}
