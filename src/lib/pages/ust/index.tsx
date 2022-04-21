import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react"; import BarGraph from "lib/components/charts/BarGraph";
import DonutChart from "lib/components/charts/DonutChart";
import { StatsCard } from "lib/components/charts/StateCard";
import { USTBridge, USTBridgeInfo } from "types/type";
interface Props {
  ustBridgeValue: USTBridgeInfo;
  USTSupply: number
}

const UST = ({ ustBridgeValue, USTSupply }: Props) => {
  const bgCard = useColorModeValue("white", "#191919");
  return (
    <>
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 8 }}>
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
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
