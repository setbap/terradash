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
            title="Active Validators"
            status="unchanged"
            stat={numberOfActiveValidators}
          />
          <StatsCard
            title="Total Governance Proposals"
            status="inc"
            stat={numberOfTotalProposals}
          />
          <StatsCard
            link="https://station.terra.money/gov#PROPOSAL_STATUS_VOTING_PERIOD"
            title="Active Governance Proposals"
            status="inc"
            stat={numberOfActiveProposals}
          />
          <StatsCard
            title="LUNA Staked"
            status="inc"
            stat={totalLunaStaked["LUNA total staked"]}
          />
        </SimpleGrid>
        <SimpleGrid
          py={"6"}
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 1, md: 2, lg: 6 }}
        >
          <ChartBox
            queryLink="https://app.flipsidecrypto.com/velocity/queries/a340bfd5-ceaf-41fa-bd0a-79c7535e105a"
            data={dailyUniqueUserStaked}
            baseSpan={2}
            tooltipTitle="Unique Users Staking"
            modelInfo="Number of unique wallets thats stake Terra in One of validators in each day"
            title="Unique Users Staking"
            areaDataKey="daily unique user staked"
            xAxisDataKey="day"
          />
          <BarGraph
            queryLink="https://fcd.terra.dev/v1/staking/validators"
            extraInfoToTooltip="%"
            modelInfo="shows Top 10 Validators and their voting power"
            values={topTenTerraValidator}
            title="Top 10 Validators by Voting Power"
            dataKey="name"
            oyLabel="voting power (%)"
            oxLabel="name"
            isNotDate
            labels={[
              { key: "voting power", color: "var(--chakra-colors-green-400)" },
            ]}
          />

          <BarGraph
            queryLink="https://api.terra.dev/validators"
            modelInfo="shows Distribution of Terra votes"
            values={terraValidatorWithVote}
            title="Terra Vote Distribution"
            dataKey="name"
            baseSpan={3}
            oyLabel="vote count"
            oxLabel="name"
            isNotDate
            labels={[
              { key: "Yes", color: "#09f35e" },
              { key: "No", color: "#f30e0e" },
              { key: "Abstain", color: "#f3f30e" },
            ]}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
