import { Box, chakra, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "lib/components/basic/BasicCard";
import { AnchorDeposite, DailyNewUser, SumAnchorDeposite, VoterInfo } from "types/type";
import ChartBox from 'lib/components/basic/LineChart';
interface Props {
  voterInfo: VoterInfo;
  dailyNewUser: DailyNewUser[];
  anchorDeposite: AnchorDeposite[];
  sumAnchorDeposite: SumAnchorDeposite
}
const Home = ({ voterInfo, dailyNewUser, anchorDeposite, sumAnchorDeposite }: Props) => {
  return (
    <>
      <Box mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          What is happend in Terra?
        </chakra.h1>

        <SimpleGrid mb={'8'} columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 2, md: 4, lg: 8 }}>

          <ChartBox data={dailyNewUser}
            tooltipTitle="New wallet count"
            modelInfo="Daily New User"
            title="Terra daily new user"
            areaDataKey="NUMBER_OF_UNIQUE_USER_PER_DAY"
            xAxisDataKey="DATE" />

          <ChartBox data={anchorDeposite}
            tooltipTitle="Daily Anchor Deposite(USD)"
            modelInfo="Daily Anchor Deposite"
            title="Anchor Deposite"
            areaDataKey="DEPOSIT_AMOUNT_USD"
            xAxisDataKey="BLOCK_TIMESTAMP" />

          <ChartBox data={dailyNewUser}
            tooltipTitle="New wallet count"
            modelInfo="Daily New User"
            title="Terra daily new user"
            areaDataKey="NUMBER_OF_UNIQUE_USER_PER_DAY"
            xAxisDataKey="DATE" />

          <ChartBox data={dailyNewUser}
            tooltipTitle="New wallet count"
            modelInfo="Daily New User"
            title="Terra daily new user"
            areaDataKey="NUMBER_OF_UNIQUE_USER_PER_DAY"
            xAxisDataKey="DATE" />
          <ChartBox data={dailyNewUser}
            tooltipTitle="New wallet count"
            modelInfo="Daily New User"
            title="Terra daily new user"
            areaDataKey="NUMBER_OF_UNIQUE_USER_PER_DAY"
            xAxisDataKey="DATE" />



        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>

          <StatsCard status="inc" title={"Number Of Mir Voter"} stat={voterInfo.NUMBER_OF_MIR_VOTER} />
          <StatsCard status="inc" title={"Number Of Anchor Voter"} stat={voterInfo.NUMBER_OF_ANCHOR_VOTER} />
          <StatsCard status="inc" title={"Number Of Terra Voter"} stat={voterInfo.NUMBER_OF_TERRA_VOTER} />
          <StatsCard status="inc" title={"Number Of Unique Voter"} stat={voterInfo.NUMBER_OF_UNIQUE_VOTER} />
          <StatsCard status="inc" title={"Number Of Voter Whales"} stat={voterInfo.NUMBER_OF_VOTER_WHALES} />

        </SimpleGrid>
      </Box>
    </>
  );
};



export default Home;
