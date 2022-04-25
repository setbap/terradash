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
  avgUSTPrice: AvgUSTPrice[]
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
            link="https://app.flipsidecrypto.com/velocity/queries/a99f1fa8-2590-4eb5-9473-7d6006b40fea"
            status="inc"
            title={"Current LUNA Price (USD)"}
            stat={curentLunaPrice["PRICE_USD"]}
          />
          <StatsCard
            link="https://app.flipsidecrypto.com/velocity/queries/129cfcfb-1d97-4454-a7b8-d8111f8173f2"
            status="inc"
            title={"# Unique Terra Wallets"}
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
            queryLink="https://app.flipsidecrypto.com/velocity/queries/09d05805-ce6e-470b-9bdc-3a2d5f89654d"
            showMonthly
            tooltipTitle="Terra Transactions"
            modelInfo="Terra transactions over time."
            title="Number of Terra Transactions"
            baseSpan={3}
            areaDataKey="Transaction Count"
            xAxisDataKey="day" />
          <ChartBox
            queryLink="https://app.flipsidecrypto.com/velocity/queries/0c3eda6f-92bc-4594-a00d-fea003875016"
            data={circulationSupplyLuna}
            tooltipTitle="circulation supply luna"
            modelInfo={`Circulating supply is the total LUNA that normal users have (not dex, cex, smart contract, etc)`}
            title="LUNA Circulating Supply"
            areaDataKey="LUNA Circulating Supply"
            xAxisDataKey="day"
            baseSpan={2}
          />
          <ChartBox
            queryLink="https://app.flipsidecrypto.com/velocity/queries/687c37e7-d15d-48e4-a453-d5bf7e589580"
            data={dailyNewUserSince2022}
            tooltipTitle={"amount"}
            modelInfo="see the number of unique users who transaction in this blockchain per day. The increase in users is clearly evident and is a testament to Terra popularity among the cryptocurrency community."
            title="Daily New Users"
            areaDataKey={"New Users"}
            xAxisDataKey="day"
          />
          <ChartBox
            queryLink="https://app.flipsidecrypto.com/velocity/queries/54bbe92e-5034-4a5e-af54-c45663caa567"
            data={dailyNewUser}
            tooltipTitle="New wallet count"
            modelInfo={`see the number of unique users who transaction in this blockchain per day. The increase in users is clearly evident and is a testament to Terra popularity among the cryptocurrency community.`}
            title="Daily Unique Users"
            areaDataKey="Daily Unique Users"
            xAxisDataKey="DATE"
          />
          <LineChartV2
            data={dailyActiveWallets.numberOfDailyActiveWallets}
            queryLink="https://app.flipsidecrypto.com/dashboard/active-user-over-the-time-jMf4wy"
            showMonthly
            monthlyData={dailyActiveWallets.numberOfMonthlyActiveWallets}
            tooltipTitle="Active Users"
            defultDateView="month"
            modelInfo="Methodology: Active users is the count of unique addresses involved in a transaction, not including validators or oracle voting transactions, calculated through the previous month."
            title="Number of Active Users"
            baseSpan={2}
            areaDataKey="Number of Active Users"
            xAxisDataKey="date" />
          {/* <DonutChart
            queryLink="https://app.flipsidecrypto.com/velocity/queries/8c595217-f3ad-44c9-bf83-853e71ee1c2d"
            data={totalFeeByEachToken}
            tooltipTitle="Total Fees Paid - USD"
            modelInfo="This chart shows the distribution amount of each coin paid as fee."
            title="Total Fees Paid"
            dataKey="amount token"
            nameKey="token name"
          /> */}
          {/*<BarGraph
            queryLink="https://app.flipsidecrypto.com/dashboard/terra-transactions-daily-monthly-all-time-GO-QmX"
            modelInfo="Amount of each token paid as fees."
            values={transactionFees.daily}
            monthlyValues={transactionFees.monthly}
            defualtTime="month"
            title="Fees Paid Over Time"
            disclaimer="(USD Values Coming Soon™)"
            dataKey="date"
            baseSpan={3}
            oyLabel="Amount of Each Token"
            oxLabel="name"
            labels={transactionFees.denums.filter((item: string) => !item.startsWith('ibc')).map((item: string, index: number) => ({ key: item, color: colors[index % colors.length] }))}
        /> */}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
