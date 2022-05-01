import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { StateCardRemoteData } from "lib/components/charts/StateCardRemoteData";
import { MirrorTokenPrice } from "types/type";
import ChartBox from "lib/components/charts/LineChart";
import { StatsCard } from "lib/components/charts/StateCard";
import BarGraph from "lib/components/charts/BarGraph";

const COLOR_ARRAY = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];



interface Props {
  priceOfMirInLast30Days: MirrorTokenPrice[]
  mirTokenCirculatingSupply: number;
  mirTokenTotalSupply: number;
  mirrorTVLByStocksVolume: any;
  mirrorSwapValuem: any
}
const Mirror = ({
  priceOfMirInLast30Days,
  mirTokenCirculatingSupply,
  mirTokenTotalSupply,
  mirrorTVLByStocksVolume,
  mirrorSwapValuem
}: Props) => {

  // const ogUrl = `https://ogterradash.vercel.app/api/anchor?totalDeposits=${totalDeposits}&totalBorrowed=${totalBorrowed}&currentAPY=${currentAPY}&yieldReserve=${yieldReserve}`
  // const ogUrl = `localhost:3001/api/anchor?totalDeposits=${totalDeposits}&totalBorrowed=${totalBorrowed}&currentAPY=${currentAPY}&yieldReserve=${yieldReserve}`

  return (
    <>
      <NextSeo
        title="TerraDash"
        description="Track the latest stats and trends on the economics of Mirror Finance"
        openGraph={{
          url: 'https://terradash.vercel.app/mirror',
          title: 'TerraDash | Business Intelligence Dashboard for Terra Network',
          description: 'Track the latest stats and trends on the economics of Mirror Finance',
          images: [
            {
              url: 'https://ogterradash.vercel.app/ogterradash.png',
              width: 1200,
              height: 630,
              alt: 'Mirror Finance Information',
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
            url="https://api.extraterrestrial.money/v1/api/prices?symbol=MIR"
            link="https://terrasco.pe/"
            status="inc"
            title={"Current MIR Price (USD)"}
            getStat={(data) => data.prices.MIR.price}
          />
          <StatsCard
            title={"MIR Circulating Supply"}
            stat={mirTokenCirculatingSupply}
            link="https://fcd.terra.dev/v1/circulatingsupply/mir"
            status="inc"
          />
          <StatsCard
            title={"MIR Total Supply"}
            stat={mirTokenTotalSupply}
            link="https://fcd.terra.dev/v1/totalsupply/mir"
            status="inc"
          />

        </SimpleGrid>
        <SimpleGrid
          py={"6"}
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 2, md: 4, lg: 6 }}
        >
          <BarGraph
            queryLink="https://app.flipsidecrypto.com/velocity/queries/4eab2b30-aa8a-4830-8b48-14ca336b0a5b"
            modelInfo="Volume of UST bridged out By Each Bridge over the time"
            values={mirrorSwapValuem.dailySwapValume}
            monthlyValues={mirrorSwapValuem.monthlySwapValume}
            title="Swap Volume in Mirror Finance"
            dataKey="date"
            baseSpan={3}
            oyLabel="Amount (USD)"
            oxLabel="name"
            labels={(mirrorSwapValuem.tokenNames as string[]).filter(name => name !== null).map(
              (name, index) => ({
                key: name,
                color: COLOR_ARRAY[index % COLOR_ARRAY.length],
              })
            )}
          />

          <BarGraph
            queryLink="https://app.flipsidecrypto.com/velocity/queries/4eab2b30-aa8a-4830-8b48-14ca336b0a5b"
            modelInfo="Volume of UST bridged out By Each Bridge over the time"
            values={mirrorTVLByStocksVolume.dailyTVLUSD}
            title="Swap Volume in Mirror Finance"
            dataKey="date"
            baseSpan={3}
            oyLabel="Amount (USD)"
            oxLabel="name"
            labels={(mirrorTVLByStocksVolume.tokenNames as string[]).filter(name => name !== null).map(
              (name, index) => ({
                key: name,
                color: COLOR_ARRAY[index % COLOR_ARRAY.length],
              })
            )}
          />
          <ChartBox data={priceOfMirInLast30Days}
            queryLink="https://api.coingecko.com/api/v3/coins/mirror-protocol/market_chart?vs_currency=usd&days=366&interval=daily"
            tooltipTitle="Terra Transactions"
            modelInfo="Terra transactions over time."
            title="Price MIR (USD)"
            baseSpan={2}
            areaDataKey="Mir Price"
            xAxisDataKey="day" />

        </SimpleGrid>
      </Box>
    </>
  );
};

export default Mirror;
