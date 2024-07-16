import { Trans, t } from "@lingui/macro";
import cx from "classnames";
import { useCallback, useMemo, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useMedia } from "react-use";

import { getNormalizedTokenSymbol } from "config/tokens";
import {
  MarketInfo,
  MarketTokensAPRData,
  MarketsInfoData,
  getMarketIndexName,
  getMarketPoolName,
  getMintableMarketTokens,
  getSellableMarketToken,
} from "domain/synthetics/markets";
import { TokenData, TokensData } from "domain/synthetics/tokens";
import { useGmTokensFavorites } from "domain/synthetics/tokens/useGmTokensFavorites";
import useSortedPoolsWithIndexToken from "domain/synthetics/trade/useSortedPoolsWithIndexToken";
import { useLocalizedMap } from "lib/i18n";
import { USD_DECIMALS } from "lib/legacy";
import { formatAmountHuman, formatTokenAmount, formatUsd } from "lib/numbers";
import { getByKey } from "lib/objects";

import { AprInfo } from "components/AprInfo/AprInfo";
import SearchInput from "components/SearchInput/SearchInput";
import Tab from "components/Tab/Tab";
import TokenIcon from "components/TokenIcon/TokenIcon";
import {
  indexTokensFavoritesTabOptionLabels,
  indexTokensFavoritesTabOptions,
} from "domain/synthetics/tokens/useIndexTokensFavorites";
import {
  SELECTOR_BASE_MOBILE_THRESHOLD,
  SelectorBase,
  SelectorBaseMobileHeaderContent,
  useSelectorClose,
} from "../SelectorBase/SelectorBase";

type Props = {
  marketsInfoData?: MarketsInfoData;
  marketTokensData?: TokensData;
  marketsTokensAPRData?: MarketTokensAPRData;
  marketsTokensIncentiveAprData?: MarketTokensAPRData;
  // eslint-disable-next-line react/no-unused-prop-types
  currentMarketInfo?: MarketInfo;
};

export default function MarketTokenSelector(props: Props) {
  const { marketsTokensIncentiveAprData, marketsTokensAPRData, marketsInfoData, marketTokensData, currentMarketInfo } =
    props;
  const indexName = currentMarketInfo && getMarketIndexName(currentMarketInfo);
  const poolName = currentMarketInfo && getMarketPoolName(currentMarketInfo);

  const iconName = currentMarketInfo?.isSpotOnly
    ? getNormalizedTokenSymbol(currentMarketInfo.longToken.symbol) +
      getNormalizedTokenSymbol(currentMarketInfo.shortToken.symbol)
    : currentMarketInfo?.indexToken.symbol;

  return (
    <SelectorBase
      handleClassName="inline-block"
      popoverYOffset={18}
      popoverXOffset={-8}
      popoverPlacement="bottom-start"
      label={
        <div className="inline-flex items-center">
          {currentMarketInfo ? (
            <>
              <TokenIcon className="mr-8" symbol={iconName} displaySize={30} importSize={40} />
              <div>
                <div className="flex items-center text-16">
                  <span>GM{indexName && `: ${indexName}`}</span>
                  <span className="ml-3 text-12 text-gray-300 group-hover/selector-base:text-[color:inherit]">
                    {poolName && `[${poolName}]`}
                  </span>
                </div>
                <div className="text-12 text-gray-400 group-hover/selector-base:text-[color:inherit]">
                  GMX Market Tokens
                </div>
              </div>
            </>
          ) : (
            "..."
          )}
        </div>
      }
      modalLabel={t`GMX Market Tokens`}
      mobileModalContentPadding={false}
    >
      <MarketTokenSelectorInternal
        marketsTokensIncentiveAprData={marketsTokensIncentiveAprData}
        marketsTokensAPRData={marketsTokensAPRData}
        marketsInfoData={marketsInfoData}
        marketTokensData={marketTokensData}
        currentMarketInfo={currentMarketInfo}
      />
    </SelectorBase>
  );
}

