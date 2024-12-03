import { ethers } from "ethers";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ToastContainer, cssTransition } from "react-toastify";
import { useDisconnect } from "wagmi";

import {
  CURRENT_PROVIDER_LOCALSTORAGE_KEY,
  REFERRAL_CODE_KEY,
  SHOULD_EAGER_CONNECT_LOCALSTORAGE_KEY,
} from "config/localStorage";
import { TOAST_AUTO_CLOSE_TIME } from "config/ui";
import { decodeReferralCode, encodeReferralCode } from "domain/referrals";
import { useRealChainIdWarning } from "lib/chains/useRealChainIdWarning";
import { REFERRAL_CODE_QUERY_PARAM, getAppBaseUrl, isHomeSite } from "lib/legacy";
import useRouteQuery from "lib/useRouteQuery";

import EventToastContainer from "components/EventToast/EventToastContainer";
import useEventToast from "components/EventToast/useEventToast";
import { Header } from "components/Header/Header";
import { RedirectPopupModal } from "components/ModalViews/RedirectModal";
import { NotifyModal } from "components/NotifyModal/NotifyModal";
import { SettingsModal } from "components/SettingsModal/SettingsModal";
import { SubaccountModal } from "components/Synthetics/SubaccountModal/SubaccountModal";

import { useAccountInitedMetric, useOpenAppMetric } from "lib/metrics";
import { useConfigureMetrics } from "lib/metrics/useConfigureMetrics";
import { HomeRoutes } from "./HomeRoutes";
import { MainRoutes } from "./MainRoutes";
import { useConfigureUserAnalyticsProfile } from "lib/userAnalytics/useConfigureUserAnalyticsProfile";
import { useWalletConnectedUserAnalyticsEvent } from "lib/userAnalytics/useWalletConnectedEvent";
import { userAnalytics } from "lib/userAnalytics/UserAnalytics";
import { LandingPageAgreementConfirmationEvent } from "lib/userAnalytics/types";
import { GateFiDisplayModeEnum, GateFiSDK } from "@gatefi/js-sdk";
import { randomHash } from "lib/crypto";
import { BuyCryptoModal } from "components/BuyCrypto/BuyCryptoModal";
import classNames from "classnames";

const Zoom = cssTransition({
  enter: "zoomIn",
  exit: "zoomOut",
  appendPosition: false,
  collapse: true,
  collapseDuration: 200,
});

