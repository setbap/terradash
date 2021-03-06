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
import { NextSeo } from "next-seo";
import { StateCardRemoteData } from "lib/components/charts/StateCardRemoteData";

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
  const totalDeposits = (+anchorBalances.borrowed_terra / 1000000) + (+anchorBalances.liquid_terra / 1000000)
  const totalBorrowed = (+anchorBalances.borrowed_terra / 1000000)
  const currentAPY = +anchorBalances.current_apy * 100
  const yieldReserve = currentYieldReserve.BALANCE
  const ogUrl = `https://ogterradash.vercel.app/api/anchor?totalDeposits=${totalDeposits}&totalBorrowed=${totalBorrowed}&currentAPY=${currentAPY}&yieldReserve=${yieldReserve}`
  // const ogUrl = `localhost:3001/api/anchor?totalDeposits=${totalDeposits}&totalBorrowed=${totalBorrowed}&currentAPY=${currentAPY}&yieldReserve=${yieldReserve}`

  return (
    <>
      <NextSeo
        title="TerraDash"
        description="Track the latest stats and trends on the economics of Anchor"
        openGraph={{
          url: 'https://terradash.vercel.app/anchor',
          title: 'TerraDash | Business Intelligence Dashboard for Terra Network',
          description: 'Track the latest stats and trends on the economics of Anchor',
          images: [
            {
              url: 'https://ogterradash.vercel.app/ogterradash.png',
              width: 1200,
              height: 630,
              alt: 'Anchor Information',
              type: 'image/png',
            },
          ],
          site_name: 'TerraDash',
        }}
        twitter={{
          handle: "@flipsidecrypto",
          cardType: "summary_large_image",
        }}
      />

      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 6 }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2, "2xl": 3 }}
          spacing={{ base: 5, lg: 6 }}
          pt='6'
        >
          <StateCardRemoteData
            url="https://api.extraterrestrial.money/v1/api/prices?symbol=ANC"
            link="https://terrasco.pe/"
            status="inc"
            title={"Current ANC Price (USD)"}
            getStat={(data) => data.prices.ANC.price}
          />
          <StatsCard
            link="https://eth-api.anchorprotocol.com/api/v1/stablecoin_info/uusd"
            status="inc"
            title={"Total Deposits (UST)"}
            stat={(+anchorBalances.borrowed_terra / 1000000) + (+anchorBalances.liquid_terra / 1000000)}
          />

          <StatsCard
            status="custom"
            title={"Total Borrowed (UST)"}
            link="https://eth-api.anchorprotocol.com/api/v1/stablecoin_info/uusd"
            stat={(+anchorBalances.borrowed_terra / 1000000)}
          />

          <StatsCard
            status="inc"
            title={"Current APY (%)"}
            link="https://eth-api.anchorprotocol.com/api/v1/stablecoin_info/uusd"
            stat={+anchorBalances.current_apy * 100}
          />

          <StatsCard
            link="https://app.flipsidecrypto.com/velocity/queries/9acc8040-4d62-451b-8029-d3e381ee3ac8"
            status="inc"
            title={"Yield Reserve (UST)"}
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
            areaDataKey="Collateral TVL (USD)"
            xAxisDataKey="DATE"
            baseSpan={3}
            showMonthly={false}
            additionalDumpTextToAddKeyToKeyBeUnique="collateraltVL"
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
            additionalDumpTextToAddKeyToKeyBeUnique="usersearn"
            modelInfo="Daily Active Users, Earn"
            tooltipTitle=""
            title="Daily Active Users on Anchor Earn"
            areaDataKey="Unique Users Depositing"
            xAxisDataKey="DATE"
          />

          <ChartBox
            queryLink="https://app.flipsidecrypto.com/velocity/queries/333c9bdc-c60c-4697-8008-0e6140f0f5e1"
            baseSpan={3}
            additionalDumpTextToAddKeyToKeyBeUnique="usersborrow"
            showMonthly={false}
            data={anchorBorrowUsers}
            modelInfo="Daily Active Users on Anchor Borrow"
            tooltipTitle=""
            title="Daily Active Users on Anchor Borrow"
            areaDataKey="Unique Users Borrowing"
            xAxisDataKey="DATE"
            customColor="#ec5f7e"
          />

        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
