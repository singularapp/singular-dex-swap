import React, { useCallback } from "react";
import { FiX } from "react-icons/fi";
import { Trans } from "@lingui/macro";
import { Link } from "react-router-dom";

import { useNotifyModalState } from "lib/useNotifyModalState";
import { HeaderLink } from "./HeaderLink";
import "./Header.scss";
import { getSwapAppUrl, isHomeSite } from "lib/legacy";
import ExternalLink from "components/ExternalLink/ExternalLink";
import logoImg from "img/logo_SINGULAR.png";

type Props = {
  small?: boolean;
  clickCloseIcon?: () => void;
  openSettings?: () => void;
  showRedirectModal: (to: string) => void;
};

export function AppHeaderLinks({ small, openSettings, clickCloseIcon, showRedirectModal }: Props) {
  const { openNotifyModal } = useNotifyModalState();

  const isLeaderboardActive = useCallback(
    (match, location) => Boolean(match) || location.pathname.startsWith("/competitions"),
    []
  );
  return (
    <div className="App-header-links">
      {small && (
        <div className="App-header-links-header">
          <Link className="App-header-link-main" to="/">
            <img src={logoImg} alt="SINGULAR Logo" />
          </Link>
          <div
            className="App-header-menu-icon-block mobile-cross-menu"
            onClick={() => clickCloseIcon && clickCloseIcon()}
          >
            <FiX className="App-header-menu-icon" />
          </div>
        </div>
      )}
      <div className="App-header-link-container">
        <HeaderLink qa="perpetuals" to="/perpetuals" showRedirectModal={showRedirectModal}>
          <Trans>Perpetuals</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <ExternalLink href={getSwapAppUrl()} newTab={true}>
          <Trans>Swap</Trans>
        </ExternalLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink qa="slp" to="/slp" showRedirectModal={showRedirectModal}>
          <Trans>SLP</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink qa="referrals" to="/referrals" showRedirectModal={showRedirectModal}>
          <Trans>Referrals</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink qa="launchpad" to="/launchpad" showRedirectModal={showRedirectModal}>
          <Trans>Launchpad</Trans>
        </HeaderLink>
      </div>
      {small && (
        <div className="App-header-link-container">
          <a href="#" onClick={openNotifyModal}>
            <Trans>Alerts</Trans>
          </a>
        </div>
      )}
      {small && !isHomeSite() && (
        <div className="App-header-link-container">
          {/* eslint-disable-next-line */}
          <a href="#" data-qa="settings" onClick={openSettings}>
            <Trans>Settings</Trans>
          </a>
        </div>
      )}
    </div>
  );
}
