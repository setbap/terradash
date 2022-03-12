import { Box, Text, chakra, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { CirculationSupplyLuna, CirculationSupplyUST, CurentLunaPrice, DailyNewUser, TerraDailyAvgMinMaxPrice } from "types/type";
import ChartBox from 'lib/components/basic/LineChart';
import { StatsCard } from "lib/components/basic/BasicCard";
import MultiChartBox from "lib/components/basic/MultiLineChart";
interface Props {
  dailyNewUser: DailyNewUser[];
  curentLunaPrice: CurentLunaPrice,
  circulationSupplyLuna: CirculationSupplyLuna[]
  circulationSupplyUST: CirculationSupplyUST[]
  terraDailyAvgMinMaxPrice: TerraDailyAvgMinMaxPrice[]
}

const Home = ({ dailyNewUser, curentLunaPrice, circulationSupplyLuna, circulationSupplyUST, terraDailyAvgMinMaxPrice }: Props) => {
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
          <StatsCard status="inc" title={"Current Luna Price(USD)"} stat={curentLunaPrice["PRICE_USD"]} />

        </SimpleGrid>
        <SimpleGrid my={'8'} columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 2, md: 4, lg: 8 }}>
          <ChartBox data={dailyNewUser}
            tooltipTitle="New wallet count"
            modelInfo="Daily New User"
            title="Terra daily new user"
            areaDataKey="NUMBER_OF_UNIQUE_USER_PER_DAY"
            xAxisDataKey="DATE" />
          <ChartBox data={circulationSupplyLuna}
            tooltipTitle="circulation supply luna"
            modelInfo="show circulation supply luna"
            title="Luna circulation supply"
            areaDataKey="Luna Circulating Supply"
            xAxisDataKey="day" />
          <ChartBox data={circulationSupplyUST}
            tooltipTitle="circulation supply UST"
            modelInfo="show circulation supply UST"
            title="UST circulation supply"
            areaDataKey="UST Circulating Supply"
            xAxisDataKey="day" />

          <MultiChartBox data={terraDailyAvgMinMaxPrice}
            tooltipTitle={["min price", "avg price", "max price"]}
            modelInfo="Show daily Luna price"
            title="Daily Luna Price"
            multiOff
            chartColors={["#F44", "#4F4", "#55f"]}
            areaDataKey={["min price", "avg price", "max price"]}
            xAxisDataKey="day" />

        </SimpleGrid>
      </Box>
    </>
  );
};



export default Home;
