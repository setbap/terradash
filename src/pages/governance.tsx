import ValidatorAndStacke from "lib/pages/validator-and-stacke";
import { getAmoutOfStakedInUSD } from "lib/requests/validator-and-stake/daily_amount_of_usd_staked";
import { getDailyUniqueUserStaked } from "lib/requests/validator-and-stake/daily_unique_user_staked";
import { getProposalCountOverTime } from "lib/requests/validator-and-stake/proposal-count-over-time";
import { getTotalVotesCountForProposal } from "lib/requests/validator-and-stake/votes_count_for_proposal";

import { getTotalLunaStaked } from "lib/requests/validator-and-stake/total_luna_staked";
import { getTotalLunaStakedInUSD } from "lib/requests/validator-and-stake/total_luna_staked_usd";
import { getTotalWalletAlreadyStaked } from "lib/requests/validator-and-stake/total_wallet_already_staked";
import { getTotalWalletStaked } from "lib/requests/validator-and-stake/total_wallet_staked";
import { getTotalProposalCount } from "lib/requests/validator-and-stake/total_proposal_count";
import { getProposalsCountMonthlyVsLUNAPrice } from "lib/requests/validator-and-stake/monthly_proposal_vs_luna_price";
import { getProposalsCountMonthlyVsMonthlyVotes } from "lib/requests/validator-and-stake/monthly_proposal_vs_monthly_votes";
import { getTotalNumberOfValidators } from "lib/requests/validator-and-stake/total_number_of_validators";
import { getTop10Validators } from "lib/requests/validator-and-stake/top_10_validators";
import { getDailyStakingRewards } from "lib/requests/validator-and-stake/daily_staking_rewards";
import { getTop10ValidatorsAccordingStake } from "lib/requests/validator-and-stake/top_10_validators_according_stake";
export async function getStaticProps() {
    const [
        totalLunaStaked,
        totalLunaStakedInUSD,
        totalWalletStaked,
        totalWalletAlreadyStaked,
        dailyUniqueUserStaked,
        amoutOfStakedInUSD,
        proposalCountOverTime,
        totalVotesCountForProposal,
        totalProposalCount,
        proposalsCountMonthlyVsLUNAPrice,
        proposalsCountMonthlyVsMonthlyVotes,
        totalNumberOfValidators,
        top10Validators,
        dailyStakingRewards,
        top10ValidatorsAccordingStake
    ] = await Promise.all([
        getTotalLunaStaked(),
        getTotalLunaStakedInUSD(),
        getTotalWalletStaked(),
        getTotalWalletAlreadyStaked(),
        getDailyUniqueUserStaked(),
        getAmoutOfStakedInUSD(),
        getProposalCountOverTime(),
        getTotalVotesCountForProposal(),
        getTotalProposalCount(),
        getProposalsCountMonthlyVsLUNAPrice(),
        getProposalsCountMonthlyVsMonthlyVotes(),
        getTotalNumberOfValidators(),
        getTop10Validators(),
        getDailyStakingRewards(),
        getTop10ValidatorsAccordingStake(),
    ]);
    return {
        props: {
            totalLunaStaked,
            totalLunaStakedInUSD,
            totalWalletStaked,
            totalWalletAlreadyStaked,
            dailyUniqueUserStaked,
            amoutOfStakedInUSD,
            proposalCountOverTime,
            totalVotesCountForProposal,
            totalProposalCount,
            proposalsCountMonthlyVsLUNAPrice,
            proposalsCountMonthlyVsMonthlyVotes,
            totalNumberOfValidators,
            top10Validators,
            dailyStakingRewards,
            top10ValidatorsAccordingStake
        },
    };
}
export default ValidatorAndStacke;
