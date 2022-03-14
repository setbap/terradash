export interface VoterInfo {
  NUMBER_NOT_WHALE_VOTER: number;
  NUMBER_OF_ANCHOR_VOTER: number;
  NUMBER_OF_MIR_VOTER: number;
  NUMBER_OF_NOT_VOTED_WHALES: number;
  NUMBER_OF_TERRA_VOTER: number;
  NUMBER_OF_UNIQUE_VOTER: number;
  NUMBER_OF_VOTER_WHALES: number;
  NUMBER_OF_WHALES: number;
  PERCENTAGE_OF_VOTED_WHALES: number;
  PERCETAGE_OF_VOTER_VOTERS: number;
}

export interface DailyNewUser {
  DATE: Date;
  NUMBER_OF_UNIQUE_USER_PER_DAY: number;
}
export interface RawDailyNewUser {
  DATE: string;
  NUMBER_OF_UNIQUE_USER_PER_DAY: number;
}

export interface AnchorDeposite {
  BLOCK_TIMESTAMP: string;
  DEPOSIT_AMOUNT_USD: number;
}

export interface SumAnchorDeposite {
  ALL_DEPOSIT_AMOUNT_USD: number;
  PAST_30_DEPOSIT_AMOUNT_USD: number;
  PAST_7_DEPOSIT_AMOUNT_USD: number;
}

export interface AnchorBorrows {
  BLOCK_TIMESTAMP: string;
  BORROWS_USD: number;
}

export interface SumAnchorBorrows {
  ALL_SUM_BORROWS_USD: number;
  PAST_30_SUM_BORROWS_USD: number;
  PAST_7_SUM_BORROWS_USD: number;
}

export interface AnchorBorrowAndDeposit {
  DAY: string;
  "daily borrows": number;
  "daily deposits": number;
  "diffrent borrows and deposits": number;
  "sum diffrent borrows and deposits": number;
}

export interface AnchorUserBorrowAndDeposit {
  "unique user borrows": number;
  "unique user deposits": number;
}

export interface AnchorDailyUserBorrowAndDeposit {
  day: string;
  "number of wallet borrows": number;
  "number of wallet deposits": number;
}

export interface LunaVsEthPrice {
  day: string;
  eth: number;
  "eth change"?: number;
  luna: number;
  "luna change"?: number;
}

export interface LunaVsBtcPrice {
  btc: number;
  "btc change"?: number;
  day: string;
  luna: number;
  "luna change"?: number;
}

export interface TotalLunaSupply {
  "LUNA total Supply": number;
}

export interface TotalUSTSupply {
  "UST total Supply": number;
}

export interface DailyTx {
  "daily TX": number;
  day: string;
}

export interface TotalTx {
  TOTAL_TX: number;
}

export interface CurentLunaPrice {
  PRICE_USD: number;
}
export interface TerraDailyAvgMinMaxPrice {
  "avg price": number;
  day: string;
  "max price": number;
  "min price": number;
}

export interface CirculationSupplyLuna {
  "Luna Circulating Supply": number;
  day: string;
}

export interface CirculationSupplyUST {
  "UST Circulating Supply": number;
  day: string;
}

export interface BurnLuna {
  amount: number;
  day: string;
}

export interface TotalBurnLuna {
  burnt_luna: number;
}

export interface AvgUSTPrice {
  "avg price": number;
  day: string;
}

export interface TotalLunaStaked {
  "LUNA total staked": number;
}

export interface TotalLunaStakedInUSD {
  "total staked in usd": number;
}

export interface TotalWalletStaked {
  "Number of wallets they have ever staked": number;
}

export interface TotalWalletAlreadyStaked {
  "Number of wallets they have already staked": number;
}

export interface DailyUniqueUserStaked {
  "daily unique user staked": number;
  day: string;
}
export interface AmoutOfStakedInUSD {
  "daily staked amount in USD": number;
  day: string;
}
