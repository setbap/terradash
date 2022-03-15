import { Box, Text, chakra, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { AvgFeeEachCoin, AvgTxCountPerBlock, DailyBlockCount, DailyTx, TotalFeeEachCoin, TotalTx } from "types/type";
import ChartBox from 'lib/components/basic/LineChart';
import { StatsCard } from "lib/components/basic/BasicCard";
import DonutChart from "lib/components/basic/DonutChart";
import BarGraph from "lib/components/basic/BarGraph";
interface Props {
  dailyTx: DailyTx[];
  totalTx: TotalTx;
  totalFeeEachCoin: TotalFeeEachCoin[];
  avgFeeEachCoin: AvgFeeEachCoin[];
  dailyBlockCount: DailyBlockCount[];
  avgTxCountPerBlock: AvgTxCountPerBlock
}

const Home = ({ dailyTx, totalTx, totalFeeEachCoin, avgFeeEachCoin, dailyBlockCount, avgTxCountPerBlock }: Props) => {
  const bgCard = useColorModeValue('white', '#191919');
  return (
    <>
      <Box mx={'auto'} px={{ base: 6, sm: 2, md: 8 }}>
        <Box width={'100%'} px='6' py='2' my={'6'} shadow='base' borderRadius={'lg'} backgroundColor={bgCard} pb={8} aria-label="anchor project descrition">
          <chakra.h1
            textAlign={'center'}
            fontSize={'4xl'}
            pb={2}
            fontWeight={'bold'}>
            Terra Overview
          </chakra.h1>
          <Text>
            Terra is a blockchain project that aims to build a decentralized network that will allow anyone to create a
          </Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard status="inc" title={"Total number of TX in Terra"} stat={totalTx["TOTAL_TX"]} />
          <StatsCard status="inc" title={"Avrage Number of Tx in each block"} stat={avgTxCountPerBlock["avg_tx_count_per_block"]} />

        </SimpleGrid>
        <SimpleGrid my={'8'} columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 2, md: 4, lg: 8 }}>
          <ChartBox data={dailyTx}
            tooltipTitle=" Daily Tx "
            modelInfo="Number of tx per day"
            title="Tx per day"
            areaDataKey="daily TX"
            xAxisDataKey="day" />
          <ChartBox data={dailyBlockCount}
            tooltipTitle=" Daily Block Count "
            modelInfo="Number of Block per day"
            title="Block per day"
            domain={[2000, 17000]}
            areaDataKey="daily block count"
            xAxisDataKey="day" />
          <DonutChart data={totalFeeEachCoin}
            tooltipTitle=" Total Fee Paid With Each coin "
            modelInfo="Amount of other coins are so low that it is not visible in the chart"
            title="Total Fee Paid With Each coin"
            dataKey="total fee in USD"
            nameKey="coin"
          />
          <BarGraph
            modelInfo="Total Fee Paid With Each coin"
            values={totalFeeEachCoin}
            title=" Total Fee Paid With Each coin "
            dataKey="coin"
            oyLabel="amount of fee paid"
            oxLabel="coin"
            isNotDate
            yLimit={[-50, 50]}
            labels={[
              { key: "total fee in USD", color: "#0953fe" },
            ]}
          />
          <BarGraph
            modelInfo="Avrage Fee Paid With Each coin "
            values={avgFeeEachCoin}
            title="Avrage Fee Paid With Each coin "
            dataKey="coin"
            oyLabel="change in %"
            oxLabel="coin"
            isNotDate
            yLimit={[0, 2]}
            labels={[
              { key: "avg fee in USD", color: "#0953fe" },
            ]}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};



export default Home;
