import { ConfirmationModal } from "../components/shared/ConfirmationModal";
import { Button } from "../components/shared/Button";
import { load } from "../utils/localStorage";

export function MenuPage({
  onStartNewGame,
  onContinueGame,
  showConfirmation,
  setShowConfirmation,
  onNewGameClick,
}) {
  const gameData = load("gameSave");
  const isBlockContinue = !gameData;

  console.log(isBlockContinue);

  return (
    <>
      <div className="menu">
        <Button
          disabled={isBlockContinue}
          onClick={onContinueGame}
          disabledClassName={isBlockContinue}
        >
          Продолжить
        </Button>
        <Button onClick={onNewGameClick}>Новая игра</Button>
        <Button>Об авторе</Button>
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
