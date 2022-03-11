import { Box, chakra, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { StatsCard } from "lib/components/basic/BasicCard";
import { AnchorBorrowAndDeposit, AnchorUserBorrowAndDeposit, SumAnchorBorrows, SumAnchorDeposite } from "types/type";
import ChartBox from 'lib/components/basic/LineChart';
import MultiChartBox from "lib/components/basic/MultiLineChart";
interface Props {
  totalUserBorrowDeposit: AnchorUserBorrowAndDeposit
  sumAnchorDeposite: SumAnchorDeposite
  sumAnchorBorrow: SumAnchorBorrows,
  borrowAndDeposit: AnchorBorrowAndDeposit[]
  borrowAndDepositUser: AnchorUserBorrowAndDeposit[]
}
const Home = ({ sumAnchorDeposite, sumAnchorBorrow, borrowAndDeposit, totalUserBorrowDeposit, borrowAndDepositUser }: Props) => {
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
            What is Going on in Anchor?
          </chakra.h1>
          <Text>
            Anchor is a decentralized savings protocol offering low-volatile yields on Terra stablecoin deposits. The Anchor rate is powered by a diversified stream of staking rewards from major proof-of-stake blockchains, and therefore can be expected to be much more stable than money market interest rates.  The Anchor community believes that a stable, reliable source of yield in Anchor has the opportunity to become the reference interest rate in crypto.
          </Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard status="inc" title={"amount deposite in anchor past 7days"} stat={sumAnchorDeposite.PAST_7_DEPOSIT_AMOUNT_USD} />
          <StatsCard status="inc" title={"amount deposite in anchor past 30days"} stat={sumAnchorDeposite.PAST_30_DEPOSIT_AMOUNT_USD} />
          <StatsCard status="inc" title={"all amount deposite in anchor "} stat={sumAnchorDeposite.ALL_DEPOSIT_AMOUNT_USD} />

          <StatsCard status="inc" title={"amount borrow in anchor past 7days"} stat={sumAnchorBorrow.PAST_7_SUM_BORROWS_USD} />
          <StatsCard status="inc" title={"amount borrow in anchor past 30days"} stat={sumAnchorBorrow.PAST_30_SUM_BORROWS_USD} />
          <StatsCard status="inc" title={"all amount borrow in anchor "} stat={sumAnchorBorrow.ALL_SUM_BORROWS_USD} />

          <StatsCard status="dec" title={"Total difference Borrow and Deposit(USD) "}
            stat={borrowAndDeposit.at(-1)?.["sum diffrent borrows and deposits"] ?? 0} />

          <StatsCard status="inc" title={"Number of unique user borrow"} stat={totalUserBorrowDeposit["unique user borrows"]} />
          <StatsCard status="inc" title={"Number of unique user deposit"} stat={totalUserBorrowDeposit["unique user deposits"]} />


        </SimpleGrid>
        <SimpleGrid my={'8'} columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 2, md: 4, lg: 8 }}>
          <ChartBox data={borrowAndDeposit}
            tooltipTitle="Daily Anchor Deposite(USD)"
            modelInfo="Daily Anchor Deposite"
            title="Anchor Deposite"
            areaDataKey="daily deposits"
            xAxisDataKey="DAY" />

          <ChartBox data={borrowAndDeposit}
            tooltipTitle="Daily Anchor Borrows(USD)"
            modelInfo="Daily Anchor Borrows"
            title="Anchor Borrow(USD)"
            areaDataKey="daily borrows"
            xAxisDataKey="DAY" />

          <ChartBox data={borrowAndDeposit}
            tooltipTitle={"diffrent borrows and deposits(USD)"}
            modelInfo="diffrent borrows and deposits"
            title="diffrent borrows and deposits(USD)"
            areaDataKey={"diffrent borrows and deposits"}
            xAxisDataKey="DAY" />

          <ChartBox data={borrowAndDeposit}
            tooltipTitle={"Acumulative diffrent borrows and deposits(USD)"}
            modelInfo="Acumulative diffrent borrows and deposits"
            title="Acumulative diffrent borrows and deposits(USD)"
            areaDataKey={"sum diffrent borrows and deposits"}
            xAxisDataKey="DAY" />

          <MultiChartBox data={borrowAndDepositUser}
            tooltipTitle={["number of wallet borrows", "number of wallet deposits"]}
            modelInfo="Acumulative diffrent borrows and deposits"
            title="Acumulative diffrent borrows and deposits(USD)"
            areaDataKey={["number of wallet borrows", "number of wallet deposits"]}
            xAxisDataKey="day" />

          {/* <BarGraph
            values={borrowAndDeposit}
            title="DayAhead Predicted Consumption"
            dataKey="DAY"
            oyLabel="KWh"
            oxLabel="hours"
            yLimit={[-80_000_000, 80_000_000]}
            labels={[
              { key: "sum diffrent borrows and deposits", color: "#8884d8" },
              { key: "daily deposits", color: "#82ca9d" },
              { key: "daily borrows", color: "#81cc2d" }
            ]}
          /> */}
        </SimpleGrid>

      </Box>
    </>
  );
};



export default Home;
