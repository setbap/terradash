import { Box, Text, chakra, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { LunaVsBtcPrice, LunaVsEthPrice } from "types/type";

import MultiChartBox from "lib/components/basic/MultiLineChart";
import BarGraph from "lib/components/basic/BarGraph";
interface Props {
  lunaVsETHPrice: LunaVsEthPrice[];
  lunaVsBtcPrice: LunaVsBtcPrice[]
}

const Home = ({ lunaVsETHPrice, lunaVsBtcPrice }: Props) => {
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
          <MultiChartBox data={lunaVsETHPrice}
            chartColors={['#0953fe', '#5D638A']}
            tooltipTitle={["luna price", "eth price"]}
            modelInfo="Luna Price vs ETH price"
            title="Luna Price vs ETH price"
            areaDataKey={["luna", "eth"]}
            xAxisDataKey="day" />
          <BarGraph
            modelInfo="Luna Price vs ETH price in %"
            values={lunaVsETHPrice}
            title=" ETH price change% vs Luna  "
            dataKey="day"
            oyLabel="change in %"
            oxLabel="day"
            yLimit={[-50, 50]}
            labels={[
              { key: "luna change", color: "#0953fe" },
              { key: "eth change", color: "#5D638A" },
            ]}
          />



          <MultiChartBox data={lunaVsBtcPrice}
            chartColors={['#0953fe', '#f2a900']}
            tooltipTitle={["luna price", "btc price"]}
            modelInfo="compare btc price vs luna price"
            title="Terra daily new user"
            areaDataKey={["luna", "btc"]}
            xAxisDataKey="day" />


          <BarGraph
            modelInfo="Luna Price vs BTC price in %"
            values={lunaVsBtcPrice}
            title=" BTC price change% vs Luna  "
            dataKey="day"
            oyLabel="change in %"
            oxLabel="day"
            yLimit={[-50, 50]}
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
