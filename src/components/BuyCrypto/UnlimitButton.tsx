import "./BuyCrypto.scss";

export function UnlimitButton({ onLaunchUnlimitCryptoOverlay }: { onLaunchUnlimitCryptoOverlay: () => void }) {
  return (
    <button type="button" className="button primary-action w-full center" onClick={onLaunchUnlimitCryptoOverlay}>
      Buy Crypto with Unlimit
    </button>
  );
}
