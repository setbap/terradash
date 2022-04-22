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
            title={"Total Number of Unique Wallets"}
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
            tooltipTitle="Terra Transactions"
            modelInfo="Terra transactions over time."
            title="Terra Transactions per "
            baseSpan={3}
            areaDataKey="transaction count"
            xAxisDataKey="day" />
          <LineChartV2
            data={dailyActiveWallets.numberOfDailyActiveWallets}
            queryLink="https://app.flipsidecrypto.com/dashboard/active-user-over-the-time-jMf4wy"
            showMonthly
            monthlyData={dailyActiveWallets.numberOfMonthlyActiveWallets}
            tooltipTitle="Active Users"
            defultDateView="month"
            modelInfo="Methodology: Active users is the count of unique addresses involved in a transaction, not including validators or oracle voting transactions, calculated through the previous month."
            title="Active Users per "
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
            modelInfo="Amount of each token paid as fees."
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
            title={"Current Luna Price (USD)"}
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
            modelInfo={`Held by typical users, e.g. does not include exchages (dex or cex), or smart contracts, etc.`}
            title="Circulating Supply LUNA"
            areaDataKey="Luna Circulating Supply"
            xAxisDataKey="day"
          />
          <ChartBox
            data={avgUSTPrice}
            tooltipTitle="Avg Daily UST Price (USD)"
            modelInfo="UST is an algorithmic stablecoin on Terra blockchain."
            title="[next]Avg Daily UST Price (USD)"
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
            modelInfo="Daily LUNA price with daily minimum in red and daily maximum in blue."
            title="[v1.5]Daily Luna Price"
            multiOff
            chartColors={["#F44", "#4F4", "#55f"]}
            areaDataKey={["min price", "avg price", "max price"]}
            xAxisDataKey="day"
          />

          <ChartBox
            data={burnLuna}
            tooltipTitle={"amount"}
            modelInfo="LUNA is burnt daily to sustain Terra's economics. Burn amounts increased after the Oct 2021 Columbus-5 network update."
            title="[v1.5]Burned Luna per"
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
            modelInfo="Count of users holding between (0,10] LUNA, (10,100] LUNA, (100,1000] LUNA etc."
            values={distributionOfLunaHolders}
            title="[next] LUNA holders by amount held"
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
