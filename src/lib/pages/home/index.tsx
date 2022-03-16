import {
  Box,
  Text,
  chakra,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AvgUSTPrice,
  BurnLuna,
  CirculationSupplyLuna,
  CirculationSupplyUST,
  CurentLunaPrice,
  DailyNewUser,
  TerraDailyAvgMinMaxPrice,
  TotalBurnLuna,
  TotalLunaSupply,
  TotalNumberOfWallets,
  TotalUSTSupply,
} from "types/type";
import ChartBox from "lib/components/basic/LineChart";
import { StatsCard } from "lib/components/basic/BasicCard";
import MultiChartBox from "lib/components/basic/MultiLineChart";
import ReactMarkdown from 'react-markdown'
import Renderer from 'chakra-ui-markdown-renderer'


const glossary = `
Created by start-up **Terraform** Labs and its co-founders [Do Kwon](https://twitter.com/stablekwon) and [Daniel Shin](https://www.linkedin.com/in/danielshin) in 2018, the Terra blockchain underpins a **decentralized finance** (DeFi) ecosystem that creates \`algorithmic stablecoins\`.
In this section, you can get an overview of this blockchain.
`
interface Props {
  dailyNewUser: DailyNewUser[];
  curentLunaPrice: CurentLunaPrice;
  circulationSupplyLuna: CirculationSupplyLuna[];
  circulationSupplyUST: CirculationSupplyUST[];
  terraDailyAvgMinMaxPrice: TerraDailyAvgMinMaxPrice[];
  burnLuna: BurnLuna[];
  totalBurnLuna: TotalBurnLuna;
  avgUSTPrice: AvgUSTPrice[]
  totalLunaSupply: TotalLunaSupply,
  totalUSTSupply: TotalUSTSupply,
  totalNumberOfWallets: TotalNumberOfWallets,
}

const Home = ({
  dailyNewUser,
  curentLunaPrice,
  circulationSupplyLuna,
  circulationSupplyUST,
  terraDailyAvgMinMaxPrice,
  burnLuna,
  totalBurnLuna,
  avgUSTPrice,
  totalLunaSupply,
  totalUSTSupply,
  totalNumberOfWallets
}: Props) => {
  const bgCard = useColorModeValue("white", "#191919");

  return (
    <>
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 8 }}>
        <Box
          width={"100%"}
          px="6"
          py="2"
          my={"6"}
          shadow="base"
          borderRadius={"lg"}
          backgroundColor={bgCard}
          pb={8}
          aria-label="anchor project descrition"
        >
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            pb={2}
            fontWeight={"bold"}
          >
            Terra Overview
          </chakra.h1>
          <ReactMarkdown components={Renderer()}>
            {glossary}
          </ReactMarkdown>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
          spacing={{ base: 5, lg: 8 }}
        >
          <StatsCard
            status="inc"
            title={"Current Luna Price(USD)"}
            stat={curentLunaPrice["PRICE_USD"]}
          />

          <StatsCard
            status="unchanged"
            title={"LUNA total Supply"}
            stat={totalLunaSupply["LUNA total Supply"]}
          />
          <StatsCard
            status="unchanged"
            title={"UST total Supply"}
            stat={totalUSTSupply["UST total Supply"]}
          />

          <StatsCard
            status="inc"
            title={"Total burn Luna from Col5"}
            stat={totalBurnLuna["burnt_luna"]}
          />

          <StatsCard
            status="inc"
            title={"Total Number of Unique Wallet"}
            stat={totalNumberOfWallets["total number of user"]}
          />
        </SimpleGrid>
        <SimpleGrid
          transition={'all 0.9s ease-in-out'}
          py={"8"}
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 1, md: 2, lg: 4 }}
        >

          <ChartBox
            data={dailyNewUser}
            tooltipTitle="New wallet count"
            modelInfo="Daily New User"
            title="Terra daily new user"
            areaDataKey="NUMBER_OF_UNIQUE_USER_PER_DAY"
            xAxisDataKey="DATE"
          />

          <ChartBox
            data={circulationSupplyLuna}
            tooltipTitle="circulation supply luna"
            modelInfo="show circulation supply luna"
            title="Luna circulation supply"
            areaDataKey="Luna Circulating Supply"
            xAxisDataKey="day"
          />
          <ChartBox
            data={avgUSTPrice}
            tooltipTitle="Avg UST price on Ethereum "
            modelInfo="Avg UST price on Ethereum "
            title="Avg Daily UST price on Ethereum "
            areaDataKey="avg price"
            extraDecimal={5}
            domain={[0.9, 1.1]}
            xAxisDataKey="day"
          />
          <ChartBox
            data={circulationSupplyUST}
            tooltipTitle="circulation supply UST"
            modelInfo="show circulation supply UST"
            title="UST circulation supply"
            areaDataKey="UST Circulating Supply"
            xAxisDataKey="day"
          />

          <MultiChartBox
            data={terraDailyAvgMinMaxPrice}
            tooltipTitle={["min price", "avg price", "max price"]}
            modelInfo="Show daily Luna price"
            title="Daily Luna Price"
            multiOff
            chartColors={["#F44", "#4F4", "#55f"]}
            areaDataKey={["min price", "avg price", "max price"]}
            xAxisDataKey="day"
          />

          <ChartBox
            data={burnLuna}
            tooltipTitle={"amount"}
            modelInfo="burn luna from columbus 5 update"
            title="Daily Burned Luna"
            areaDataKey={"amount"}
            xAxisDataKey="day"
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