function MarketTokenSelectorInternal(props: Props) {
  const { marketsTokensIncentiveAprData, marketsTokensAPRData, marketsInfoData, marketTokensData } = props;
  const { markets: sortedMarketsByIndexToken } = useSortedPoolsWithIndexToken(marketsInfoData, marketTokensData);
  const [searchKeyword, setSearchKeyword] = useState("");
  const history = useHistory();

  const { tab, setTab, favoriteTokens, setFavoriteTokens } = useGmTokensFavorites();

  const filteredTokensInfo = useMemo(() => {
    if (sortedMarketsByIndexToken.length < 1) {
      return [];
    }

    let filteredTokens: TokenData[];
    if (searchKeyword.length < 1 && tab === "all") {
      filteredTokens = sortedMarketsByIndexToken;
    } else {
      filteredTokens = sortedMarketsByIndexToken.filter((market) => {
        const marketInfo = getByKey(marketsInfoData, market?.address)!;
        let textSearchMatch = false;
        if (!searchKeyword.trim()) {
          textSearchMatch = true;
        } else {
          textSearchMatch = marketInfo.name.toLowerCase().includes(searchKeyword.toLowerCase());
        }

        const favoriteMatch = tab === "favorites" ? favoriteTokens?.includes(market.address) : true;

        return textSearchMatch && favoriteMatch;
      });
    }

    return filteredTokens.map((market) => {
      const marketInfo = getByKey(marketsInfoData, market?.address)!;
      const mintableInfo = getMintableMarketTokens(marketInfo, market);
      const sellableInfo = getSellableMarketToken(marketInfo, market);
      const apr = getByKey(marketsTokensAPRData, market?.address);
      const incentiveApr = getByKey(marketsTokensIncentiveAprData, marketInfo?.marketTokenAddress);
      const indexName = getMarketIndexName(marketInfo);
      const poolName = getMarketPoolName(marketInfo);
      return {
        market,
        mintableInfo,
        sellableInfo,
        marketInfo,
        indexName,
        poolName,
        apr,
        incentiveApr,
      };
    });
  }, [
    favoriteTokens,
    marketsInfoData,
    marketsTokensAPRData,
    marketsTokensIncentiveAprData,
    searchKeyword,
    sortedMarketsByIndexToken,
    tab,
  ]);

  const close = useSelectorClose();

  const handleSelectToken = useCallback(
    (marketTokenAddress: string) => {
      close();
      history.push({
        pathname: "/pools",
        search: `?market=${marketTokenAddress}`,
      });
    },
    [close, history]
  );

  const isMobile = useMedia(`(max-width: ${SELECTOR_BASE_MOBILE_THRESHOLD}px)`);
  const isSmallMobile = useMedia("(max-width: 400px)");

  const rowVerticalPadding = isMobile ? "py-8" : cx("py-4 group-last-of-type/row:pb-8");
  const rowHorizontalPadding = isSmallMobile ? cx("px-6 first-of-type:pl-15 last-of-type:pr-15") : "px-15";
  const thClassName = cx(
    "sticky top-0 bg-slate-800 text-left font-normal uppercase text-gray-400 last-of-type:text-right",
    rowVerticalPadding,
    rowHorizontalPadding
  );
  const tdClassName = cx("last-of-type:text-right", rowVerticalPadding, rowHorizontalPadding);

  const localizedTabOptionLabels = useLocalizedMap(indexTokensFavoritesTabOptionLabels);

  const handleFavoriteClick = useCallback(
    (address: string) => {
      if (favoriteTokens.includes(address)) {
        setFavoriteTokens(favoriteTokens.filter((item) => item !== address));
      } else {
        setFavoriteTokens([...favoriteTokens, address]);
      }
    },
    [favoriteTokens, setFavoriteTokens]
  );

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && filteredTokensInfo.length > 0) {
        handleSelectToken(filteredTokensInfo[0].market.address);
      }
    },
    [filteredTokensInfo, handleSelectToken]
  );

  return (
    <div>
      <SelectorBaseMobileHeaderContent>
        <SearchInput
          className="mt-15"
          value={searchKeyword}
          setValue={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Search Market"
        />
      </SelectorBaseMobileHeaderContent>
      {!isMobile && (
        <>
          <SearchInput
            className="m-15"
            value={searchKeyword}
            setValue={({ target }) => setSearchKeyword(target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && filteredTokensInfo.length > 0) {
                handleSelectToken(filteredTokensInfo[0].market.address);
              }
            }}
            placeholder="Search Market"
          />
          <div className="divider" />
        </>
      )}

      <Tab
        className="px-15 py-4"
        options={indexTokensFavoritesTabOptions}
        optionLabels={localizedTabOptionLabels}
        type="inline"
        option={tab}
        setOption={setTab}
      />

      <div>
        <table className="w-full">
          {sortedMarketsByIndexToken.length > 0 && (
            <thead>
              <tr>
                <th className={thClassName} colSpan={2}>
                  MARKET
                </th>
                <th className={cx(thClassName, "relative")}>
                  <span
                    className={cx("absolute inset-0 truncate", isSmallMobile ? "px-6" : "px-15", rowVerticalPadding)}
                  >
                    BUYABLE
                  </span>
                </th>
                <th className={cx(thClassName, "relative")}>
                  <span
                    className={cx("absolute inset-0 truncate", isSmallMobile ? "px-6" : "px-15", rowVerticalPadding)}
                  >
                    SELLABLE
                  </span>
                </th>
                <th className={thClassName}>APY</th>
              </tr>
            </thead>
          )}
          <tbody>
            {filteredTokensInfo.map((option) => (
              <MarketTokenListItem
                key={option.market.address}
                {...option}
                tdClassName={tdClassName}
                isFavorite={favoriteTokens.includes(option.market.address)}
                onFavorite={handleFavoriteClick}
                handleSelectToken={handleSelectToken}
                isSmallMobile={isSmallMobile}
                rowVerticalPadding={rowVerticalPadding}
              />
            ))}
          </tbody>
        </table>
        {sortedMarketsByIndexToken.length > 0 && !filteredTokensInfo?.length && (
          <div className="py-15 text-center text-gray-400">
            <Trans>No markets matched.</Trans>
          </div>
        )}
      </div>
    </div>
  );
}

