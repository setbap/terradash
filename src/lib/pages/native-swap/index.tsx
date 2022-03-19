import { Box, Text, chakra, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { DailySwapCount, DailySwapVolume, MostUserIntractedDapps, TopNativeSwapPair } from "types/type";
import ChartBox from 'lib/components/basic/LineChart';
import BarGraph from "lib/components/basic/BarGraph";
import ReactMarkdown from 'react-markdown'
import Renderer from 'chakra-ui-markdown-renderer'
const glossary = `
A swap in Terra Station that uses the Terra protocol’s market function. Market swaps occur between Terra stablecoin denominations or between Terra and Luna.
In this section, you can get some interesting points from terra blockchain and swaps that happen on it.
`

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
        <Box width={'100%'} px='6' py='2' my={'6'} shadow='base' borderRadius={'lg'} backgroundColor={bgCard} pb={8} aria-label="anchor project descrition">
          <chakra.h1
            textAlign={'center'}
            fontSize={'4xl'}
            pb={2}
            fontWeight={'bold'}>
            Glossary
          </chakra.h1>
          <ReactMarkdown components={Renderer()}>
            {glossary}
          </ReactMarkdown>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }} spacing={{ base: 5, lg: 8 }}>
        </SimpleGrid>
        <SimpleGrid py={'8'} columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 2, md: 4, lg: 8 }}>
          <BarGraph
            modelInfo="this chart shows the 10 most popular native swap that occurs in the terra blockchain. LUNA to UST is the most used and after that is UST to LUNA."
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
