import {
  Box,
  chakra,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AvgUSTPrice,
  BurnLuna,
  ChangedDailyTx,
  CirculationSupplyLuna,
  CirculationSupplyUST,
  CurentLunaPrice,
  DailyNewUser,
  DailyNewUserSince2022,
  DailyTx,
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
import BarGraph from "lib/components/charts/BarGraph";



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
  distributionOfLunaHolders: DistributionOfLunaHolders[],
  dailyNewUserSince2022: DailyNewUserSince2022[],




  totalNumberOfWallets: TotalNumberOfWallets,
  terraDailyTx: ChangedDailyTx[];
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
  distributionOfLunaHolders,
  dailyNewUserSince2022,


  terraDailyTx,
  totalNumberOfWallets,
}: Props) => {
  const bgCard = useColorModeValue("white", "#191919");

  return (
    <>
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 8 }}>
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
          spacing={{ base: 5, lg: 8 }}
        >
          <StatsCard
            status="inc"
            title={"Total Number of Unique Wallet"}
            stat={totalNumberOfWallets["total number of user"]}
          />
        </SimpleGrid>
        <SimpleGrid
          transition={'all 0.9s ease-in-out'}
          py={"6"}
          columns={{ sm: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 1, md: 2, lg: 4 }}
        >
          <ChartBox data={terraDailyTx}
            showMonthly
            tooltipTitle=" Tx "
            modelInfo="This chart shows how many transactions happen in the terra blockchain per day."
            title="Tx per "
            areaDataKey="transaction count"
            xAxisDataKey="day" />
        </SimpleGrid>

        {/* old ---------------------------- old */}
        <SimpleGrid
          my={"6"}
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
          py={"6"}
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
            // tooltipTitle={["min price", "avg price", "max price"]}
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
