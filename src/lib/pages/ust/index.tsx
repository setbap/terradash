import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react"; import BarGraph from "lib/components/charts/BarGraph";
import DonutChart from "lib/components/charts/DonutChart";
import StackedAreaChart from "lib/components/charts/StackedAreaGraph";
import { StatsCard } from "lib/components/charts/StateCard";
import { USTBridgeInfo, UST_IN_ALL_BCs } from "types/type";
interface Props {
  ustBridgeValue: USTBridgeInfo;
  USTSupply: number,
  USTInfoInBCs: UST_IN_ALL_BCs[]
}

const UST = ({ ustBridgeValue, USTSupply, USTInfoInBCs }: Props) => {
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
            title="Total Supply of UST"
            status="inc"
            stat={USTSupply}
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
            title="Volume of UST bridged out By Each Bridge"
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
            queryLink="https://app.flipsidecrypto.com/velocity/queries/cbcea6f8-a3b1-4298-906e-db63b6971e25"
            modelInfo="Volume of UST bridged out By Each Bridge over the time"
            values={USTInfoInBCs}

            title="Volume of UST bridged out By Each Bridge"
            dataKey="DATE"
            baseSpan={3}
            oyLabel="number of users"
            oxLabel="name"
            labels={[
              { key: "TERRA new users", color: "#f30e0e" },
              { key: "SOL new users", color: "#fe3" },
              { key: "ETH new users", color: "#4af" },
              { key: "POLY new users", color: "#09f35e" },
              { key: "HAR new users", color: "#b3d" },
            ]}
          />
          <DonutChart
            queryLink="https://app.flipsidecrypto.com/velocity/queries/cbcea6f8-a3b1-4298-906e-db63b6971e25"
            data={ustBridgeValue.blockchainsWithValue}
            tooltipTitle=" Total Fee Paid With Each coin "
            modelInfo="This chart shows the distribution Volume of UST bridged out to Each Blockchain."
            title="Volume of UST bridged out to Each Blockchain"
            dataKey="amount"
            nameKey="blockchain"
          />

        </SimpleGrid>
      </Box>
    </>
  );
};

export default UST;
