import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react"; import { LFGBalance } from "types/type";
import MultiLineChartSeprate from "lib/components/charts/MultiLineChartSeprate";
import moment from "moment";

interface Props {
  lfgBalance: LFGBalance[];
}

const Home = ({ lfgBalance }: Props) => {
  const bgCard = useColorModeValue("white", "#191919");
  return (
    <>
      <Box overflowY={"hidden"} height={"calc(100vh - 120px)"} mx={"auto"}>
        <iframe
          height="100%"
          width="100%"
          src="https://analytics.zoho.com/open-view/2490519000000806007"
        ></iframe>
        {/* <SimpleGrid
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 5, lg: 8 }}
        ></SimpleGrid>
        <SimpleGrid
          py={"6"}
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 2, md: 4, lg: 8 }}
        >
          {/* <MultiLineChartSeprate
            data={lfgBalance.sort((first, second) => moment(first.BALANCE_DATE).isAfter(moment(second.BALANCE_DATE)) ? 1 : -1)}
            yAxisData='BALANCE_USD'
            yAxisName="SYMBOL"
            queryLink="https://app.flipsidecrypto.com/velocity/queries/958d822f-5503-4028-bb91-6fa67a2efbd7"
            yAxixDataOptions={[{ name: "USD", value: "BALANCE_USD" }, { name: "Token Count", value: "BALANCE" }]}
            baseSpan={3}
            modelInfo="this show all __LFG__ reserve token for ust in **Terra network**"
            title="LFG reserve tokens"
            xAxisDataKey="BALANCE_DATE"
          /> 
        </SimpleGrid> */}
      </Box>
    </>
  );
};

export default Home;
