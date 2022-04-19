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
import MultiChartBox from "lib/components/charts/MultiLineChart";
import BarGraph from "lib/components/charts/BarGraph";
import DonutChart from "lib/components/charts/DonutChart";

interface Props {
  dailyUniqueUserStaked: DailyUniqueUserStaked[];
  totalLunaStaked: TotalLunaStaked;
  totalLunaStakedInUSD: TotalLunaStakedInUSD;
  totalWalletStaked: TotalWalletStaked;
  totalWalletAlreadyStaked: TotalWalletAlreadyStaked;
  totalProposalCount: TotalProposalCount;
  totalVotesCountForProposal: TotalVotesCountForProposal;
  amoutOfStakedInUSD: AmoutOfStakedInUSD[];
  proposalCountOverTime: ProposalCountOverTime[];
  proposalsCountMonthlyVsLUNAPrice: ProposalsCountMonthlyVsLUNAPrice[]
  proposalsCountMonthlyVsMonthlyVotes: ProposalsCountMonthlyVsMonthlyVotes[]
  top10Validators: Top10Validators[]
  totalNumberOfValidators: TotalNumberOfValidators;
  dailyStakingRewards: DailyStakingRewards[];
  top10ValidatorsAccordingStake: Top10ValidatorsAccordingStake[]


  numberOfActiveValidators: number
  numberOfTotalProposals: number,
  numberOfActiveProposals: number,
}

const Home = ({
  numberOfActiveValidators,
  numberOfTotalProposals,
  numberOfActiveProposals,

  totalProposalCount,
  dailyUniqueUserStaked,
  totalVotesCountForProposal,
  amoutOfStakedInUSD,
  totalLunaStaked,
  proposalCountOverTime,
  totalLunaStakedInUSD,
  totalWalletStaked,
  totalWalletAlreadyStaked,
  proposalsCountMonthlyVsLUNAPrice,
  top10Validators,
  proposalsCountMonthlyVsMonthlyVotes,
  totalNumberOfValidators,
  dailyStakingRewards,
  top10ValidatorsAccordingStake
}: Props) => {
  const bgCard = useColorModeValue("white", "#191919");
  return (
    <>
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 8 }}>

        <SimpleGrid
          pt={'6'}
          columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
          spacing={{ base: 5, lg: 6 }}
        >
          <StatsCard
            title="number of active validators"
            status="unchanged"
            stat={numberOfActiveValidators}
          />
          <StatsCard
            title="total number of governance proposals"
            status="inc"
            stat={numberOfTotalProposals}
          />
          <StatsCard
            title="number of active governance proposals"
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
            title="daily unique user staked"
            areaDataKey="daily unique user staked"
            xAxisDataKey="day"
          />
          <MultiChartBox
            data={proposalCountOverTime}
            // tooltipTitle={[
            //   "community poolproposals so far",
            //   "param proposals so far",
            //   "text proposals so far",
            //   "reward weight proposals so far",
            // ]}
            modelInfo={`shows number of proposals in each categegory over time. for example at 19 Oct 2021 we have 12 community pool proposal. this shows from begining 
            of community so far we have 12 community pool proposals. as we see diagram Slope of lines is increasing. this show Members' participation in the community increases over time.`}
            title="number of diffrent proposals over the time "
            multiOff
            baseSpan={2}
            chartColors={["#F44", "#4F4", "#55f", "#f5e"]}
            areaDataKey={[
              "community poolproposals so far",
              "param proposals so far",
              "text proposals so far",
              "reward weight proposals so far",
            ]}
            xAxisDataKey="day"
          />
          <ChartBox
            baseSpan={2}
            data={amoutOfStakedInUSD}
            tooltipTitle="daily staked amount in USD"
            modelInfo="calculate price of luna that staked in each day in USD"
            title="daily staked amount in USD"
            areaDataKey="daily staked amount in USD"
            xAxisDataKey="day"
          />
          <MultiChartBox data={proposalsCountMonthlyVsLUNAPrice}
            chartColors={['#0953fe', '#f2a900']}
            modelInfo="compare number of proposal in each month and average price of luna to see is this two number have correlation with each other or not(unit of each one is diffrent)"
            title="proposal vs avg price"
            areaDataKey={["No of proposal", "avg price"]}
            xAxisDataKey="month" />
          <MultiChartBox
            data={proposalsCountMonthlyVsMonthlyVotes}
            chartColors={['#0953fe', '#f2a900']}
            modelInfo="compare number of proposal in each month and number of votes in Terra to see is this two number have correlation with each other or not(unit of each one is diffrent)"
            title="votes vs proposal"
            areaDataKey={["number of proposal", "monthly votes"]}
            xAxisDataKey="month" />

          <ChartBox
            data={dailyStakingRewards}
            tooltipTitle="daily staking reward in USD"
            modelInfo="amount of staking reward distributed in Terra Validators (this number calculated by number Luna distributed and price of Luna).amount of distribution decreseasd after update Terra network (like eip1559)"
            title="daily staking reward in USD"
            areaDataKey="daily amount usd"
            xAxisDataKey="day"
          />

          <ChartBox
            data={dailyStakingRewards}
            tooltipTitle="daily staking reward in Luna"
            modelInfo="amount of staking reward distributed in Terra Validators.amount of distribution decreseasd after update Terra network (like eip1559)"
            title="daily staking reward in Luna"
            areaDataKey="daily amount luna"
            xAxisDataKey="day"
          />
          <BarGraph
            modelInfo="shows Top 10 Validators and their voting power"
            values={top10Validators}
            title="Top 10 Validators according to their power"
            dataKey="label"
            oyLabel="voting power"
            oxLabel="name"
            isNotDate
            labels={[
              { key: "voting power", color: "#0953fe" },
            ]}
          />
          <DonutChart data={top10ValidatorsAccordingStake}
            tooltipTitle="compare amount of luna staked by top 10 validators"
            modelInfo="top ten validator according amount of staked Luna"
            title="top ten validator according amount of staked Luna"
            dataKey="total staked in LUNA"
            nameKey="label"
          />
          <DonutChart data={top10ValidatorsAccordingStake}
            tooltipTitle="compare price of total Luna staked by top 10 validators and calculate Luna price at deligation time"
            modelInfo="top validator as staked Luna(as USD)"
            title="top validator as staked Luna(as USD)"
            dataKey="total staked in USD"
            nameKey="label"
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
