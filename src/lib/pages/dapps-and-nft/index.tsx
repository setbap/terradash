import { Box, Text, chakra, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { DailyNewUser } from "types/type";
import ChartBox from 'lib/components/basic/LineChart';
interface Props {
  dailyNewUser: DailyNewUser[];
}

const Home = ({ dailyNewUser }: Props) => {
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
          <ChartBox data={dailyNewUser}
            tooltipTitle="New wallet count"
            modelInfo="Daily New User"
            title="Terra daily new user"
            areaDataKey="NUMBER_OF_UNIQUE_USER_PER_DAY"
            xAxisDataKey="DATE" />
        </SimpleGrid>
      </Box>
    </>
  );
};



export default Home;
