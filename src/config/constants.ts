import { USD_DECIMALS } from "config/factors";
import { expandDecimals } from "lib/numbers";

export const HIGH_SPREAD_THRESHOLD = expandDecimals(1, USD_DECIMALS) / 100n; // 1%;
export const HIGH_TRADE_VOLUME_FOR_FEEDBACK = expandDecimals(3_000_000, 30); // 2mx

export const DAY_OF_THE_WEEK_EPOCH_STARTS_UTC = 3;

export enum OrderOriginType {
  GmxOrder = 'gmx',
  SingularOrder = 'singular'
};
