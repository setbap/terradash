import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react"; import BarGraph from "lib/components/charts/BarGraph";
import DonutChart from "lib/components/charts/DonutChart";
import { USTBridge, USTBridgeInfo } from "types/type";
interface Props {
  ustBridgeValue: USTBridgeInfo;
}

const UST = ({ ustBridgeValue }: Props) => {
  const bgCard = useColorModeValue("white", "#191919");
  return (
    <>
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 8 }}>
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 5, lg: 8 }}
        ></SimpleGrid>
        <SimpleGrid
          py={"6"}
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 2, md: 4, lg: 8 }}
        >
          {/* <BarGraph
            queryLink="https://app.flipsidecrypto.com/velocity/queries/cbcea6f8-a3b1-4298-906e-db63b6971e25"
            modelInfo="ust bridge value"
            values={ustBridgeValue.sort((a, b) => moment(a.DAY).isAfter(moment(b.DAY)) ? 1 : -1)}
            title="Distribution of Terra votes"
            dataKey="DAY"
            baseSpan={3}
            oyLabel="voting number"
            oxLabel="name"

            labels={[{ 'key': 'UST_AMOUNT', 'color': '#00bcd4' }]}
  />*/}
          <BarGraph
            queryLink="https://app.flipsidecrypto.com/velocity/queries/cbcea6f8-a3b1-4298-906e-db63b6971e25"
            modelInfo="shows Distribution of Terra votes"
            values={ustBridgeValue.dailyBridgeValue}
            monthlyValues={ustBridgeValue.monthlyBridgeValue}

            title="Distribution of Terra votes"
            dataKey="date"
            baseSpan={3}
            oyLabel="voting number"
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
            modelInfo="This chart shows the distribution of coins that are paid as fees in the Terra blockchain. To make sense, all volumes are considered in USD."
            title="Total Fee Paid With Each coin"
            dataKey="amount"
            nameKey="blockchain"
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default UST;
