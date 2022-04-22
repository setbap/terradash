import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react"; import BarGraph from "lib/components/charts/BarGraph";
import DonutChart from "lib/components/charts/DonutChart";
import StackedAreaChart from "lib/components/charts/StackedAreaGraph";
import { StatsCard } from "lib/components/charts/StateCard";
import { USTBridgeInfo, USTMarketCap, UST_IN_ALL_BCs } from "types/type";
interface Props {
  ustBridgeValue: USTBridgeInfo;
  USTSupply: number,
  ustMarketCap: USTMarketCap,
  USTInfoInBCs: UST_IN_ALL_BCs[]
}

const UST = ({ ustBridgeValue, USTSupply, USTInfoInBCs, ustMarketCap }: Props) => {
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
            title="UST Total Supply"
            status="inc"
            stat={USTSupply}
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

          <BarGraph
            queryLink="https://app.flipsidecrypto.com/velocity/queries/cbcea6f8-a3b1-4298-906e-db63b6971e25"
            modelInfo="Volume of UST bridged out By Each Bridge over the time"
            values={ustBridgeValue.dailyBridgeValue}
            monthlyValues={ustBridgeValue.monthlyBridgeValue}
            title="UST Bridge Volume"
            dataKey="date"
            baseSpan={3}
            oyLabel="Amout of UST"
            oxLabel="name"
            labels={[
              { key: "Shuttle", color: "#09f35e" },
              { key: "Wormhole", color: "#f30e0e" },
              { key: "IBC", color: "#f3f30e" },
            ]}
          />


          <StackedAreaChart
            queryLink="https://app.flipsidecrypto.com/velocity/queries/37af1ab8-b314-4e6d-88bb-7613a83e5b14"
            modelInfo="number of new users who user ust in each blokchain"
            values={USTInfoInBCs}
            title="UST New Users by Chain"
            dataKey="DATE"
            baseSpan={3}
            oyLabel="number of users"
            oxLabel="name"
            labels={[
              { key: "TERRA new users", color: "#09f35e" },
              { key: "SOL new users", color: "#fe3" },
              { key: "ETH new users", color: "#4af" },
              { key: "POLY new users", color: "#f30e0e" },
              { key: "HAR new users", color: "#b3d" },
            ]}
          />

          <StackedAreaChart
            queryLink="https://app.flipsidecrypto.com/velocity/queries/37af1ab8-b314-4e6d-88bb-7613a83e5b14"
            modelInfo="number of transactions done with UST in each All blockchains"
            values={USTInfoInBCs}
            title="UST Transactions by Chain"
            dataKey="DATE"
            baseSpan={3}
            oyLabel="transaction count"
            oxLabel="name"
            labels={[
              { key: "TERRA TX count", color: "#09f35e" },
              { key: "SOL TX count", color: "#fe3" },
              { key: "ETH TX count", color: "#4af" },
              { key: "POLY TX count", color: "#f30e0e" },
              { key: "HAR TX count", color: "#b3d" },
            ]}
          />

          <StackedAreaChart
            queryLink="https://app.flipsidecrypto.com/velocity/queries/37af1ab8-b314-4e6d-88bb-7613a83e5b14"
            modelInfo="UST Volume by Chain"
            values={USTInfoInBCs}
            title="UST Volume by Chain"
            dataKey="DATE"
            baseSpan={3}
            oyLabel="valume of UST"
            oxLabel="name"
            labels={[
              { key: "TERRA UST Valume", color: "#09f35e" },
              { key: "SOL UST Valume", color: "#fe3" },
              { key: "ETH UST Valume", color: "#4af" },
              { key: "POLY UST Valume", color: "#f30e0e" },
              { key: "HAR UST Valume", color: "#b3d" },
            ]}
          />
          {/* <DonutChart
            queryLink="https://app.flipsidecrypto.com/velocity/queries/cbcea6f8-a3b1-4298-906e-db63b6971e25"
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