function MarketTokenListItem({
  marketInfo,
  market,
  isFavorite,
  onFavorite,
  handleSelectToken,
  isSmallMobile,
  mintableInfo,
  sellableInfo,
  rowVerticalPadding,
  indexName,
  poolName,
  tdClassName,
  apr,
  incentiveApr,
}: {
  marketInfo: MarketInfo;
  market: TokenData;
  isFavorite: boolean;
  onFavorite: (address: string) => void;
  handleSelectToken: (address: string) => void;
  isSmallMobile: boolean;
  mintableInfo: ReturnType<typeof getMintableMarketTokens>;
  sellableInfo: ReturnType<typeof getSellableMarketToken>;
  rowVerticalPadding: string;
  indexName?: string;
  poolName?: string;
  tdClassName: string;
  apr: bigint | undefined;
  incentiveApr: bigint | undefined;
}) {
  const { indexToken, longToken, shortToken } = marketInfo;
  const iconName = marketInfo.isSpotOnly
    ? getNormalizedTokenSymbol(longToken.symbol) + getNormalizedTokenSymbol(shortToken.symbol)
    : getNormalizedTokenSymbol(indexToken.symbol);

  const handleFavoriteClick = useCallback(() => onFavorite(market.address), [market.address, onFavorite]);

  const handleSelect = useCallback(() => handleSelectToken(market.address), [handleSelectToken, market.address]);

  const formattedMintableUsd = isSmallMobile
    ? formatAmountHuman(mintableInfo?.mintableUsd, USD_DECIMALS, true)
    : formatUsd(mintableInfo?.mintableUsd, {
        displayDecimals: 0,
        fallbackToZero: true,
      });

  const formattedSellableAmount = isSmallMobile
    ? formatAmountHuman(sellableInfo?.totalAmount, market?.decimals, true)
    : formatTokenAmount(sellableInfo?.totalAmount, market?.decimals, market?.symbol, {
        displayDecimals: 0,
        useCommas: true,
      });

  return (
    <tr key={market.address} className="group/row cursor-pointer hover:bg-cold-blue-900">
      <td
        className={cx("rounded-4 pl-15 pr-4 hover:bg-cold-blue-700", rowVerticalPadding)}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? <FaStar className="text-gray-400" /> : <FaRegStar className="text-gray-400" />}
      </td>
      <td className={cx("rounded-4 pl-6", rowVerticalPadding, isSmallMobile ? "pr-6" : "pr-15")} onClick={handleSelect}>
        <span className="inline-flex items-center">
          {marketInfo && (
            <>
              <TokenIcon className="-my-5 mr-8" symbol={iconName} displaySize={16} importSize={40} />
              <div className="inline-flex flex-wrap items-center">
                <span>{indexName && indexName}</span>
                <span className="subtext leading-1">{poolName && `[${poolName}]`}</span>
              </div>
            </>
          )}
        </span>
      </td>
      <td className={tdClassName} onClick={handleSelect}>
        {formattedMintableUsd}
      </td>
      <td className={tdClassName} onClick={handleSelect}>
        {formattedSellableAmount}
      </td>
      <td className={tdClassName} onClick={handleSelect}>
        <AprInfo apy={apr} incentiveApr={incentiveApr} showTooltip={false} />
      </td>
    </tr>
  );
}
