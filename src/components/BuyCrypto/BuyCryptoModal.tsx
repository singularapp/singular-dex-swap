import Modal from "components/Modal/Modal";
import { TransakButton } from "./TransakButton";
import { UnlimitButton } from "./UnlimitButton";
import { t, Trans } from "@lingui/macro";
import "./BuyCryptoModal.scss";

import VisaIcon from "img/bank/visa.png";
import MasterIcon from "img/bank/master.png";
import GooglePayIcon from "img/bank/g_pay.png";
import ApplePayIcon from "img/bank/apple_pay.png";

interface BuyCryptoModalProps {
  show?: boolean;
  setShow: (val: boolean) => void;
  onLaunchUnlimitCryptoOverlay: () => void;
}

export const BuyCryptoModal = ({ show, setShow, onLaunchUnlimitCryptoOverlay }: BuyCryptoModalProps) => {
  return (
    <Modal className="App-settings" isVisible={show} setIsVisible={setShow} noDivider={true}>
      <div className="App-settings-row">
        <h2 className="center">
          <Trans>Buy Crypto In An Instant</Trans>
        </h2>
      </div>
      <div className="App-settings-row subtext">
        <Trans>Buy Bitcoin, Ethereum and USDT via our partner Transak & Unlimit.</Trans>
      </div>
      <div className="buy-crypto-modal-bank-icons">
        <div className="row">
          <div className="icon" style={{ width: 110 }}>
            Bank Transfer
          </div>
          <div className="icon" style={{ width: 180 }}>
            <img src={VisaIcon} className="icon-img" />
          </div>
        </div>
        <div className="row">
          <div className="icon" style={{ width: 160 }}>
            <img src={MasterIcon} className="icon-img" />
          </div>
          <div className="icon" style={{ width: 160 }}>
            <img src={GooglePayIcon} className="icon-img" />
          </div>
        </div>
        <div className="row">
          <div className="icon" style={{ width: 180 }}>
            <img src={ApplePayIcon} className="icon-img" />
          </div>
        </div>
      </div>

      <div className="App-settings-row buttons">
        <TransakButton onOpenOverlay={() => setShow(false)} />
        <UnlimitButton onLaunchUnlimitCryptoOverlay={onLaunchUnlimitCryptoOverlay} />
      </div>
      <div className="App-settings-row disclaimer">
        <Trans>
          Buy Crypto is a service provided and hosted by our third-party provider Transak and Unlimit Crypto. Singular
          accepts no liability for any services provided by third parties, including any financial loss or damage caused
          due to the use of services available on or through any third-party provider. For any support required relating
          to Transak or Unlimit Crypto, please contact Transak or Unlimit Crypto directly.
        </Trans>
      </div>
    </Modal>
  );
};
