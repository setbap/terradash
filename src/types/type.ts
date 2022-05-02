export interface VoterInfo {  NUMBER_NOT_WHALE_VOTER: number;
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
  DATE: string;
  DEPOSIT_AMOUNT: number;
  NET_DAILY_AMOUNT: number;
  REDEEM_AMOUNT: number;
  Z_CUMULATIVE_SUM: number;
}

export interface SumAnchorDeposite {
  PAST_30_AMOUNT: number;
  PAST_7_AMOUNT: number;
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
  DAY: Date;
  "Daily Deposits": number;
  "Daily Redemptions": number;
  "Net Activity": number;
}

export interface AnchorUserBorrowAndDeposit {
  day: string;
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

export interface USTDailySupplyRes {
  date: string;
  denom: string;
  circulating: number;
}
export interface USTDailySupply {
  day: string;
  "UST Supply": number;
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
  "LUNA Circulating Supply": number;
  day: string;
}

export interface CirculationSupplyLunaResualt {
  uluna: {
    date: string;
    circ: number;
    total: number;
  }[];
}

export interface CirculationSupplyUST {
  "UST Circulating Supply": number;
  day: string;
}

export interface BurnLuna {
  amount: number;
  day: string;
}

export interface TotalNumberOfWallets {
  "total number of user": number;
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

export interface TotalFeeEachCoin {
  coin: string;
  "total fee in USD": number;
}

export interface AvgFeeEachCoin {
  "avg fee in USD": number;
  coin: string;
}

export interface DailyBlockCount {
  "daily block count": number;
  day: string;
}

export interface AvgTxCountPerBlock {
  avg_tx_count_per_block: number;
}

export interface ProposalCountOverTime {
  "community poolproposals so far": number;
  day: string;
  "param proposals so far": number;
  "text proposals so far": number;
  "reward weight proposals so far": number;
}

export interface TotalVotesCountForProposal {
  "total votes count for proposal": number;
}

export interface TotalProposalCount {
  "total proposal count": number;
}

export interface ProposalsCountMonthlyVsLUNAPrice {
  "No of proposal": number;
  "avg price": number;
  month: string;
}

export interface ProposalsCountMonthlyVsMonthlyVotes {
  month: string;
  "monthly votes": number;
  "number of proposal": number;
}

export interface TopNativeSwapPair {
  "number of swap": number;
  "swap pair": string;
}

export interface DailySwapCount {
  "daily swap count": number;
  day: string;
}

export interface DailySwapVolume {
  "daily swap volume in usd": number;
  day: string;
}

export interface MostUserIntractedDapps {
  label: string;
  "number of interact": number;
}

export interface DistributionOfLunaHolders {
  distribution: string;
  "number of addresses": number;
}

export interface DailyNewUserSince2022 {
  day: string;
  "New Users": number;
}

export interface TotalNumberOfValidators {
  total_number_of_validator: number;
}

export interface Top10Validators {
  label: string;
  "voting power": number;
}

export interface Top10ValidatorsAccordingStake {
  label: string;
  "total staked in LUNA": number;
  "total staked in USD": number;
}

export interface DailyStakingRewards {
  "daily amount luna": number;
  "daily amount usd": number;
  day: string;
}

// ---------------------- Overview

export interface DailyActiveWallets {
  ACTIVE_USERS: number;
  DATE: string;
}

export interface AtiveUserOverTime {
  numberOfMonthlyActiveWallets: {
    "Number of Active Users": number;
    date: string;
  }[];
  numberOfDailyActiveWallets: {
    "Number of Active Users": number;
    date: string;
  }[];
}

export interface DailyTx {
  "daily TX": number;
  day: string;
}

export interface ChangedDailyTx {
  "transaction count": number;
  day: string;
}

export interface TransactionFee {
  DATE: string;
  DENOM: string;
  TOTAL_AMOUNT: number;
}

export interface TotalFeeByEachToken {
  DENOM: string;
  TOTAL_AMOUNT: number;
}

export interface SimpilifiedTotalFeeByEachToken {
  "token name": string;
  "amount token": number;
}

//----------------------- Validators and Governance
export interface ActiveValidators {
  validators: Object[];
  pagination: {
    next_key: string;
    total: string;
  };
}

export interface TotalProposals {
  proposals: Object[];
  pagination: {
    next_key: string;
    total: string;
  };
}

export interface TerraValidators {
  description: {
    moniker: string;
  };
  votingPower: {
    amount: string;
    weight: string;
  };
}
export interface SimpilfiedTerraValidators {
  name: string;
  "Voting Power": number;
}

export interface TerraValidatorsWithVote {
  description: {
    moniker: string;
  };
  votes:
    | {
        options:
          | {
              option:
                | "VOTE_OPTION_YES"
                | "VOTE_OPTION_NO"
                | "VOTE_OPTION_ABSTAIN";
            }[];
      }[]
    | undefined;
}

export interface SimplifiedTerraValidatorsWithVote {
  name: string;
  Yes: number;
  No: number;
  Abstain: number;
  "total votes": number;
}

//----------------------- LFG

export interface LFGBalance {
  BALANCE: number;
  BALANCE_DATE: string;
  BALANCE_USD: number;
  SYMBOL: string;
}

// ------------------------ UST

export interface USTMarketCapRes {
  result: string;
}

export interface USTMarketCap {
  wUST: number;
  wormholUST: number;
  AvaxUST: number;
  BNBUST: number;
  ThorChainUST: number;
}

export interface USTSupply {
  amount: {
    denom: string;
    amount: string;
  };
}

export interface USTBridge {
  BRIDGE: string;
  DAY: string;
  DESTINATION_CHAIN: string;
  UST_AMOUNT: number;
}

export interface USTBridgeInfo {
  bridges: string[];
  blockchains: string[];
  dailyBridgeValue: any;
  monthlyBridgeValue: any;
  blockchainsWithValue: {
    blockchain: string;
    amount: number;
  }[];
}

// ------------------------ Anchor - forg additions
export interface AnchorBalances {
  stable_demon: string;
  liquid_terra: string;
  exchange_rate: string;
  last_updated: string;
  borrowed_terra: string;
  utilization_ratio: string;
  current_apy: string;
}

export interface AnchorEarnUsers {
  DATE: string;
  UNIQUE_WALLETS: number;
}

export interface AnchorBorrowUsers {
  DATE: string;
  UNIQUE_WALLETS: number;
}

export interface CurrentYieldReserve {
  BALANCE: number;
}

export interface AnchorCollateralStatsLong {
  DATES: string;
  COLLATERAL: string;
  COLLATERAL_NAME: string;
  DEPOSITS: number;
  WITHDRAWALS: number;
  LIQUIDATIONS: number;
  COLLATERAL_CHANGE: number;
  TVL_AMOUNT: number;
  TVL_USD: number;
}

export interface AnchorGrossTVLUSD {
  DATES: string;
  GROSS_TVL_USD: number;
}

export interface UST_IN_ALL_BCs {
  DATE: string;
  ETH_DAILY_USERS: number;
  ETH_MIN_DATE: string;
  ETH_NEW_USERS: number;
  ETH_TX: number;
  ETH_TX_CUMULATIVE: number;
  ETH_USERS_CUMULATIVE: number;
  ETH_UST_CUMULATIVE: number;
  ETH_UST_DAILY: number;
  HAR_DAILY_USERS?: number;
  HAR_DATE: string;
  HAR_NEW_USERS?: number;
  HAR_TX?: number;
  HAR_TX_CMULATIVE?: number;
  HAR_USERS_CUMULATIVE?: number;
  HAR_UST_DAILY?: number;
  HAR_VOL_CUMULATIVE?: number;
  POLY_DAILY_USERS?: number;
  POLY_DATE: string;
  POLY_MIN_DATE: string;
  POLY_NEW_USERS?: number;
  POLY_TX?: number;
  POLY_TX_CUMULATIVE?: number;
  POLY_USERS_CUMULATIVE?: number;
  POLY_UST_CUMULATIVE?: number;
  POLY_UST_DAILY?: number;
  SOL_DAILY_USERS?: number;
  SOL_DATE: string;
  SOL_MIN_DATE: string;
  SOL_NEW_USERS?: number;
  SOL_TX?: number;
  SOL_TX_CUMULATIVE?: number;
  SOL_USERS_CUMULATIVE?: number;
  SOL_UST_CUMULATIVE?: number;
  SOL_UST_DAILY?: number;
  TERRA_DAILY_USERS?: number;
  TERRA_DATE: string;
  TERRA_MIN_DATE: string;
  TERRA_NEW_USERS?: number;
  TERRA_TX?: number;
  TERRA_TX_CUMULATIVE?: number;
  TERRA_USERS_CUMULATIVE?: number;
  TERRA_UST_CUMULATIVE?: number;
  TERRA_UST_DAILY?: number;
}

// --------------------------- Mirror
export interface MirrorTokenPriceRes {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}
export interface MirrorTokenPrice {
  day: string;
  "Mir Price": number;
}

export interface SwapValumeRes {
  SWAP_DATE: string;
  LP_ADDRESS: string;
  TOKEN_NAME: string;
  TOTAL_VOLUME_USD: number;
  AVG_PRICE: number;
}

export interface MirrorTVLByStocksVolumeRes {
  SWAP_DATE: string;
  LP_ADDRESS: string;
  TOKEN_NAME: string;
  TOTAL_VOLUME_USD: number;
  AVG_PRICE: number;
  DATE: string;
  LP_ADDRESS_BALANCE: string;
  LP_BALANCE_USD: number;
  "Pool Utilisation": number;
}

// ------------------------------ network

export interface NetworkFeeDaily {
  DATETIME: string;
  TOTAL_FEE: number;
  AVERAGE_FEE_BY_CURRENCY: number;
  CURRENCY: string;
  SYMBOL: string;
  USD_RATE: number;
  LUNA_RATE: number;
  TOTAL_FEE_LUNA: number;
  TOTAL_FEE_USD: number;
  AVERAGE_FEE_BY_CURRENCY_LUNA: number;
  AVERAGE_FEE_BY_CURRENCY_USD: number;
}

export interface TotalNetworkFeeDailyRes {
  DATETIME: string;
  DAILY_TOTAL_FEE_LUNA: number;
  DAILY_TOTAL_FEE_USD: number;
  AVERAGE_FEE_LUNA: number;
  AVERAGE_FEE_USD: number;
}

export interface TotalNetworkFeeDaily {
  day: string;
  Fee: number;
  "Avrage Fee": number;
}

export interface TerraTransactionStaticsRes {
  DATETIME: string;
  TRANSACTIONS: number;
  SUCCEEDED_TRANSACTIONS: number;
  TPS_WITH_FAILS: number;
  TPS: number;
  SUCCESS_RATE: number;
}

export interface TerraTransactionStatics {
  day: string;
  "Number of Transacton": number;
  TPS: number;

  "Success Rate": number;
}
