import { Box, Text, chakra, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { LFGBalance } from "types/type";
import ReactMarkdown from 'react-markdown'
import Renderer from 'chakra-ui-markdown-renderer'
import MultiChartBox from "lib/components/charts/MultiLineChart";
import MultiLineChartSeprate from "lib/components/charts/MultiLineChartSeprate";
import moment from "moment";


const glossary = `

#### LFG
this is lfg chart
`
interface Props {
  lfgBalance: LFGBalance[];
}

const Home = ({ lfgBalance }: Props) => {
  const bgCard = useColorModeValue('white', '#191919');
  return (
    <>
      <Box mx={'auto'} px={{ base: 6, sm: 2, md: 8 }}>
        <Box width={'100%'} px='6' py='2' my={'6'} shadow='base' borderRadius={'lg'} backgroundColor={bgCard} pb={8} aria-label="anchor project descrition">
          <chakra.h1
            textAlign={'center'}
            fontSize={'4xl'}
            pb={2}
            fontWeight={'bold'}>
            Glossary
          </chakra.h1>

          <ReactMarkdown components={Renderer()}>
            {glossary}
          </ReactMarkdown>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 5, lg: 8 }}>


        </SimpleGrid>
        <SimpleGrid py={'8'} columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 2, md: 4, lg: 8 }}>
          <MultiLineChartSeprate
            data={lfgBalance.sort((first, second) => moment(first.BALANCE_DATE).isAfter(moment(second.BALANCE_DATE)) ? 1 : -1)}
            yAxisData='BALANCE_USD'
            yAxisName="SYMBOL"
            yAxixDataOptions={[{ name: "USD", value: "BALANCE_USD" }, { name: "Token Count", value: "BALANCE" }]}
            baseSpan={3}
            modelInfo="this show all __LFG__ reserve token for ust in **Terra network**"
            title="LFG reserve tokens"
            xAxisDataKey="BALANCE_DATE"
          />

        </SimpleGrid>
      </Box>
    </>
  );
};



export default Home;
