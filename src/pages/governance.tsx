import ValidatorAndStacke from "lib/pages/validator-and-stacke";
import { getAmoutOfStakedInUSD } from "lib/requests/validator-and-stake/daily_amount_of_usd_staked";
import { getDailyUniqueUserStaked } from "lib/requests/validator-and-stake/daily_unique_user_staked";
import { getTotalVotesCountForProposal } from "lib/requests/validator-and-stake/votes_count_for_proposal";
import { getTotalLunaStaked } from "lib/requests/validator-and-stake/total_luna_staked";
import { getTotalLunaStakedInUSD } from "lib/requests/validator-and-stake/total_luna_staked_usd";
import { getTotalWalletAlreadyStaked } from "lib/requests/validator-and-stake/total_wallet_already_staked";
import { getTotalWalletStaked } from "lib/requests/validator-and-stake/total_wallet_staked";
import { getTotalProposalCount } from "lib/requests/validator-and-stake/total_proposal_count";
import { getProposalsCountMonthlyVsLUNAPrice } from "lib/requests/validator-and-stake/monthly_proposal_vs_luna_price";
import { getTotalNumberOfValidators } from "lib/requests/validator-and-stake/total_number_of_validators";
import { getNumberOfActiveProposals, getNumberOfActiveValidators, getNumberOfTotalProposals, getTerraValidatorWithVote, getTopTenTerraValidator } from "lib/requests/validatorAndgovernance/all_active_validators";
export async function getStaticProps() {
    const [
        numberOfActiveValidators,
        numberOfTotalProposals,
        numberOfActiveProposals,
        topTenTerraValidator,
        terraValidatorWithVote,
        totalLunaStaked,
        totalLunaStakedInUSD,
        totalWalletStaked,
        totalWalletAlreadyStaked,
        dailyUniqueUserStaked,
        amoutOfStakedInUSD,
        totalVotesCountForProposal,
        totalProposalCount,
        proposalsCountMonthlyVsLUNAPrice,
        totalNumberOfValidators,
    ] = await Promise.all([
        getNumberOfActiveValidators(),
        getNumberOfTotalProposals(),
        getNumberOfActiveProposals(),
        getTopTenTerraValidator(),
        getTerraValidatorWithVote(),
        getTotalLunaStaked(),
        getTotalLunaStakedInUSD(),
        getTotalWalletStaked(),
        getTotalWalletAlreadyStaked(),
        getDailyUniqueUserStaked(),
        getAmoutOfStakedInUSD(),
        getTotalVotesCountForProposal(),
        getTotalProposalCount(),
        getProposalsCountMonthlyVsLUNAPrice(),
        getTotalNumberOfValidators(),
    ]);
    return {
        props: {
            numberOfActiveValidators,
            numberOfTotalProposals,
            numberOfActiveProposals,
            topTenTerraValidator,
            terraValidatorWithVote,
            totalLunaStaked,
            totalLunaStakedInUSD,
            totalWalletStaked,
            totalWalletAlreadyStaked,
            dailyUniqueUserStaked,
            amoutOfStakedInUSD,
            totalVotesCountForProposal,
            totalProposalCount,
            proposalsCountMonthlyVsLUNAPrice,
            totalNumberOfValidators,
        },
        revalidate: 10 * 60,
    };
}
export default ValidatorAndStacke;
