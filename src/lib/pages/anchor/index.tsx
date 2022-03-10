import { Box, chakra, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "lib/components/basic/BasicCard";
import { AnchorDeposite, DailyNewUser, SumAnchorDeposite, VoterInfo } from "types/type";
import ChartBox from 'lib/components/basic/LineChart';
interface Props {

  anchorDeposite: AnchorDeposite[];
  sumAnchorDeposite: SumAnchorDeposite
}
const Home = ({ anchorDeposite, sumAnchorDeposite }: Props) => {
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


          <ChartBox data={anchorDeposite}
            tooltipTitle="Daily Anchor Deposite(USD)"
            modelInfo="Daily Anchor Deposite"
            title="Anchor Deposite"
            areaDataKey="DEPOSIT_AMOUNT_USD"
            xAxisDataKey="BLOCK_TIMESTAMP" />



        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }} spacing={{ base: 5, lg: 8 }}>

          <StatsCard status="inc" title={"amount deposite in anchor past 7days"} stat={sumAnchorDeposite.PAST_7_DEPOSIT_AMOUNT_USD} />
          <StatsCard status="inc" title={"amount deposite in anchor past 30days"} stat={sumAnchorDeposite.PAST_30_DEPOSIT_AMOUNT_USD} />
          <StatsCard status="inc" title={"all amount deposite in anchor "} stat={sumAnchorDeposite.ALL_DEPOSIT_AMOUNT_USD} />



        </SimpleGrid>
      </Box>
    </>
  );
};



export default Home;
