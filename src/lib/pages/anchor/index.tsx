import {
  Box,
  chakra,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { StatsCard } from "lib/components/charts/StateCard";
import {
  AnchorBorrowAndDeposit,
  AnchorUserBorrowAndDeposit,
  SumAnchorBorrows,
  SumAnchorDeposite,
  AnchorDeposite,
  AnchorBalances,
  AnchorEarnUsers,
  AnchorBorrowUsers,
  CurrentYieldReserve,
} from "types/type";
import ChartBox from "lib/components/charts/LineChart";
import MultiChartBox from "lib/components/charts/MultiLineChart";
import moment from "moment";

interface Props {
  totalUserBorrowDeposit: AnchorUserBorrowAndDeposit;
  sumAnchorDeposite: SumAnchorDeposite;
  sumAnchorBorrow: SumAnchorBorrows;
  borrowAndDeposit: AnchorBorrowAndDeposit[];
  borrowAndDepositUser: AnchorUserBorrowAndDeposit[];
  anchorDeposite: AnchorDeposite[];
  anchorBalances: AnchorBalances;
  anchorEarnUsers: AnchorEarnUsers[];
  anchorBorrowUsers: AnchorBorrowUsers[];
  currentYieldReserve: CurrentYieldReserve[];
}
const Home = ({
  sumAnchorDeposite,
  sumAnchorBorrow,
  borrowAndDeposit,
  totalUserBorrowDeposit,
  borrowAndDepositUser,
  anchorDeposite,
  anchorBalances,
  anchorEarnUsers,
  anchorBorrowUsers,
  currentYieldReserve,
}: Props) => {
  const bgCard = useColorModeValue("white", "#191919");
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
            title={"UST Reserves"}
            stat={(+anchorBalances.liquid_terra / 1000000)}
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
            data={borrowAndDeposit}
            tooltipTitle="Net Depositor Activity (Anchor Earn)"
            modelInfo="Daily earn deposits into Anchor minus redemptions out of Anchor."
            title="Net Depositor Activity on Anchor Earn"
            areaDataKey="Net Activity"
            baseSpan={2}
            xAxisDataKey="DAY"

          />

          <ChartBox
            data={anchorEarnUsers}
            additionalDumpTextToAddKeyToKeyBeUnique="Users, Earn"
            modelInfo="Daily Active Users, Earn"
            tooltipTitle=""
            title="Daily Active Users on Anchor Earn"
            areaDataKey="UNIQUE_WALLETS"
            xAxisDataKey="DATE"
          />

          <ChartBox
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
