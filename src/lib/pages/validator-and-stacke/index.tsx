import {
  Box,
  chakra,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import ReactMarkdown from 'react-markdown'
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
import ChartBox from "lib/components/basic/LineChart";
import { StatsCard } from "lib/components/basic/BasicCard";
import MultiChartBox from "lib/components/basic/MultiLineChart";
import BarGraph from "lib/components/basic/BarGraph";
import DonutChart from "lib/components/basic/DonutChart";



const pageInfo = `
 ### [__Proposals__](https://docs.terra.money/docs/learn/protocol.html#proposals "Permalink to this headline")

  Proposals start as ideas within the community. A community member drafts and submits a proposal alongside an initial deposit.

  The most common proposal types include:

      - Parameter Change Proposal: To change the parameters defined in each module.
      - Community PoolSpend Proposal: To spend funds in the community pool.
      - Text Proposal : To handle other issues like large directional changes or any decision requiring manual implementation.

  ## [__Staking__](https://docs.terra.money/docs/learn/glossary.html#staking "Permalink to this headline")

  When a user delegates or bonds their Luna to an active validator to receive rewards. Bonded Luna adds to a validator’s stake. Validators provide their stakes as collateral to participate in the consensus process. Validators with larger stakes are chosen to participate more often. Validators receive staking rewards for their participation. A validator’s stake can be slashed if the validator misbehaves. Validators never have ownership of a delegator’s Luna, even when staking.
  For more information on staking, visit the  [concepts page](https://docs.terra.money/docs/learn/protocol.html#staking).
  
  ## [__Validator__](https://docs.terra.money/docs/learn/glossary.html#validator "Permalink to this headline")

  A Terra blockchain miner responsible for verifying transactions on the blockchain. Validators run programs called full nodes that allow them to participate in consensus, verify blocks, participate in governance, and receive rewards. The top 130 validators with the highest total stake can participate in consensus.

For more information on validators, visit the  [concepts page](https://docs.terra.money/docs/learn/protocol.html#validators).

## [__Weight__](https://docs.terra.money/docs/learn/glossary.html#weight "Permalink to this headline")

The measure of a  [validator’s](https://docs.terra.money/docs/learn/glossary.html#validator)  total stake. Validators with higher weights get selected more often to propose blocks. A validator’s weight is also a measure of their voting power in  [governance](https://docs.terra.money/docs/learn/glossary.html#governance).
`


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
}

const Home = ({
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
        <Box
          width={"100%"}
          px="6"
          py="2"
          my={"6"}
          shadow="base"
          borderRadius={"lg"}
          backgroundColor={bgCard}
          pb={8}
          aria-label="anchor project descrition"
        >
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            pb={2}
            fontWeight={"bold"}
          >
            Page Data Overview
          </chakra.h1>
          <ReactMarkdown>
            {pageInfo}
          </ReactMarkdown>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
          spacing={{ base: 5, lg: 8 }}
        >
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
          my={"8"}
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 2, md: 4, lg: 8 }}
        >
          <ChartBox
            data={dailyUniqueUserStaked}
            tooltipTitle="daily unique user staked"
            modelInfo="This modal shows number of users daily staking in Terra"
            title="daily unique user staked"
            areaDataKey="daily unique user staked"
            xAxisDataKey="day"
          />
          <MultiChartBox
            data={proposalCountOverTime}
            tooltipTitle={[
              "community poolproposals so far",
              "param proposals so far",
              "text proposals so far",
              "reward weight proposals so far",
            ]}
            modelInfo={''}
            title="Terra Proposal Count Over Time"
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
            data={amoutOfStakedInUSD}
            tooltipTitle="daily staked amount in USD"
            modelInfo="daily staked amount in USD"
            title="daily staked amount in USD"
            areaDataKey="daily staked amount in USD"
            xAxisDataKey="day"
          />
          <MultiChartBox data={proposalsCountMonthlyVsLUNAPrice}
            chartColors={['#0953fe', '#f2a900']}
            isNotDate
            tooltipTitle={["No of proposal", "avg price"]}
            modelInfo="No of proposal vs avg price"
            title="proposal vs avg price"
            areaDataKey={["No of proposal", "avg price"]}
            xAxisDataKey="month" />
          <MultiChartBox data={proposalsCountMonthlyVsMonthlyVotes}
            chartColors={['#0953fe', '#f2a900']}
            isNotDate
            tooltipTitle={["number of proposal", "monthly votes"]}
            modelInfo="monthly votes vs number of proposal"
            title="votes vs proposal"
            areaDataKey={["number of proposal", "monthly votes"]}
            xAxisDataKey="month" />
          <BarGraph
            modelInfo="Top 10 Validators according to their power"
            values={top10Validators}
            title="Top 10 Validators according to their power"
            dataKey="label"
            oyLabel="voting power"
            oxLabel="name"
            isNotDate
            yLimit={[]}
            labels={[
              { key: "voting power", color: "#0953fe" },
            ]}
          />
          <ChartBox
            data={dailyStakingRewards}
            tooltipTitle="daily staking reward in USD"
            modelInfo="daily staking reward in USD"
            title="daily staking reward in USD"
            areaDataKey="daily amount usd"
            xAxisDataKey="day"
          />

          <ChartBox
            data={dailyStakingRewards}
            tooltipTitle="daily staking reward in Luna"
            modelInfo="daily staking reward in Luna"
            title="daily staking reward in Luna"
            areaDataKey="daily amount luna"
            xAxisDataKey="day"
          />
          <DonutChart data={top10ValidatorsAccordingStake}
            tooltipTitle="top ten validator according amount of staked Luna"
            modelInfo="top ten validator according amount of staked Luna"
            title="top ten validator according amount of staked Luna"
            dataKey="total staked in LUNA"
            nameKey="label"
          />
          <DonutChart data={top10ValidatorsAccordingStake}
            tooltipTitle="top validators according amount of staked Luna(as USD)"
            modelInfo="top validator according amount of staked Luna(as USD)"
            title="top validator according amount of staked Luna(as USD)"
            dataKey="total staked in USD"
            nameKey="label"
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
