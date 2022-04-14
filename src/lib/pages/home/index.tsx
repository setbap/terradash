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
  DailyNewUserSince2022,
  DistributionOfLunaHolders,
  TerraDailyAvgMinMaxPrice,
  TotalBurnLuna,
  TotalLunaSupply,
  TotalNumberOfWallets,
  TotalUSTSupply,
} from "types/type";
import ChartBox from "lib/components/charts/LineChart";
import { StatsCard } from "lib/components/charts/StateCard";
import MultiChartBox from "lib/components/charts/MultiLineChart";
import ReactMarkdown from 'react-markdown'
import Renderer from 'chakra-ui-markdown-renderer'
import BarGraph from "lib/components/charts/BarGraph";


const glossary = `
## [Terra](https://docs.terra.money/docs/learn/glossary.html#terra-core "Permalink to this headline")
Created by start-up **Terraform** Labs and its co-founders [Do Kwon](https://twitter.com/stablekwon) and [Daniel Shin](https://www.linkedin.com/in/danielshin) in 2018, the Terra blockchain underpins a **decentralized finance** (DeFi) ecosystem that creates \`algorithmic stablecoins\`.
In this section, you can get an overview of this blockchain.

## [Luna](https://docs.terra.money/docs/learn/glossary.html#luna "Permalink to this headline")

The native staking token of the Terra protocol. Luna supply expands and contracts in order to maintain the prices of  [Terra stablecoins](https://docs.terra.money/docs/learn/glossary.html#terra-stablecoins). Luna is also used as a governance token.  [Delegators](https://docs.terra.money/docs/learn/glossary.html#delegator)  can stake Luna to receive rewards.
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
  distributionOfLunaHolders: DistributionOfLunaHolders[],
  dailyNewUserSince2022: DailyNewUserSince2022[]
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
  totalNumberOfWallets,
  distributionOfLunaHolders,
  dailyNewUserSince2022
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
            Glossary
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
          columns={{ sm: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 1, md: 2, lg: 4 }}
        >

          <ChartBox
            data={dailyNewUser}
            tooltipTitle="New wallet count"
            modelInfo={`see the number of unique users who transaction in this blockchain per day. The increase in users is clearly evident and is a testament to Terra popularity among the cryptocurrency community.`}
            title="daily unique user"
            areaDataKey="NUMBER_OF_UNIQUE_USER_PER_DAY"
            xAxisDataKey="DATE"
          />

          <ChartBox
            data={circulationSupplyLuna}
            tooltipTitle="circulation supply luna"
            modelInfo={`Circulating supply is the total LUNA that normal users have (not dex, cex, smart contract, etc)`}
            title="Luna circulation supply"
            areaDataKey="Luna Circulating Supply"
            xAxisDataKey="day"
          />
          <ChartBox
            data={avgUSTPrice}
            tooltipTitle="Avg UST price  "
            modelInfo="UST is an algorithmic stablecoin on Terra blockchain but that does not mean the price is always $1. In this chart, you can see the fluctuations of the UST on different days."
            title="Avg Daily UST price "
            areaDataKey="avg price"
            extraDecimal={5}
            domain={[0.9, 1.1]}
            xAxisDataKey="day"
          />
          <ChartBox
            data={circulationSupplyUST}
            tooltipTitle="circulation supply UST"
            modelInfo="Circulating supply is the total UST that normal users have."
            title="UST circulation supply"
            areaDataKey="UST Circulating Supply"
            xAxisDataKey="day"
          />

          <MultiChartBox
            data={terraDailyAvgMinMaxPrice}
            tooltipTitle={["min price", "avg price", "max price"]}
            modelInfo="This chart shows daily price of LUNA. the red line is minimum price and the blue line is maximum price of each day."
            title="Daily Luna Price"
            multiOff
            chartColors={["#F44", "#4F4", "#55f"]}
            areaDataKey={["min price", "avg price", "max price"]}
            xAxisDataKey="day"
          />

          <ChartBox
            data={burnLuna}
            tooltipTitle={"amount"}
            modelInfo="In terra blockchain we have burn event. that means some amount of LUNA burnt daily.amount of burn increase after Columbus-5 update"
            title="Daily Burned Luna"
            areaDataKey={"amount"}
            xAxisDataKey="day"
          />
          <ChartBox
            data={dailyNewUserSince2022}
            tooltipTitle={"amount"}
            modelInfo="see the number of unique users who transaction in this blockchain per day. The increase in users is clearly evident and is a testament to Terra popularity among the cryptocurrency community."
            title="Daily new Usr since 2022"
            areaDataKey={"new users"}
            xAxisDataKey="day"
          />
          <BarGraph
            modelInfo="This chart shows how many users hold between (0,10] LUNA, how many hold between (10,100] LUNA, how many hold between (10o,1000] LUNA and etc."
            values={distributionOfLunaHolders}
            title="distribution of LUNA between holders"
            dataKey="distribution"
            oyLabel="number of wallets"
            oxLabel="group"
            isNotDate
            labels={[
              { key: "number of addresses", color: "#0953fe" },
            ]}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
