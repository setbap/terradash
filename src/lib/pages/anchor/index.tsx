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
}
const Home = ({
  sumAnchorDeposite,
  sumAnchorBorrow,
  borrowAndDeposit,
  totalUserBorrowDeposit,
  borrowAndDepositUser,
  anchorDeposite,
}: Props) => {
  const bgCard = useColorModeValue("white", "#191919");
  return (
    <>
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 6 }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
          spacing={{ base: 5, lg: 6 }}
          pt='6'
        >
          <StatsCard
            status="inc"
            title={"Net UST Deposited [past 7 days]"}
            stat={sumAnchorDeposite.PAST_7_AMOUNT}
          />
          <StatsCard
            status="inc"
            title={"Net UST Deposited [past 30 days]"}
            stat={sumAnchorDeposite.PAST_30_AMOUNT}
          />


          <StatsCard
            status="inc"
            title={"Net UST Borrowed [past 7 days] TODO"}
            stat={sumAnchorBorrow.PAST_7_SUM_BORROWS_USD}
          />


        </SimpleGrid>
        <SimpleGrid
          py={"6"}
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 2, md: 4, lg: 6 }}
        >

          <ChartBox
            data={borrowAndDeposit}
            tooltipTitle="Daily Anchor Earn Activity (USD)"
            modelInfo="Daily Earn deposits into Anchor minus redemptions out of Anchor."
            title="Net Depositor Activity (Anchor Earn)"
            areaDataKey="Net Activity"
            xAxisDataKey="DAY"
          />


          <MultiChartBox
            data={borrowAndDepositUser.sort((a, b) => moment(a['day']).isAfter(moment(b['day'])) ? 1 : -1)}
            // tooltipTitle={[
            //   "number of wallet borrows",
            //   "number of wallet deposits",
            // ]}
            modelInfo="Daily # of wallets borrowing and depositing on Anchor."
            title="Daily # of Users Borrowing and Depositing TODO"
            areaDataKey={[
              "number of wallet borrows",
              "number of wallet deposits",
            ]}
            baseSpan={2}
            xAxisDataKey="day"
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
