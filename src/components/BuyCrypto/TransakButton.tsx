import { TransakConfig, Transak } from "@transak/transak-sdk";
import "./BuyCrypto.scss";

const transakConfig: TransakConfig = {
  apiKey: import.meta.env.VITE_APP_TRANSAK_KEY || "", // (Required)
  environment: Transak.ENVIRONMENTS.PRODUCTION, // (Required),
  defaultNetwork: "arbitrum",
};

function launchTransak() {
  const transak = new Transak(transakConfig);

  transak.init();

  // To get all the events
  Transak.on("*", (data) => {
    console.log(data);
  });

  // This will trigger when the user closed the widget
  Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
    console.log("Transak SDK closed!");
  });

  /*
   * This will trigger when the user has confirmed the order
   * This doesn't guarantee that payment has completed in all scenarios
   * If you want to close/navigate away, use the TRANSAK_ORDER_SUCCESSFUL event
   */
  Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData) => {
    console.log(orderData);
  });

  /*
   * This will trigger when the user marks payment is made
   * You can close/navigate away at this event
   */
  Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
    console.log(orderData);
    transak.close();
  });
}

export function TransakButton({ onOpenOverlay }: { onOpenOverlay: () => void }) {
  return (
    <button
      type="button"
      className="button primary-action w-full center"
      onClick={(e) => {
        launchTransak();
        onOpenOverlay();
      }}
    >
      Buy Crypto with Transak
    </button>
  );
}
