// date format: d MMM yyyy, H:mm, time should be specifed based on UTC time

import { TokenSymbolWithIcon } from "components/TokenSymbolWithIcon/TokenSymbolWithIcon";
import { type JSX } from "react";
import { Link } from "react-router-dom";
import { DOCUMENT_LINKS, getIncentivesV2Url } from "./links";
import { Trans } from "@lingui/macro";
import ExternalLink from "components/ExternalLink/ExternalLink";
import { ARBITRUM, AVALANCHE } from "./chains";
import { getNormalizedTokenSymbol } from "./tokens";

export type EventData = {
  id: string;
  title: string;
  isActive?: boolean;
  startDate?: string;
  endDate: string;
  bodyText: string | string[] | JSX.Element;
  chains?: number[];
  link?: {
    text: string;
    href: string;
    /**
     * @default false
     */
    newTab?: boolean;
  };
};

export const homeEventsData: EventData[] = [];

export const appEventsData: EventData[] = [
  {
    id: "pol-aave-pepe-uni-markets-arbitrum",
    title: "POL, AAVE, PEPE, and UNI markets added on Arbitrum",
    isActive: true,
    startDate: "17 Oct 2024, 00:00",
    endDate: "31 Oct 2024, 00:00",
    bodyText: (
      <>
        <Link to="/perpetuals">Trade</Link> <TokenSymbolWithIcon symbol="POL" />
        /USD, <TokenSymbolWithIcon symbol="AAVE" />
        /USD, <TokenSymbolWithIcon symbol="PEPE" />
        /USD and <TokenSymbolWithIcon symbol="UNI" />
        /USD, or <Link to="/perpetuals">provide liquidity</Link> to these pools using <TokenSymbolWithIcon symbol="ETH" /> or{" "}
        <TokenSymbolWithIcon symbol="USDC" />.
      </>
    ),
  },
  {
    id: "eigen-sats-market-arbitrum",
    title: "EIGEN and SATS markets added on Arbitrum",
    isActive: true,
    startDate: "10 Oct 2024, 00:00",
    endDate: "24 Oct 2024, 00:00",
    bodyText: (
      <>
        <Link to="/perpetuals">Trade</Link> <TokenSymbolWithIcon symbol="EIGEN" />
        /USD and <TokenSymbolWithIcon symbol="SATS" />
        /USD, or <Link to="/perpetuals">provide liquidity</Link> to these pools by using{" "}
        <TokenSymbolWithIcon symbol="WETH" />, <TokenSymbolWithIcon symbol="WBTC" /> or{" "}
        <TokenSymbolWithIcon symbol="USDC" />.
      </>
    ),
  },
  {
    id: "tbtc-market-arbitrum",
    title: "BTC/USD [tBTC] market added on Arbitrum",
    isActive: true,
    startDate: "10 Sep 2024, 00:00",
    endDate: "25 Sep 2024, 00:00",
    bodyText: (
      <>
        <Link to="/perpetuals">Trade</Link> <TokenSymbolWithIcon symbol="BTC" />
        /USD, or{" "}
        <Link to="/perpetuals/?market=0xd62068697bCc92AF253225676D618B0C9f17C663&operation=buy&scroll=1">
          provide liquidity
        </Link>{" "}
        to this pool by using <TokenSymbolWithIcon symbol="tBTC" />.
      </>
    ),
  },
  {
    id: "btc-glv-market",
    title: "GLV [BTC-USDC] is live",
    isActive: true,
    startDate: "10 Sep 2024, 00:00",
    endDate: "24 Sep 2024, 00:00",
    bodyText: (
      <>
        <Link to="/perpetuals/?market=0xdF03EEd325b82bC1d4Db8b49c30ecc9E05104b96&operation=buy&scroll=1">Buy</Link> the
        second automatically rebalanced vault combining multiple SD tokens with BTC, USDC, or eligible SD tokens on
        Arbitrum.
      </>
    ),
    link: {
      text: "Read more",
      href: DOCUMENT_LINKS.PerpetualsTrading,
      newTab: true,
    },
  },
  {
    id: "zero-price-impact",
    title: "Zero price impact on BTC/USD and ETH/USD single-side pools",
    isActive: true,
    startDate: "30 Aug 2024, 00:00",
    endDate: "30 Sep 2024, 00:00",
    bodyText: (
      <>
        <Link to="/perpetuals">Trade</Link> with no price impact on <TokenSymbolWithIcon symbol="BTC" />
        /USD [BTC] and <TokenSymbolWithIcon symbol="ETH" />
        /USD [WETH] markets on Arbitrum.
      </>
    ),
  },
  {
    id: "ordi-stx-market-arbitrum",
    title: "ORDI and STX markets added on Arbitrum",
    isActive: true,
    startDate: "14 Aug 2024, 00:00",
    endDate: "28 Aug 2024, 00:00",
    bodyText: (
      <>
        <Link to="/perpetuals">Trade</Link> ORDI/USD and STX/USD, or <Link to="/perpetuals">provide liquidity</Link> to these
        pools by using <TokenSymbolWithIcon symbol="wBTC" /> or <TokenSymbolWithIcon symbol="USDC" />.
      </>
    ),
  },
  {
    id: "shib-market-arbitrum",
    title: "SHIB/USD [WETH-USDC] market added on Arbitrum",
    isActive: true,
    startDate: "07 Aug 2024, 00:00",
    endDate: "21 Aug 2024, 00:00",
    bodyText: (
      <>
        Trade SHIB/USD or provide liquidity using <TokenSymbolWithIcon symbol="WETH" /> or{" "}
        <TokenSymbolWithIcon symbol="USDC" />.
      </>
    ),
  },
  {
    id: "ethena-markets-arbitrum",
    title: "ETH/USD [wstETH-USDe] market added on Arbitrum",
    isActive: true,
    startDate: "30 Jul 2024, 00:00",
    endDate: "14 Aug 2024, 00:00",
    bodyText: "Trade ETH/USD or provide liquidity using wstETH or USDe.",
  },
  {
    id: "pepe-and-wif-markets-arbitrum",
    title: "PEPE and WIF markets added on Arbitrum",
    isActive: true,
    startDate: "17 Jul 2024, 00:00",
    endDate: "01 Aug 2024, 00:00",
    bodyText: "Trade PEPE/USD and WIF/USD, or provide liquidity to these pools by using PEPE, WIF, or USDC.",
  },
  {
    id: "arbitrum-and-avalanche-incentives-launch-3",
    title: "Arbitrum and Avalanche Incentives are Live",
    isActive: true,
    endDate: "16 Sep 2024, 00:00",
    startDate: "03 Jul 2024, 00:00",
    bodyText: (
      <Trans>
        Incentives are live for <ExternalLink href={getIncentivesV2Url(ARBITRUM)}>Arbitrum</ExternalLink> and{" "}
        <ExternalLink href={getIncentivesV2Url(AVALANCHE)}>Avalanche</ExternalLink> SD pools and V2 trading.
      </Trans>
    ),
  },
  {
    id: "arbitrum-incentives-launch-2",
    title: "Arbitrum Incentives are Live",
    isActive: true,
    endDate: "03 Jul 2024, 00:00",
    bodyText: "Incentives are live for Arbitrum SD pools and V2 trading.",
    link: {
      text: "Read more",
      href: getIncentivesV2Url(ARBITRUM),
      newTab: true,
    },
  },
  {
    id: "btc-eth-single-token-markets",
    title: "New BTC/USD and ETH/USD single token SD pools",
    isActive: true,
    endDate: "2 May 2024, 23:59",
    bodyText: [
      "Use only BTC or ETH to provide liquidity to BTC/USD or ETH/USD. Now, you can buy SD without being exposed to stablecoins.",
    ],
    link: {
      text: "View SD pools",
      href: "/#/perpetuals",
    },
  },
  {
    id: "max-leverage-doge",
    title: "Max leverage increased",
    isActive: true,
    endDate: "14 Jun 2024, 0:00",
    bodyText: (
      <>
        Trade <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("DOGE")} />,{" "}
        <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("BNB")} />,{" "}
        <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("SOL")} />,{" "}
        <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("LTC")} />,{" "}
        <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("LINK")} />
        {" and "}
        <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("XRP")} /> with up to 100x leverage,
        <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("ARB")} /> with up to 75x leverage and{" "}
        <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("ATOM")} />,{" "}
        <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("AVAX")} />
        {" and "}
        <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("UNI")} /> with up to 60x on Arbitrum.
      </>
    ),
  },
  {
    id: "account-dashboard-feature",
    title: "New PnL Analysis Dashboard",
    isActive: true,
    endDate: "21 Jun 2024, 0:00",
    bodyText:
      "Check the new PnL dashboard for traders under the wallet submenu or the trades history tab when connected.",
  },
  {
    id: "avalanche-single-side-btc-eth-avax-markets",
    title: "New BTC/USD, ETH/USD, and AVAX/USD single token SD pools on Avalanche",
    isActive: true,
    bodyText: (
      <>
        Use only <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("BTC")} />,{" "}
        <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("ETH")} />, or{" "}
        <TokenSymbolWithIcon symbol={getNormalizedTokenSymbol("AVAX")} /> to provide liquidity to BTC/USD, ETH/USD, or
        AVAX/USD. Buy SD without being exposed to stablecoins.
      </>
    ),
    endDate: "14 Jul 2024, 23:59",
  },
];
