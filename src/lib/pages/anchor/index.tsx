import {
  Box,
  chakra,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { StatsCard } from "lib/components/charts/StateCard";
import {
  AnchorBorrowAndDeposit,
  AnchorBalances,
  AnchorEarnUsers,
  AnchorBorrowUsers,
  CurrentYieldReserve,
  AnchorGrossTVLUSD
} from "types/type";
import ChartBox from "lib/components/charts/LineChart";
import MultiChartBox from "lib/components/charts/MultiLineChart";
import moment from "moment";

interface Props {
  borrowAndDeposit: AnchorBorrowAndDeposit[];
  anchorBalances: AnchorBalances;
  anchorEarnUsers: AnchorEarnUsers[];
  anchorBorrowUsers: AnchorBorrowUsers[];
  currentYieldReserve: CurrentYieldReserve;
  anchorGrossTVLUSD: AnchorGrossTVLUSD[];
}
const Home = ({
  borrowAndDeposit,
  anchorBalances,
  anchorEarnUsers,
  anchorBorrowUsers,
  currentYieldReserve,
  anchorGrossTVLUSD,
}: Props) => {
  return (
    <>
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 6 }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2, "2xl": 3 }}
          spacing={{ base: 5, lg: 6 }}
          pt='6'
        >

          <StatsCard
            status="inc"
            title={"Total Deposits"}
            stat={(+anchorBalances.borrowed_terra / 1000000) + (+anchorBalances.liquid_terra / 1000000)}
          />

          <StatsCard
            status="inc"
            title={"Total Borrowed"}
            stat={(+anchorBalances.borrowed_terra / 1000000)}
          />

          <StatsCard
            status="inc"
            title={"Current APY"}
            stat={+anchorBalances.current_apy * 100}
          />

          <StatsCard
            status="inc"
            title={"Yield Reserve"}
            stat={currentYieldReserve.BALANCE}
          />


        </SimpleGrid>
        <SimpleGrid
          py={"6"}
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 2, md: 4, lg: 6 }}
        >

          <ChartBox
            queryLink="https://app.flipsidecrypto.com/velocity/queries/09651200-e39b-43e0-bc40-6fa2afb18291"
            data={anchorGrossTVLUSD}
            tooltipTitle="Anchor Collateral TVL (in USD)"
            modelInfo="Anchor Collateral TVL (in USD) across all available assets."
            title="Collateral TVL (in USD)"
            areaDataKey="GROSS_TVL_USD"
            xAxisDataKey="DATES"
            baseSpan={3}
            showMonthly={false}
            additionalDumpTextToAddKeyToKeyBeUnique="Collateral TVL"
          />

          <ChartBox
            queryLink="https://app.flipsidecrypto.com/velocity/queries/ed7c8884-c2f7-4243-978a-055ada7f2db2"
            data={borrowAndDeposit}
            tooltipTitle="Net Depositor Activity (Anchor Earn)"
            modelInfo="Daily earn deposits into Anchor minus redemptions out of Anchor."
            title="Net Depositor Activity on Anchor Earn"
            areaDataKey="Net Activity"
            baseSpan={3}
            xAxisDataKey="DAY"
          />

          <ChartBox
            queryLink="https://app.flipsidecrypto.com/velocity/queries/8661c1e7-368b-4dd5-9833-2169d13a6576"
            baseSpan={3}
            data={anchorEarnUsers}
            additionalDumpTextToAddKeyToKeyBeUnique="Users, Earn"
            modelInfo="Daily Active Users, Earn"
            tooltipTitle=""
            title="Daily Active Users on Anchor Earn"
            areaDataKey="UNIQUE_WALLETS"
            xAxisDataKey="DATE"
          />

          <ChartBox
            queryLink="https://app.flipsidecrypto.com/velocity/queries/333c9bdc-c60c-4697-8008-0e6140f0f5e1"
            baseSpan={3}
            additionalDumpTextToAddKeyToKeyBeUnique="Users, Borrow"
            showMonthly={false}
            data={anchorBorrowUsers}
            modelInfo="Daily Active Users on Anchor Borrow"
            tooltipTitle=""
            title="Daily Active Users on Anchor Borrow"
            areaDataKey="UNIQUE_WALLETS"
            xAxisDataKey="DATE"
          />

        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