export function AppRoutes() {
  const { disconnect } = useDisconnect();
  const isHome = isHomeSite();
  const location = useLocation();
  const history = useHistory();

  useEventToast();
  useConfigureMetrics();
  useConfigureUserAnalyticsProfile();
  useOpenAppMetric();
  useAccountInitedMetric();
  useWalletConnectedUserAnalyticsEvent();

  const query = useRouteQuery();

  useEffect(() => {
    let referralCode = query.get(REFERRAL_CODE_QUERY_PARAM);
    if (!referralCode || referralCode.length === 0) {
      const params = new URLSearchParams(window.location.search);
      referralCode = params.get(REFERRAL_CODE_QUERY_PARAM);
    }

    if (referralCode && referralCode.length <= 20) {
      const encodedReferralCode = encodeReferralCode(referralCode);
      if (encodedReferralCode !== ethers.ZeroHash) {
        localStorage.setItem(REFERRAL_CODE_KEY, encodedReferralCode);
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.has(REFERRAL_CODE_QUERY_PARAM)) {
          queryParams.delete(REFERRAL_CODE_QUERY_PARAM);
          history.replace({
            search: queryParams.toString(),
          });
        }
      }
    }
  }, [query, history, location]);

  const disconnectAccountAndCloseSettings = () => {
    disconnect();
    localStorage.removeItem(SHOULD_EAGER_CONNECT_LOCALSTORAGE_KEY);
    localStorage.removeItem(CURRENT_PROVIDER_LOCALSTORAGE_KEY);
    setIsSettingsVisible(false);
  };

  /**
   * Buy Crypto via Fiat - Transak & Unlimit Crypto
   */
  const [isBuyCryptoModalVisible, setBuyCryptoModalVisible] = useState(false);
  const overlayInstanceSDK = useRef<GateFiSDK | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const handleLaunchUnlimitCrypto = () => {
    setBuyCryptoModalVisible(false);
    try {
      if (overlayInstanceSDK.current) {
        if (isOverlayVisible) {
          overlayInstanceSDK.current.hide();
          setIsOverlayVisible(false);
        } else {
          overlayInstanceSDK.current.show();
          setIsOverlayVisible(true);
        }
      } else {
        const randomString = randomHash(64);
        overlayInstanceSDK.current = new GateFiSDK({
          merchantId: import.meta.env.VITE_APP_UNLIMIT_CRYPTO_PARTNER_ID || "",
          displayMode: GateFiDisplayModeEnum.Overlay,
          nodeSelector: "#overlay-button",
          isSandbox: true,
          externalId: randomString,
          defaultFiat: {
            currency: "USD",
            amount: "0",
          },
          defaultCrypto: {
            currency: "ETH",
          },
        });
      }
      overlayInstanceSDK.current?.show();
      setIsOverlayVisible(true);
    } catch (e) {}
  };
  // ---------------------------------------------------------------------------

  const [redirectModalVisible, setRedirectModalVisible] = useState(false);
  const [shouldHideRedirectModal, setShouldHideRedirectModal] = useState(false);

  const [selectedToPage, setSelectedToPage] = useState("");
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const openSettings = useCallback(() => {
    setIsSettingsVisible(true);
  }, []);

  const localStorageCode = window.localStorage.getItem(REFERRAL_CODE_KEY);
  const baseUrl = getAppBaseUrl();
  let appRedirectUrl = baseUrl + selectedToPage;
  if (localStorageCode && localStorageCode.length > 0 && localStorageCode !== ethers.ZeroHash) {
    const decodedRefCode = decodeReferralCode(localStorageCode);
    if (decodedRefCode) {
      appRedirectUrl = `${appRedirectUrl}?ref=${decodedRefCode}`;
    }
  }

  const showRedirectModal = useCallback((to: string) => {
    userAnalytics.pushEvent<LandingPageAgreementConfirmationEvent>({
      event: "LandingPageAction",
      data: {
        action: "AgreementConfirmationDialogShown",
      },
    });
    setRedirectModalVisible(true);
    setSelectedToPage(to);
  }, []);

  useRealChainIdWarning();

  return (
    <>
      <div className="App">
        <div className={classNames("App-content", { launchpad: location.pathname.includes("/launchpad") })}>
          <Header
            disconnectAccountAndCloseSettings={disconnectAccountAndCloseSettings}
            openSettings={openSettings}
            showRedirectModal={showRedirectModal}
            openBuyCryptoModal={() => setBuyCryptoModalVisible(true)}
          />
          {isHome && <HomeRoutes showRedirectModal={showRedirectModal} />}
          {!isHome && <MainRoutes openSettings={openSettings} />}
        </div>
      </div>
      <ToastContainer
        limit={1}
        transition={Zoom}
        position="bottom-right"
        autoClose={TOAST_AUTO_CLOSE_TIME}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        draggable={false}
        pauseOnHover
        theme="dark"
        icon={false}
      />
      <EventToastContainer />
      <RedirectPopupModal
        redirectModalVisible={redirectModalVisible}
        setRedirectModalVisible={setRedirectModalVisible}
        appRedirectUrl={appRedirectUrl}
        setShouldHideRedirectModal={setShouldHideRedirectModal}
        shouldHideRedirectModal={shouldHideRedirectModal}
      />
      <BuyCryptoModal
        show={isBuyCryptoModalVisible}
        setShow={setBuyCryptoModalVisible}
        onLaunchUnlimitCryptoOverlay={handleLaunchUnlimitCrypto}
      />
      <SettingsModal isSettingsVisible={isSettingsVisible} setIsSettingsVisible={setIsSettingsVisible} />
      <SubaccountModal />
      <NotifyModal />
      <div id="overlay-button"></div>
    </>
  );
}
