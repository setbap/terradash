import { Box, Text, chakra, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { AmoutOfStakedInUSD, DailyNewUser, DailyUniqueUserStaked, TotalLunaStaked, TotalLunaStakedInUSD, TotalWalletAlreadyStaked, TotalWalletStaked } from "types/type";
import ChartBox from 'lib/components/basic/LineChart';
import { StatsCard } from "lib/components/basic/BasicCard";
interface Props {
  dailyUniqueUserStaked: DailyUniqueUserStaked[]
  totalLunaStaked: TotalLunaStaked,
  totalLunaStakedInUSD: TotalLunaStakedInUSD,
  totalWalletStaked: TotalWalletStaked
  totalWalletAlreadyStaked: TotalWalletAlreadyStaked
  amoutOfStakedInUSD: AmoutOfStakedInUSD[]
}

const Home = ({ dailyUniqueUserStaked, amoutOfStakedInUSD, totalLunaStaked, totalLunaStakedInUSD, totalWalletStaked, totalWalletAlreadyStaked }: Props) => {
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
          <StatsCard title="Total Luna Staked" status="inc" stat={totalLunaStaked['LUNA total staked']} />
          <StatsCard title="Total Luna Staked In USD" status="inc" stat={totalLunaStakedInUSD['total staked in usd']} />
          <StatsCard title="Number of wallets they have ever staked" status="inc" stat={totalWalletStaked['Number of wallets they have ever staked']} />
          <StatsCard title="Number of wallets they have already staked" status="inc" stat={totalWalletAlreadyStaked['Number of wallets they have already staked']} />
        </SimpleGrid>
        <SimpleGrid my={'8'} columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 2, md: 4, lg: 8 }}>
          <ChartBox data={dailyUniqueUserStaked}
            tooltipTitle="daily unique user staked"
            modelInfo="Terra daily unique user staked"
            title="daily unique user staked"
            areaDataKey="daily unique user staked"
            xAxisDataKey="day" />
          <ChartBox data={amoutOfStakedInUSD}
            tooltipTitle="daily staked amount in USD"
            modelInfo="daily staked amount in USD"
            title="daily staked amount in USD"
            areaDataKey="daily staked amount in USD"
            xAxisDataKey="day" />
        </SimpleGrid>
      </Box>
    </>
  );
};



export default Home;
