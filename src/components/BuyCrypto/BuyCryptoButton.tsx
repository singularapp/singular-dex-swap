import "./BuyCrypto.scss";

interface BuyCryptoButtonProps {
  onOpen: () => void;
}

export function BuyCryptoButton({ onOpen }: BuyCryptoButtonProps) {
  return (
    <div className="App-header-buy-crypto">
      <button type="button" className="transak-buy-crypto-button" onClick={onOpen}>
        Buy Crypto
      </button>
    </div>
  );
}
