import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";import { USTBridge } from "types/type";

interface Props {
  ustBridgeValue: USTBridge[];
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
        </SimpleGrid>
      </Box>
    </>
  );
};

export default UST;
