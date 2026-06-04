import { useBasket } from "@/context/BasketContext";
import { CloseButton, FloatingButton, MobileOverlay, BasketWrapper } from "@/components/Basket/style";

const Basket = () => {
  const { selectedBets, removeBet, isOpen, openBasket, closeBasket } = useBasket();

  const totalOdds = selectedBets
    .reduce((acc, item) => acc * parseFloat(item.oddValue), 1)
    .toFixed(2);

  return (
    <>
      <MobileOverlay isOpen={isOpen} onClick={closeBasket} />

      <BasketWrapper isOpen={isOpen}>
        <CloseButton onClick={closeBasket}>← Kapat</CloseButton>

        <h3>Toplam maç sayısı ({selectedBets.length})</h3>

        {selectedBets.length === 0 ? (
          <p>Kupona eklemek için bir orana tıklayın</p>
        ) : (
          <>
            {selectedBets.map((bet) => (
              <div key={bet.id}>
                <span>Kod:{bet.betCode}</span>
                {" "}
                <span>{bet.matchName}</span>
                {" — "}
                <span>{bet.oddType}</span>
                {" "}
                <strong>{bet.oddValue}</strong>
                {" "}
                <button onClick={() => removeBet(bet.id)}>×</button>
              </div>
            ))}
            <p>Toplam Oran: <strong>{totalOdds}</strong></p>
            {selectedBets.length > 3 && <button>Kuponu Oyna</button>}
          </>
        )}
      </BasketWrapper>

      {selectedBets.length > 0 && (
        <FloatingButton onClick={openBasket}>
          {selectedBets.length}
        </FloatingButton>
      )}
    </>
  );
};

export default Basket;
