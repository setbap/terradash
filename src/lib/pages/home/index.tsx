import {
  Box,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AtiveUserOverTime,
  AvgUSTPrice,
  BurnLuna,
  ChangedDailyTx,
  CirculationSupplyLuna,
  CirculationSupplyUST,
  CurentLunaPrice,
  DailyNewUser,
  DailyNewUserSince2022,
  DistributionOfLunaHolders,
  SimpilifiedTotalFeeByEachToken,
  TerraDailyAvgMinMaxPrice,
  TotalBurnLuna,
  TotalLunaSupply,
  TotalNumberOfWallets,
  TotalUSTSupply,
} from "types/type";
import ChartBox from "lib/components/charts/LineChart";
import LineChartV2 from "lib/components/charts/LineChartV2";
import { StatsCard } from "lib/components/charts/StateCard";
import MultiChartBox from "lib/components/charts/MultiLineChart";
import BarGraph from "lib/components/charts/BarGraph";
import DonutChart from "lib/components/charts/DonutChart";

const colors = ["#ffc107", "#ff5722", "#03a9f4", "#4caf50", "#00bcd4", "#f44336", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#009688", "#607d8b"]

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


  totalFeeByEachToken: SimpilifiedTotalFeeByEachToken[]
  transactionFees: any,
  totalNumberOfWallets: TotalNumberOfWallets,
  terraDailyTx: ChangedDailyTx[];
  dailyActiveWallets: AtiveUserOverTime

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


  totalFeeByEachToken,
  transactionFees,
  terraDailyTx,
  totalNumberOfWallets,
  dailyActiveWallets,
}: Props) => {
  const bgCard = useColorModeValue("white", "#191919");

  return (
    <>
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 8 }}>
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 2, "2xl": 3 }}
          spacing={{ base: 5, lg: 8 }}
        >
          <StatsCard
            status="inc"
            title={"Total Number of Unique Wallet"}
            stat={totalNumberOfWallets["total number of user"]}
          />
        </SimpleGrid>
        <SimpleGrid
          position={'relative'}
          transition={'all 0.9s ease-in-out'}
          py={"6"}
          zIndex={100}
          columns={{ sm: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 1, md: 2, lg: 4 }}
        >

          <ChartBox data={terraDailyTx}
            showMonthly
            tooltipTitle=" Tx "
            modelInfo="This chart shows how many transactions happen in the terra blockchain per day."
            title="Tx per "
            baseSpan={3}
            areaDataKey="transaction count"
            xAxisDataKey="day" />
          <LineChartV2
            data={dailyActiveWallets.numberOfDailyActiveWallets}
            queryLink="https://app.flipsidecrypto.com/dashboard/active-user-over-the-time-jMf4wy"
            showMonthly
            monthlyData={dailyActiveWallets.numberOfMonthlyActiveWallets}
            tooltipTitle=" Tx "
            defultDateView="month"
            modelInfo="This chart shows how many transactions happen in the terra blockchain per day."
            title="Active user per "
            baseSpan={2}
            areaDataKey="number of active user"
            xAxisDataKey="date" />
          <DonutChart
            queryLink="https://app.flipsidecrypto.com/velocity/queries/8c595217-f3ad-44c9-bf83-853e71ee1c2d"
            data={totalFeeByEachToken}
            tooltipTitle="[changed] Total Fees Paid - USD"
            modelInfo="This chart shows the distribution amount of each coin paid as fee."
            title="Total amount of each token  paid as fee"
            dataKey="amount token"
            nameKey="token name"
          />
          <BarGraph
            queryLink="https://app.flipsidecrypto.com/dashboard/terra-transactions-daily-monthly-all-time-GO-QmX"
            modelInfo="shows amount of each token paid as fee over the time"
            values={transactionFees.daily}
            monthlyValues={transactionFees.monthly}
            defualtTime="month"
            title="Fees Paid Over Time"
            dataKey="date"
            baseSpan={3}
            oyLabel="Amout of each Token"
            oxLabel="name"
            labels={transactionFees.denums.filter((item: string) => !item.startsWith('ibc')).map((item: string, index: number) => ({ key: item, color: colors[index % colors.length] }))}
          />
        </SimpleGrid>

        {/* old ---------------------------- old */}
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 2, "2xl": 3 }}
          spacing={{ base: 5, lg: 8 }}
        >
          <StatsCard
            status="inc"
            title={"Current Luna Price(USD)"}
            stat={curentLunaPrice["PRICE_USD"]}
          />

          <StatsCard
            status="unchanged"
            title={"[v1.5]LUNA total Supply"}
            stat={totalLunaSupply["LUNA total Supply"]}
          />
          <StatsCard
            status="unchanged"
            title={"[v1.5]UST total Supply"}
            stat={totalUSTSupply["UST total Supply"]}
          />

          <StatsCard
            status="inc"
            title={"[next]Total burn Luna from Col5"}
            stat={totalBurnLuna["burnt_luna"]}
          />

          <StatsCard
            status="inc"
            title={"[delete duplicated]Total Number of Unique Wallet"}
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
            title="[next]Avg Daily UST price "
            areaDataKey="avg price"
            extraDecimal={5}
            domain={[0.9, 1.1]}
            xAxisDataKey="day"
          />
          <ChartBox
            data={circulationSupplyUST}
            tooltipTitle="circulation supply UST"
            modelInfo="Circulating supply is the total UST that normal users have."
            title="[delete]UST circulation supply"
            areaDataKey="UST Circulating Supply"
            xAxisDataKey="day"
          />

          <MultiChartBox
            data={terraDailyAvgMinMaxPrice}
            // tooltipTitle={["min price", "avg price", "max price"]}
            modelInfo="This chart shows daily price of LUNA. the red line is minimum price and the blue line is maximum price of each day."
            title="[v1.5]Daily Luna Price"
            multiOff
            chartColors={["#F44", "#4F4", "#55f"]}
            areaDataKey={["min price", "avg price", "max price"]}
            xAxisDataKey="day"
          />

          <ChartBox
            data={burnLuna}
            tooltipTitle={"amount"}
            modelInfo="In terra blockchain we have burn event. that means some amount of LUNA burnt daily.amount of burn increase after Columbus-5 update"
            title="[v1.5]Daily Burned Luna"
            areaDataKey={"amount"}
            xAxisDataKey="day"
          />
          <ChartBox
            data={dailyNewUserSince2022}
            tooltipTitle={"amount"}
            modelInfo="see the number of unique users who transaction in this blockchain per day. The increase in users is clearly evident and is a testament to Terra popularity among the cryptocurrency community."
            title="[change]Daily New Users - 2022"
            areaDataKey={"new users"}
            xAxisDataKey="day"
          />
          <BarGraph
            modelInfo="This chart shows how many users hold between (0,10] LUNA, how many hold between (10,100] LUNA, how many hold between (10o,1000] LUNA and etc."
            values={distributionOfLunaHolders}
            title="[next]distribution of LUNA between holders"
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
