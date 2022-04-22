import {
  Box,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AmoutOfStakedInUSD,
  DailyStakingRewards,
  DailyUniqueUserStaked,
  ProposalCountOverTime,
  ProposalsCountMonthlyVsLUNAPrice,
  ProposalsCountMonthlyVsMonthlyVotes,
  SimpilfiedTerraValidators,
  SimplifiedTerraValidatorsWithVote,
  Top10Validators,
  Top10ValidatorsAccordingStake,
  TotalLunaStaked,
  TotalLunaStakedInUSD,
  TotalNumberOfValidators,
  TotalProposalCount,
  TotalVotesCountForProposal,
  TotalWalletAlreadyStaked,
  TotalWalletStaked,
} from "types/type";
import ChartBox from "lib/components/charts/LineChart";
import { StatsCard } from "lib/components/charts/StateCard";
import BarGraph from "lib/components/charts/BarGraph";





interface Props {
  dailyUniqueUserStaked: DailyUniqueUserStaked[];
  totalLunaStaked: TotalLunaStaked;
  totalLunaStakedInUSD: TotalLunaStakedInUSD;
  totalWalletStaked: TotalWalletStaked;
  totalWalletAlreadyStaked: TotalWalletAlreadyStaked;
  totalProposalCount: TotalProposalCount;
  totalVotesCountForProposal: TotalVotesCountForProposal;
  totalNumberOfValidators: TotalNumberOfValidators;
  numberOfActiveValidators: number
  numberOfTotalProposals: number,
  numberOfActiveProposals: number,
  topTenTerraValidator: SimpilfiedTerraValidators[]
  terraValidatorWithVote: SimplifiedTerraValidatorsWithVote[]
}

const Home = ({
  numberOfActiveValidators,
  numberOfTotalProposals,
  numberOfActiveProposals,
  topTenTerraValidator,
  terraValidatorWithVote,
  totalProposalCount,
  dailyUniqueUserStaked,
  totalVotesCountForProposal,
  totalLunaStaked,
  totalLunaStakedInUSD,
  totalWalletStaked,
  totalWalletAlreadyStaked,
  totalNumberOfValidators,
}: Props) => {
  const bgCard = useColorModeValue("white", "#191919");
  return (
    <>
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 8 }}>
        <SimpleGrid
          pt={'6'}
          columns={{ base: 1, md: 2, lg: 2, "2xl": 3 }}
          spacing={{ base: 5, lg: 6 }}
        >
          <StatsCard
            title="number of active validators"
            status="unchanged"
            stat={numberOfActiveValidators}
          />
          <StatsCard
            title="[chnage]Governance Proposals - Total"
            status="inc"
            stat={numberOfTotalProposals}
          />
          <StatsCard
            link="https://station.terra.money/gov#PROPOSAL_STATUS_VOTING_PERIOD"
            title="Governance Proposals - Active"
            status="inc"
            stat={numberOfActiveProposals}
          />
          <StatsCard
            title="Total Luna Staked"
            status="inc"
            stat={totalLunaStaked["LUNA total staked"]}
          />
          <StatsCard
            title="Total Luna Staked In USD"
            status="inc"
            stat={totalLunaStakedInUSD["total staked in usd"]}
          />
          <StatsCard
            title="Number of wallets they have ever staked"
            status="inc"
            stat={totalWalletStaked["Number of wallets they have ever staked"]}
          />
          <StatsCard
            title="total Votes CountFor Proposal"
            status="inc"
            stat={totalVotesCountForProposal["total votes count for proposal"]}
          />
          <StatsCard
            title="Total Proposal Count"
            status="inc"
            stat={totalProposalCount["total proposal count"]}
          />
          <StatsCard
            title="Total number of Validator"
            status="inc"
            stat={totalNumberOfValidators["total_number_of_validator"]}
          />
          <StatsCard
            title="Number of wallets they have already staked"
            status="inc"
            stat={
              totalWalletAlreadyStaked[
              "Number of wallets they have already staked"
              ]
            }
          />
        </SimpleGrid>
        <SimpleGrid
          py={"6"}
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 1, md: 2, lg: 6 }}
        >
          <ChartBox
            data={dailyUniqueUserStaked}
            tooltipTitle="daily unique user staked"
            modelInfo="Number of unique wallets thats stake Terra in One of validators in each day"
            title="Daily Unique Users Staking"
            areaDataKey="daily unique user staked"
            xAxisDataKey="day"
          />
          <BarGraph
            queryLink="https://fcd.terra.dev/v1/staking/validators"
            extraInfoToTooltip="%"
            modelInfo="shows Top 10 Validators and their voting power"
            values={topTenTerraValidator}
            title="Top 10 Validators according to their power"
            dataKey="name"
            oyLabel="voting power(%)"
            oxLabel="name"
            isNotDate
            labels={[
              { key: "voting power", color: "#0953fe" },
            ]}
          />

          <BarGraph
            queryLink="https://api.terra.dev/validators"
            modelInfo="shows Distribution of Terra votes"
            values={terraValidatorWithVote}
            title="Distribution of Terra votes"
            dataKey="name"
            baseSpan={3}
            oyLabel="voting number"
            oxLabel="name"
            isNotDate
            labels={[
              { key: "yes votes", color: "#09f35e" },
              { key: "no votes", color: "#f30e0e" },
              { key: "abstain votes", color: "#f3f30e" },
            ]}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
