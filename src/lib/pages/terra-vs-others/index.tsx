import { Box, Text, chakra, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { LunaVsBtcPrice, LunaVsEthPrice } from "types/type";
import ReactMarkdown from 'react-markdown'
import Renderer from 'chakra-ui-markdown-renderer'
import MultiChartBox from "lib/components/charts/MultiLineChart";
import BarGraph from "lib/components/charts/BarGraph";


interface Props {
  lunaVsETHPrice: LunaVsEthPrice[];
  lunaVsBtcPrice: LunaVsBtcPrice[]
}

const Home = ({ lunaVsETHPrice, lunaVsBtcPrice }: Props) => {
  const bgCard = useColorModeValue('white', '#191919');
  return (
    <>
      <Box mx={'auto'} px={{ base: 6, sm: 2, md: 6 }}>
        {/* 
        <SimpleGrid columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 5, lg: 6 }}>


        </SimpleGrid> */}
        <SimpleGrid py={'6'} columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 2, md: 4, lg: 6 }}>
          <MultiChartBox data={lunaVsETHPrice}
            baseSpan={3}
            chartColors={['#0953fe', '#5D638A']}
            modelInfo="this show compare Luna Price vs ETH price.for better showing this two chart have two diffrent scale show split scale for each one. on left hand shows __ETH__ price and right hand shows __Luna__ price "
            title="Luna Price vs ETH price"
            areaDataKey={["luna", "eth"]}
            xAxisDataKey="day" />
          <BarGraph
            baseSpan={3}
            modelInfo="this show change(as percent) Luna Price vs ETH price over the time."
            values={lunaVsETHPrice}
            title=" ETH price change% vs Luna  "
            dataKey="day"
            oyLabel="change in %"
            oxLabel="day"
            labels={[
              { key: "luna change", color: "#0953fe" },
              { key: "eth change", color: "#5D638A" },
            ]}
          />
          <MultiChartBox
            baseSpan={3}
            data={lunaVsBtcPrice}
            chartColors={['#0953fe', '#f2a900']}
            modelInfo="this show compare Luna Price vs BTC price.for better showing this two chart have two diffrent scale show split scale for each one. on left hand shows __BTC__ price and right hand shows __Luna__ price "
            title="Terra daily new user"
            areaDataKey={["luna", "btc"]}
            xAxisDataKey="day" />
          <BarGraph
            baseSpan={3}
            modelInfo="this show change(as percent) Luna Price vs BTC price over the time."
            values={lunaVsBtcPrice}
            title=" BTC price change% vs Luna  "
            dataKey="day"
            oyLabel="change in %"
            oxLabel="day"
            labels={[
              { key: "luna change", color: "#0953fe" },
              { key: "btc change", color: "#f2a900" },
            ]}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};



export default Home;
