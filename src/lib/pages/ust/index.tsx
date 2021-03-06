import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react"; import BarGraph from "lib/components/charts/BarGraph";
import ChartBox from "lib/components/charts/LineChart";
import StackedAreaChart from "lib/components/charts/StackedAreaGraph";
import { StatsCard } from "lib/components/charts/StateCard";
import { StateCardRemoteData } from "lib/components/charts/StateCardRemoteData";
import { NextSeo } from "next-seo";
import { USTBridgeInfo, USTDailySupply, USTMarketCap } from "types/type";
interface Props {
  ustBridgeValue: USTBridgeInfo;
  USTSupply: number,
  ustMarketCap: USTMarketCap,
  uSTDailySupply: USTDailySupply[];
  USTInfoInBCsNewUser: any,
  USTInfoInBCsUstVolume: any,
  USTInfoInBCsTxCount: any,
}

const UST = ({ ustBridgeValue, USTSupply, uSTDailySupply, USTInfoInBCsNewUser, USTInfoInBCsTxCount, USTInfoInBCsUstVolume, ustMarketCap }: Props) => {
  const bgCard = useColorModeValue("white", "#191919");
  const uSTSupply = USTSupply;
  const wUST = ustMarketCap.wUST
  const wormholUST = ustMarketCap.wormholUST
  const BNBUST = ustMarketCap.BNBUST
  const AvaxUST = ustMarketCap.AvaxUST
  const ThorChainUST = ustMarketCap.ThorChainUST
  const ogUrl = `https://ogterradash.vercel.app/api/ust?USTTotalSupply=${uSTSupply}&wUST=${wUST}&wormholUST=${wormholUST}&BNBUST=${BNBUST}&AvaxUST=${AvaxUST}&ThorChainUST=${ThorChainUST}`

  return (
    <>
      <NextSeo
        title='TerraDash | Business Intelligence Dashboard for Terra Network'
        description='Track the latest trends on UST growth and adoption'
        openGraph={{
          url: 'https://terradash.vercel.app/ust',
          title: 'TerraDash | Business Intelligence Dashboard for Terra Network',
          description: 'Track the latest trends on UST growth and adoption',
          images: [
            {
              url: 'https://ogterradash.vercel.app/ogterradash.png',
              width: 1200,
              height: 630,
              alt: 'UST Information',
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
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 8 }}>
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 2, "2xl": 3 }}
          spacing={{ base: 5, lg: 8 }}
        >
          <StateCardRemoteData
            link="https://lcd.terra.dev/cosmos/bank/v1beta1/supply/uusd"
            url="https://lcd.terra.dev/cosmos/bank/v1beta1/supply/uusd"
            title="UST Total Supply"
            status="inc"
            getStat={(data) => Number(data.amount.amount.slice(0, -6))}
            forceDecimal={true}

          />
          <StatsCard
            title="Ethereum wUST Market Cap"
            comment="Powered by [Ethereum (ETH) Blockchain Explorer (etherscan.io)](https://etherscan.io/) APIs"
            status="inc"
            stat={ustMarketCap.wUST}
          />
          <StatsCard
            title="Wormhole UST Market Cap"
            comment="Powered by [Ethereum (ETH) Blockchain Explorer (etherscan.io)](https://etherscan.io/) APIs"
            status="inc"
            stat={ustMarketCap.wormholUST}
          />

          <StatsCard
            title="BNB UST Market Cap"
            comment="Powered by [Binance (BNB) Blockchain Explorer (bscscan.com)](https://bscscan.com/) APIs"
            status="inc"
            stat={ustMarketCap.BNBUST}
          />

          <StatsCard
            title="Avalanche UST Market Cap"
            comment="Powered by [SnowTrace.io: Avalanche C-Chain Blockchain Explorer](https://snowtrace.io/) APIs"
            status="inc"
            stat={ustMarketCap.AvaxUST}
          />
          <StatsCard
            link="https://app.flipsidecrypto.com/velocity/queries/9c3ae373-f24e-4379-8f81-ca2151e0fc9b"
            title="THORChain UST Market Cap"
            status="inc"
            stat={ustMarketCap.ThorChainUST}
          />
        </SimpleGrid>
        <SimpleGrid
          py={"6"}
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 2, md: 4, lg: 8 }}
        >

          <ChartBox
            queryLink="https://flipside.leslug.com/terra/ust/circulating"
            data={uSTDailySupply}
            baseSpan={3}
            tooltipTitle="circulation supply UST"
            modelInfo={`Circulating supply is the total LUNA that normal users have (not dex, cex, smart contract, etc)`}
            title="UST Circulating Supply"
            areaDataKey="UST Supply"
            xAxisDataKey="day"

          />


          <BarGraph
            queryLink="https://app.flipsidecrypto.com/velocity/queries/4eab2b30-aa8a-4830-8b48-14ca336b0a5b"
            modelInfo="Volume of UST bridged out By Each Bridge over the time"
            values={ustBridgeValue.dailyBridgeValue}
            monthlyValues={ustBridgeValue.monthlyBridgeValue}
            title="UST Outflow From Terra"
            dataKey="date"
            baseSpan={3}
            oyLabel="Amount of UST"
            oxLabel="name"
            labels={[
              { key: "Shuttle", color: "#5293f7" },
              { key: "Wormhole", color: "#f4801a" },
              { key: "IBC", color: "#5a3ea4" },
            ]}
          />
          <StackedAreaChart
            queryLink="https://app.flipsidecrypto.com/velocity/queries/37af1ab8-b314-4e6d-88bb-7613a83e5b14"
            modelInfo="number of new users who user ust in each blokchain"
            values={USTInfoInBCsNewUser}
            title="UST New Users by Chain"
            dataKey="DATE"
            baseSpan={3}
            oyLabel="Number of New Users"
            oxLabel="name"
            labels={[
              { key: "Terra", color: "#fad85d" },
              { key: "Solana", color: "#7d80d9" },
              { key: "Ethereum", color: "#8b93b3" },
              { key: "Polygon", color: "#8347e4" },
              { key: "Harmony", color: "#0bb7e3" },
            ]}
          />

          <StackedAreaChart
            queryLink="https://app.flipsidecrypto.com/velocity/queries/37af1ab8-b314-4e6d-88bb-7613a83e5b14"
            modelInfo="number of transactions done with UST in each All blockchains"
            values={USTInfoInBCsTxCount}
            title="UST Transactions by Chain"
            dataKey="DATE"
            baseSpan={3}
            oyLabel="Transaction Count"
            oxLabel="name"
            labels={[
              { key: "Terra", color: "#fad85d" },
              { key: "Solana", color: "#7d80d9" },
              { key: "Ethereum", color: "#8b93b3" },
              { key: "Polygon", color: "#8347e4" },
              { key: "Harmony", color: "#0bb7e3" },
            ]}
          />

          <StackedAreaChart
            queryLink="https://app.flipsidecrypto.com/velocity/queries/37af1ab8-b314-4e6d-88bb-7613a83e5b14"
            modelInfo="UST Volume by Chain"
            values={USTInfoInBCsUstVolume}
            title="UST Volume by Chain"
            dataKey="DATE"
            baseSpan={3}
            oyLabel="Volume of UST"
            oxLabel="name"
            labels={[
              { key: "Terra", color: "#fad85d" },
              { key: "Solana", color: "#7d80d9" },
              { key: "Ethereum", color: "#8b93b3" },
              { key: "Polygon", color: "#8347e4" },
              { key: "Harmony", color: "#0bb7e3" },
            ]}
          />
          {/* <DonutChart
            queryLink="https://app.flipsidecrypto.com/velocity/queries/4eab2b30-aa8a-4830-8b48-14ca336b0a5b"
            data={ustBridgeValue.blockchainsWithValue}
            tooltipTitle=" Total Fee Paid With Each coin "
            modelInfo="This chart shows the distribution Volume of UST bridged out to Each Blockchain."
            title="UST Volume Bridged Out to Each Blockchain"
            dataKey="amount"
            nameKey="blockchain"
          /> */}

        </SimpleGrid>
      </Box>
    </>
  );
};

export default UST;
