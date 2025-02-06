import { ARBITRUM, AVALANCHE } from "config/chains";
import { TOKENS_BY_SYMBOL_MAP } from "sdk/configs/tokens";

export const PRODUCTION_HOST = "https://app.gmx.io";

const oneInchTokensMap = {
  [ARBITRUM]: {
    BTC: "WBTC",
  },
  [AVALANCHE]: {
    BTC: "BTC.b",
    ETH: "WETH.e",
    WBTC: "WBTC.e",
  },
};

export enum DOCUMENT_LINKS {
  PerpetualsTrading = "https://singulardao.gitbook.io/singular-dao/tokenomics-and-governance/perpetual-dex/perpetuals-trading",
  AboutFee = "https://singulardao.gitbook.io/singular-dao/tokenomics-and-governance/perpetual-dex/perpetuals-trading",
  AdaptiveFunding = "https://singulardao.gitbook.io/singular-dao/tokenomics-and-governance/perpetual-dex/perpetuals-trading",
  IncentiveDistribution = "https://singulardao.gitbook.io/singular-dao/tokenomics-and-governance/perpetual-dex/perpetuals-trading",
}

export function get1InchSwapUrl(chainId: number, from?: string, to?: string) {
  const rootUrl = `https://app.1inch.io/#/${chainId}/simple/swap`;
  const chainTokensMap = TOKENS_BY_SYMBOL_MAP[chainId];
  const isInvalidInput = !from || !to || !chainTokensMap[from] || !chainTokensMap[to];
  if (isInvalidInput) {
    return rootUrl;
  }
  const fromToken = oneInchTokensMap[chainId]?.[from] || from;
  const toToken = oneInchTokensMap[chainId]?.[to] || to;
  return `${rootUrl}/${fromToken}/${toToken}`;
}

export function get1InchSwapUrlFromAddresses(chainId: number, fromAddress?: string, toAddress?: string) {
  const addressesStr = [fromAddress, toAddress].filter(Boolean).join("/");
  return `https://app.1inch.io/#/${chainId}/simple/swap/${addressesStr}`;
}

export function getLeaderboardLink(chainId) {
  if (chainId === ARBITRUM) {
    return "https://www.gmx.house/arbitrum/leaderboard";
  }
  if (chainId === AVALANCHE) {
    return "https://www.gmx.house/avalanche/leaderboard";
  }
  return "https://www.gmx.house";
}

export const DOCS_LINKS = {
  multiplierPoints: DOCUMENT_LINKS.PerpetualsTrading,
  fundingFees: DOCUMENT_LINKS.AboutFee,
  adaptiveFunding: DOCUMENT_LINKS.AdaptiveFunding,
  borrowingFees: DOCUMENT_LINKS.AboutFee,
};

export const ARBITRUM_INCENTIVES_V2_URL =
  "https://gmxio.notion.site/GMX-STIP-Bridge-Incentives-6967a56615b644eabc10f9a1a81b83ab";
export const AVALANCHE_INCENTIVES_V2_URL =
  "https://gmxio.notion.site/GMX-Summer-Boost-provide-liquidity-and-trade-perpetuals-to-grab-your-share-of-AVAX-rewards-13638f2e28934460a242f72def4f7d36";

export function getIncentivesV2Url(chainId: number): string {
  return DOCUMENT_LINKS.IncentiveDistribution;
  // if (chainId === ARBITRUM) {
  //   return ARBITRUM_INCENTIVES_V2_URL;
  // }

  // if (chainId === AVALANCHE) {
  //   return AVALANCHE_INCENTIVES_V2_URL;
  // }
  // return ARBITRUM_INCENTIVES_V2_URL;
}

export enum STATIC_LINKS {
  PrivacyPolicy = "https://singulardex.com/privacy-policy.html",
}
