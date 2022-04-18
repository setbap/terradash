import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { DailySwapCount, DailySwapVolume, MostUserIntractedDapps, TopNativeSwapPair } from "types/type";
import ChartBox from 'lib/components/charts/LineChart';
import BarGraph from "lib/components/charts/BarGraph";



interface Props {
  topNativeSwapPair: TopNativeSwapPair[];
  dailySwapCount: DailySwapCount[];
  dailySwapVolume: DailySwapVolume[];
  mostUserIntractedDapps: MostUserIntractedDapps[];
}

const Home = ({ topNativeSwapPair, dailySwapCount, dailySwapVolume, mostUserIntractedDapps }: Props) => {
  const bgCard = useColorModeValue('white', '#191919');
  return (
    <>
      <Box mx={'auto'} px={{ base: 6, sm: 2, md: 8 }}>

        {/* <SimpleGrid pt={'6'} columns={{ sm: 1, md: 1, lg: 2, "2xl": 3 }} spacing={{ base: 5, lg: 6 }}>
        </SimpleGrid> */}
        <SimpleGrid py={'6'} columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 2, md: 4, lg: 6 }}>
          <BarGraph
            modelInfo="this chart shows the 10 most popular native swap that occurs in the terra blockchain. LUNA to UST is the most used and after that is UST to LUNA."
            values={topNativeSwapPair}
            baseSpan={1}
            title="Top native swap pairs in Terra"
            dataKey="swap pair"
            oyLabel="number of swaps"
            oxLabel="pair"
            isNotDate
            labels={[
              { key: "number of swap", color: "#0953fe" },
            ]}
          />
          <ChartBox
            baseSpan={2}
            data={dailySwapCount}
            tooltipTitle="daily native swap count"
            modelInfo="This chart shows how many native swaps occur each day on the Terra blockchain."
            title="daily native swap count"
            areaDataKey="daily swap count"
            xAxisDataKey="day"
          />
          <ChartBox
            baseSpan={2}
            data={dailySwapVolume}
            tooltipTitle="daily native swap volume"
            modelInfo="This chart shows the total daily volume of native swaps in the Terra blockchain. To make sense, all volumes are considered in USD."
            title="daily native swap volume"
            areaDataKey="daily swap volume in usd"
            xAxisDataKey="day"
          />
          <BarGraph
            modelInfo="The most interaction with a project means that total number of people used it is more than other projects. This chart shows 10 of these projects."
            values={mostUserIntractedDapps}
            title="Top 10 Dapp with most transactions"
            dataKey="label"
            oyLabel="number of interact"
            oxLabel="name"
            isNotDate
            labels={[
              { key: "number of interact", color: "#0953fe" },
            ]}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};



export default Home;
