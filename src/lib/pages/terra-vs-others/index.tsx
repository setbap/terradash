import { Box, Text, chakra, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { LunaVsBtcPrice, LunaVsEthPrice } from "types/type";
import ReactMarkdown from 'react-markdown'
import Renderer from 'chakra-ui-markdown-renderer'
import MultiChartBox from "lib/components/basic/MultiLineChart";
import BarGraph from "lib/components/basic/BarGraph";

const glossary = `

#### BITCOIN (BTC)

A  [decentralized](https://objectcomputing.com/expertise/blockchain/glossary#decentralization "Decentralization")  blockchain that specifically transacts  [tokens](https://objectcomputing.com/expertise/blockchain/glossary#token "Token")  between accounts.

Bitcoin is the original blockchain-based  [cryptocurrency](https://objectcomputing.com/expertise/blockchain/glossary#cryptocurrency "Cryptocurrency"). Bitcoin uses  [Unspent Transaction Outputs](https://objectcomputing.com/expertise/blockchain/glossary#unspent-transaction-output "Unspent Transaction Output") (UTXOs) to store data and a  [Proof-of-Work](https://objectcomputing.com/expertise/blockchain/glossary#proof-of-work "Proof-of-Work (PoW)")  (PoW)  [consensus](https://objectcomputing.com/expertise/blockchain/glossary#consensus "Consensus")  algorithm.


#### ETHEREUM

Ethereum is a  [decentralized](https://objectcomputing.com/expertise/blockchain/glossary#decentralization "Decentralization")  [Blockchain 2.0](https://objectcomputing.com/expertise/blockchain/glossary#blockchain-2-dot-0 "Blockchain 2.0")  chain. It was the first major  [smart contract](https://objectcomputing.com/expertise/blockchain/glossary#smart-contract "Smart Contract")  platform and has widespread support from Fortune 500 companies through the  [Ethereum Enterprise Alliance (EEA)](https://objectcomputing.com/expertise/blockchain/glossary#eea "Ethereum Enterprise Alliance (EEA)").

Ethereum currently uses a  [Proof-of-Work](https://objectcomputing.com/expertise/blockchain/glossary#proof-of-work "Proof-of-Work (PoW)") (PoW) [consensus](https://objectcomputing.com/expertise/blockchain/glossary#consensus "Consensus")  algorithm, but future changes to the protocol will update it to a more  [scalable](https://objectcomputing.com/expertise/blockchain/glossary#scalability "Scalability")  algorithm, most likely based on  [Proof-of-Stake](https://objectcomputing.com/expertise/blockchain/glossary#proof-of-stake "Proof-of-Stake (PoS)") (PoS).

>> this page compare these two with Terra.BTC as blockchain that has most market cap and use as e-money and ethereum as blockchain that has highest market cap among programble blockchain(Smart Contract) and  second highest market cap after bitcoin.
`
interface Props {
  lunaVsETHPrice: LunaVsEthPrice[];
  lunaVsBtcPrice: LunaVsBtcPrice[]
}

const Home = ({ lunaVsETHPrice, lunaVsBtcPrice }: Props) => {
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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }} spacing={{ base: 5, lg: 8 }}>


        </SimpleGrid>
        <SimpleGrid py={'8'} columns={{ base: 1, md: 1, lg: 2, '2xl': 3 }} spacing={{ base: 2, md: 4, lg: 8 }}>
          <MultiChartBox data={lunaVsETHPrice}
            baseSpan={3}
            chartColors={['#0953fe', '#5D638A']}
            tooltipTitle={["luna price", "eth price"]}
            modelInfo="this show compare Luna Price vs ETH price.for better showing this two chart have two diffrent scale show split scale for each one. on left hand shows __ETH__ price and right hand shows __Luna__ price "
            title="Luna Price vs ETH price"
            areaDataKey={["luna", "eth"]}
            xAxisDataKey="day" />
          <BarGraph
            baseSpan={3}
            modelInfo="this show change(as percent) Luna Price vs ETH price over the time."
            values={lunaVsETHPrice}
            title=" ETH price change% vs Luna  "
            dataKey="day"
            oyLabel="change in %"
            oxLabel="day"
            labels={[
              { key: "luna change", color: "#0953fe" },
              { key: "eth change", color: "#5D638A" },
            ]}
          />
          <MultiChartBox
            baseSpan={3}
            data={lunaVsBtcPrice}
            chartColors={['#0953fe', '#f2a900']}
            tooltipTitle={["luna price", "btc price"]}
            modelInfo="this show compare Luna Price vs BTC price.for better showing this two chart have two diffrent scale show split scale for each one. on left hand shows __BTC__ price and right hand shows __Luna__ price "
            title="Terra daily new user"
            areaDataKey={["luna", "btc"]}
            xAxisDataKey="day" />
          <BarGraph
            baseSpan={3}
            modelInfo="this show change(as percent) Luna Price vs BTC price over the time."
            values={lunaVsBtcPrice}
            title=" BTC price change% vs Luna  "
            dataKey="day"
            oyLabel="change in %"
            oxLabel="day"
            labels={[
              { key: "luna change", color: "#0953fe" },
              { key: "btc change", color: "#f2a900" },
            ]}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};



export default Home;
