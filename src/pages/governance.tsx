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
        proposalsCountMonthlyVsMonthlyVotes
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
        getProposalsCountMonthlyVsMonthlyVotes()
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
            proposalsCountMonthlyVsMonthlyVotes
        },
    };
}
export default ValidatorAndStacke;
