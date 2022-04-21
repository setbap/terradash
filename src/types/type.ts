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
  DAY: date;
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
  "new users": number;
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
    "number of active user": number;
    date: string;
  }[];
  numberOfDailyActiveWallets: {
    "number of active user": number;
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
  "voting power": number;
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
  "yes votes": number;
  "no votes": number;
  "abstain votes": number;
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
  date: string;
  unique_wallets: number;
}

export interface AnchorBorrowUsers {
  date: string;
  unique_wallets: number;
}
