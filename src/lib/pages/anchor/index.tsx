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
            title={"Total UST Deposited [past 7 days]"}
            stat={sumAnchorDeposite.PAST_7_DEPOSIT_AMOUNT_USD}
          />
          <StatsCard
            status="inc"
            title={"Total UST Deposited [past 30 days]"}
            stat={sumAnchorDeposite.PAST_30_DEPOSIT_AMOUNT_USD}
          />
          <StatsCard
            status="inc"
            title={"Total UST Deposited [all time]"}
            stat={sumAnchorDeposite.ALL_DEPOSIT_AMOUNT_USD}
          />

          <StatsCard
            status="inc"
            title={"Total UST Borrowed [past 7 days]"}
            stat={sumAnchorBorrow.PAST_7_SUM_BORROWS_USD}
          />
          <StatsCard
            status="inc"
            title={"Total UST Borrowed [past 30 days]"}
            stat={sumAnchorBorrow.PAST_30_SUM_BORROWS_USD}
          />
          <StatsCard
            status="inc"
            title={"Total UST Borrowed [all time]"}
            stat={sumAnchorBorrow.ALL_SUM_BORROWS_USD}
          />

          <StatsCard
            status="dec"
            title={"Borrows Minus Deposits (USD)"}
            stat={
              borrowAndDeposit.length
                ? borrowAndDeposit[borrowAndDeposit.length - 1]?.[
                "sum diffrent redeems and deposits"
                ]
                : 0
            }
          />

          <StatsCard
            status="inc"
            title={"# of Unique Users Who Borrowed"}
            stat={totalUserBorrowDeposit["unique user borrows"]}
          />
          <StatsCard
            status="inc"
            title={"# of Unique Users Who Deposited"}
            stat={totalUserBorrowDeposit["unique user deposits"]}
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

          <ChartBox
            data={borrowAndDeposit}
            tooltipTitle="Daily Anchor Borrows(USD)"
            modelInfo="Daily amount borrowed from Anchor on the Terra blockchain."
            title="Anchor Borrows (USD)"
            areaDataKey="daily redeems"
            xAxisDataKey="DAY"
          />

          <ChartBox
            data={borrowAndDeposit}
            tooltipTitle={"Difference between borrow and deposit (USD)"}
            modelInfo="Difference between depositing and borrowing in USD on Anchor per day. Zero line means deposits and borrows are equal. Above zero means borrows are more than deposits; below zero means deposits are more than borrows."
            title="Borrows Minus Deposits (USD)"
            areaDataKey={"Net Activity"}
            xAxisDataKey="DAY"
          />

          <ChartBox
            data={borrowAndDeposit}
            tooltipTitle={"Cumulative difference between borrows and deposits (USD)"}
            modelInfo="Cumulative difference between borrows and deposits on Anchor. If the chart is a constant line, this means deposits and borrows are holding equal. Ascending means borrows are continually outpacing deposits over time; descending means deposits are continually outpacing borrows over time."
            title="Borrows Minus Deposits - Cumulative (USD)"
            areaDataKey={"sum diffrent redeems and deposits"}
            xAxisDataKey="DAY"
          />

          <MultiChartBox
            data={borrowAndDepositUser.sort((a, b) => moment(a['day']).isAfter(moment(b['day'])) ? 1 : -1)}
            // tooltipTitle={[
            //   "number of wallet borrows",
            //   "number of wallet deposits",
            // ]}
            modelInfo="Daily # of wallets borrowing and depositing on Anchor."
            title="Daily # of Users Borrowing and Depositing"
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
