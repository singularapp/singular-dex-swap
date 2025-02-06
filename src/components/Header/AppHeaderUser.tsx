import { Trans } from "@lingui/macro";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { useRouteMatch } from "react-router-dom";

import connectWalletImg from "img/ic_wallet_24.svg";

import { ARBITRUM, AVALANCHE, AVALANCHE_FUJI, getChainName } from "config/chains";
import { isDevelopment } from "config/env";
import { getIcon } from "config/icons";

import { useChainId } from "lib/chains";
import { getAccountUrl, isHomeSite } from "lib/legacy";
import { sendUserAnalyticsConnectWalletClickEvent } from "lib/userAnalytics";
import useWallet from "lib/wallets/useWallet";
import { useRedirectPopupTimestamp } from "lib/useRedirectPopupTimestamp";

import AddressDropdown from "../AddressDropdown/AddressDropdown";
import ConnectWalletButton from "../Common/ConnectWalletButton";
import LanguagePopupHome from "../NetworkDropdown/LanguagePopupHome";
import NetworkDropdown from "../NetworkDropdown/NetworkDropdown";

import "./Header.scss";
import LanguageDropdown from "components/LanguageDropdown/LanguageDropdown";
import { BuyCryptoButton } from "components/BuyCrypto/BuyCryptoButton";

type Props = {
  openSettings: () => void;
  small?: boolean;
  disconnectAccountAndCloseSettings: () => void;
  showRedirectModal: (to: string) => void;
  menuToggle?: React.ReactNode;
  openBuyCryptoModal: () => void;
};

const NETWORK_OPTIONS = [
  {
    label: getChainName(ARBITRUM),
    value: ARBITRUM,
    icon: getIcon(ARBITRUM, "network"),
    color: "#264f79",
  },
  {
    label: getChainName(AVALANCHE),
    value: AVALANCHE,
    icon: getIcon(AVALANCHE, "network"),
    color: "#E841424D",
  },
];

if (isDevelopment()) {
  NETWORK_OPTIONS.push({
    label: getChainName(AVALANCHE_FUJI),
    value: AVALANCHE_FUJI,
    icon: getIcon(AVALANCHE_FUJI, "network"),
    color: "#E841424D",
  });
}

export function AppHeaderUser({
  small,
  menuToggle,
  openSettings,
  disconnectAccountAndCloseSettings,
  showRedirectModal,
  openBuyCryptoModal,
}: Props) {
  const { chainId } = useChainId();
  const { active, account } = useWallet();
  const { openConnectModal } = useConnectModal();
  const showConnectionOptions = !isHomeSite();
  const [redirectPopupTimestamp] = useRedirectPopupTimestamp();

  const isOnTradePageV1 = useRouteMatch("/v1");
  const isOnTradePageV2 = useRouteMatch("/trade");
  const shouldHideTradeButton = isOnTradePageV1 || isOnTradePageV2;

  const selectorLabel = getChainName(chainId);

  if (!active || !account) {
    return (
      <div className="App-header-user">
        {showConnectionOptions && openConnectModal ? (
          <>
            <BuyCryptoButton onOpen={openBuyCryptoModal} />
            <LanguageDropdown
              small={small}
              networkOptions={NETWORK_OPTIONS}
              selectorLabel={selectorLabel}
              openSettings={openSettings}
            />
            <ConnectWalletButton
              onClick={() => {
                sendUserAnalyticsConnectWalletClickEvent("Header");
                openConnectModal();
              }}
              imgSrc={connectWalletImg}
            >
              {small ? <Trans>Connect</Trans> : <Trans>Connect Wallet</Trans>}
            </ConnectWalletButton>
            <NetworkDropdown
              small={small}
              networkOptions={NETWORK_OPTIONS}
              selectorLabel={selectorLabel}
              openSettings={openSettings}
            />
          </>
        ) : (
          <LanguagePopupHome />
        )}
        {menuToggle}
      </div>
    );
  }

  const accountUrl = getAccountUrl(chainId, account);

  return (
    <div className="App-header-user">
      {showConnectionOptions ? (
        <>
          <div>
            <BuyCryptoButton onOpen={openBuyCryptoModal} />
          </div>
          <div data-qa="user-address" className="App-header-user-address">
            <LanguageDropdown
              small={small}
              networkOptions={NETWORK_OPTIONS}
              selectorLabel={selectorLabel}
              openSettings={openSettings}
            />
          </div>
          <div>
            <AddressDropdown
              account={account}
              accountUrl={accountUrl}
              disconnectAccountAndCloseSettings={disconnectAccountAndCloseSettings}
            />
          </div>
          <NetworkDropdown
            small={small}
            networkOptions={NETWORK_OPTIONS}
            selectorLabel={selectorLabel}
            openSettings={openSettings}
          />
        </>
      ) : (
        <LanguagePopupHome />
      )}
      {menuToggle}
    </div>
  );
}
