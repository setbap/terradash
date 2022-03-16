import { Box, Text, chakra, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { DailyNewUser, DailySwapCount, DailySwapVolume, TopNativeSwapPair } from "types/type";
import ChartBox from 'lib/components/basic/LineChart';
import BarGraph from "lib/components/basic/BarGraph";
interface Props {
  topNativeSwapPair: TopNativeSwapPair[];
  dailySwapCount: DailySwapCount[];
  dailySwapVolume: DailySwapVolume[];
}

const Home = ({ topNativeSwapPair, dailySwapCount, dailySwapVolume }: Props) => {
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


        </SimpleGrid>
        <SimpleGrid my={'8'} columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 2, md: 4, lg: 8 }}>
          <BarGraph
            modelInfo="Top native swap pairs in Terra"
            values={topNativeSwapPair}
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
            modelInfo="show daily native swap count"
            title="daily native swap count"
            areaDataKey="daily swap count"
            xAxisDataKey="day"
          />
          <ChartBox
            baseSpan={2}
            data={dailySwapVolume}
            tooltipTitle="daily native swap volume"
            modelInfo="show daily native swap volume"
            title="daily native swap volume"
            areaDataKey="daily swap volume in usd"
            xAxisDataKey="day"
          />



        </SimpleGrid>
      </Box>
    </>
  );
};



export default Home;
