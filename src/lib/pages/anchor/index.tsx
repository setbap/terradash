import {
  Box,
  chakra,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { StatsCard } from "lib/components/charts/StateCard";
import {
  AnchorBorrowAndDeposit,
  AnchorUserBorrowAndDeposit,
  SumAnchorBorrows,
  SumAnchorDeposite,
} from "types/type";
import ChartBox from "lib/components/charts/LineChart";
import MultiChartBox from "lib/components/charts/MultiLineChart";
import ReactMarkdown from 'react-markdown'
import Renderer from 'chakra-ui-markdown-renderer'
import moment from "moment";
const glossary = `
### [__Anchor__](https://docs.anchorprotocol.com/ "Permalink to this headline")

Anchor is a decentralized savings protocol offering low-volatile yields on Terra stablecoin deposits. The Anchor rate is powered by a diversified stream of staking rewards from major proof-of-stake blockchains, and therefore can be expected to be much more stable than money market interest rates.

> for this page I  choose Anchor project as example for Terra network projects.
`
interface Props {
  totalUserBorrowDeposit: AnchorUserBorrowAndDeposit;
  sumAnchorDeposite: SumAnchorDeposite;
  sumAnchorBorrow: SumAnchorBorrows;
  borrowAndDeposit: AnchorBorrowAndDeposit[];
  borrowAndDepositUser: AnchorUserBorrowAndDeposit[];
}
const Home = ({
  sumAnchorDeposite,
  sumAnchorBorrow,
  borrowAndDeposit,
  totalUserBorrowDeposit,
  borrowAndDepositUser,
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
            title={"Total UST Deposited [overall]"}
            stat={sumAnchorDeposite.ALL_DEPOSIT_AMOUNT_USD}
          />

          <StatsCard
            status="inc"
            title={"Total UST borrowed [past 7 days]"}
            stat={sumAnchorBorrow.PAST_7_SUM_BORROWS_USD}
          />
          <StatsCard
            status="inc"
            title={"Total UST borrowed [past 30 days]"}
            stat={sumAnchorBorrow.PAST_30_SUM_BORROWS_USD}
          />
          <StatsCard
            status="inc"
            title={"Total UST borrowed [overall]"}
            stat={sumAnchorBorrow.ALL_SUM_BORROWS_USD}
          />

          <StatsCard
            status="dec"
            title={"Total difference Borrow and Deposit(USD) "}
            stat={
              borrowAndDeposit.length
                ? borrowAndDeposit[borrowAndDeposit.length - 1]?.[
                "sum diffrent borrows and deposits"
                ]
                : 0
            }
          />

          <StatsCard
            status="inc"
            title={"Number of unique users that borrowed"}
            stat={totalUserBorrowDeposit["unique user borrows"]}
          />
          <StatsCard
            status="inc"
            title={"Number of unique users that deposited"}
            stat={totalUserBorrowDeposit["unique user deposits"]}
          />
        </SimpleGrid>
        <SimpleGrid
          py={"8"}
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 2, md: 4, lg: 8 }}
        >
          <ChartBox
            data={borrowAndDeposit}
            tooltipTitle="Daily Anchor Deposit(USD)"
            modelInfo="This chart shows how much deposit to anchor in USD each day in the Terra blockchain. "
            title="Anchor Deposit(USD)"
            areaDataKey="daily deposits"
            xAxisDataKey="DAY"
          />

          <ChartBox
            data={borrowAndDeposit}
            tooltipTitle="Daily Anchor Borrows(USD)"
            modelInfo="This chart shows how much borrow from anchor in USD each day in the Terra blockchain."
            title="Anchor Borrow(USD)"
            areaDataKey="daily borrows"
            xAxisDataKey="DAY"
          />

          <ChartBox
            data={borrowAndDeposit}
            tooltipTitle={"difference between borrow and deposit (USD)"}
            modelInfo="This chart shows the difference between depositing and borrowing in USD on anchor per day. zero line means deposit and borrow are equal. below zero means deposit is more than borrow and above zero means borrow is more than deposit."
            title="difference between borrow and deposit (USD)"
            areaDataKey={"diffrent borrows and deposits"}
            xAxisDataKey="DAY"
          />

          <ChartBox
            data={borrowAndDeposit}
            tooltipTitle={"cumulative difference between borrow and deposit (USD)"}
            modelInfo="This chart shows cumulative differences between borrow and deposit on anchor. If the chart is a constant line, this is means deposit and borrow are equal. If it is ascending, this is means borrow is more than deposit and If it is descending means deposit is more than borrow."
            title="cumulative difference between borrow and deposit (USD)"
            areaDataKey={"sum diffrent borrows and deposits"}
            xAxisDataKey="DAY"
          />

          <MultiChartBox
            data={borrowAndDepositUser.sort((a, b) => moment(a['day']).isAfter(moment(b['day'])) ? 1 : -1)}
            // tooltipTitle={[
            //   "number of wallet borrows",
            //   "number of wallet deposits",
            // ]}
            modelInfo="this chart shows how many user borrow from anchor and deposit to it per day."
            title="The number of wallets they borrowed/deposited"
            areaDataKey={[
              "number of wallet borrows",
              "number of wallet deposits",
            ]}
            xAxisDataKey="day"
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
