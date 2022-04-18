import { Box, chakra, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { AvgFeeEachCoin, AvgTxCountPerBlock, DailyBlockCount, DailyTx, TotalFeeEachCoin, TotalTx } from "types/type";
import ChartBox from 'lib/components/charts/LineChart';
import { StatsCard } from "lib/components/charts/StateCard";
import DonutChart from "lib/components/charts/DonutChart";
import BarGraph from "lib/components/charts/BarGraph";

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

        <SimpleGrid columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} pt='6' spacing={{ base: 5, lg: 8 }}>
          <StatsCard status="inc" title={"Total number of TX in Terra"} stat={totalTx["TOTAL_TX"]} />
          <StatsCard status="inc" title={"Avrage Number of Tx in each block"} stat={avgTxCountPerBlock["avg_tx_count_per_block"]} />

        </SimpleGrid>
        <SimpleGrid py={'6'} columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 2, md: 4, lg: 8 }}>
          <ChartBox data={dailyTx}
            tooltipTitle=" Daily Tx "
            modelInfo="This chart shows how many transactions happen in the terra blockchain per day."
            title="Tx per day"
            areaDataKey="daily TX"
            xAxisDataKey="day" />
          <ChartBox data={dailyBlockCount}
            tooltipTitle=" Daily Block Count "
            modelInfo="This chart shows how many blocks create in the terra blockchain per day."
            title="Block per day"
            domain={[2000, 17000]}
            areaDataKey="daily block count"
            xAxisDataKey="day" />
          <DonutChart data={totalFeeEachCoin}
            tooltipTitle=" Total Fee Paid With Each coin "
            modelInfo="This chart shows the distribution of coins that are paid as fees in the Terra blockchain. To make sense, all volumes are considered in USD."
            title="Total Fee Paid With Each coin"
            dataKey="total fee in USD"
            nameKey="coin"
          />
          <BarGraph
            modelInfo="This chart shows the average amount in usd are paid as fees for each coin in the Terra blockchain."
            values={totalFeeEachCoin}
            title="Avrage Fee Paid With Each coin"
            dataKey="coin"
            oyLabel="amount of fee paid"
            oxLabel="coin"
            isNotDate

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
