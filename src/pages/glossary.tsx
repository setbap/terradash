import { Box, chakra, Link, useColorModeValue } from "@chakra-ui/react";
import { } from '@chakra-ui/icon'
import ReactMarkdown from "react-markdown";
import Renderer from "chakra-ui-markdown-renderer";
import { FiExternalLink } from "react-icons/fi";
const CustomMarkDownLink = (props: any) => {
    return (
        <Link href={props.href} isExternal target="_blank" rel="noopener noreferrer" display={'inline-flex'}>
            {props.children} <Box ps={'1'}><FiExternalLink /></Box>
        </Link>
    )
}
const About = () => {
    const bgCard = useColorModeValue("white", "#191919");
    return (
        <>
            <Box mx={"auto"} mt={"6"} px={{ base: 6, sm: 2, md: 8 }}>
                <Box
                    width={"100%"}
                    px="6"
                    py="2"

                    shadow="base"
                    borderRadius={"lg"}
                    backgroundColor={bgCard}
                    // pb={8}
                    mb='6'
                    aria-label="anchor project descrition"
                >
                    <chakra.h1
                        textAlign={"center"}
                        fontSize={"4xl"}
                        pb={2}
                        fontWeight={"bold"}
                    >
                        Glossary
                    </chakra.h1>
                    <ReactMarkdown components={Renderer({ a: CustomMarkDownLink })}>
                        {`

### [Terra](https://docs.terra.money/docs/learn/glossary.html#terra-core "Permalink to this headline")
Created by start-up **Terraform** Labs and its co-founders [Do Kwon](https://twitter.com/stablekwon) and [Daniel Shin](https://www.linkedin.com/in/danielshin) in 2018, the Terra blockchain underpins a **decentralized finance** (DeFi) ecosystem that creates \`algorithmic stablecoins\`.
In this section, you can get an overview of this blockchain.

### [Luna](https://docs.terra.money/docs/learn/glossary.html#luna "Permalink to this headline")

The native staking token of the Terra protocol. Luna supply expands and contracts in order to maintain the prices of  [Terra stablecoins](https://docs.terra.money/docs/learn/glossary.html#terra-stablecoins). Luna is also used as a governance token.  [Delegators](https://docs.terra.money/docs/learn/glossary.html#delegator)  can stake Luna to receive rewards.

### block
 Groups of information stored on a blockchain. Each block contains transactions that are grouped, verified, and signed by validators.
 
**fee**: Includes 3 types:
-	**Gas**: Compute fees added on to all transactions to avoid spamming. Validators set 	minimum gas prices and reject transactions that have implied gas prices below this threshold.
-	**Spread fee**: A variable fee on any transaction between Terra and Luna.
- **Tobin tax**: A fee on any transaction between Terra stablecoin denominations.


### [__Proposals__](https://docs.terra.money/docs/learn/protocol.html#proposals "Permalink to this headline")

  Proposals start as ideas within the community. A community member drafts and submits a proposal alongside an initial deposit.

  The most common proposal types include:

  - Parameter Change Proposal: To change the parameters defined in each module.
  - Community PoolSpend Proposal: To spend funds in the community pool.
  - Text Proposal : To handle other issues like large directional changes or any decision requiring manual implementation.

### [__Staking__](https://docs.terra.money/docs/learn/glossary.html#staking "Permalink to this headline")

  When a user delegates or bonds their Luna to an active validator to receive rewards. Bonded Luna adds to a validator’s stake. Validators provide their stakes as collateral to participate in the consensus process. Validators with larger stakes are chosen to participate more often. Validators receive staking rewards for their participation. A validator’s stake can be slashed if the validator misbehaves. Validators never have ownership of a delegator’s Luna, even when staking.
  For more information on staking, visit the  [concepts page](https://docs.terra.money/docs/learn/protocol.html#staking).
  
### [__Validator__](https://docs.terra.money/docs/learn/glossary.html#validator "Permalink to this headline")

  A Terra blockchain miner responsible for verifying transactions on the blockchain. Validators run programs called full nodes that allow them to participate in consensus, verify blocks, participate in governance, and receive rewards. The top 130 validators with the highest total stake can participate in consensus.

For more information on validators, visit the  [concepts page](https://docs.terra.money/docs/learn/protocol.html#validators).

### [__Weight__](https://docs.terra.money/docs/learn/glossary.html#weight "Permalink to this headline")

The measure of a  [validator’s](https://docs.terra.money/docs/learn/glossary.html#validator)  total stake. Validators with higher weights get selected more often to propose blocks. A validator’s weight is also a measure of their voting power in  [governance](https://docs.terra.money/docs/learn/glossary.html#governance).

### [__Rewards__](https://docs.terra.money/docs/learn/glossary.html#rewards) 

Revenue generated from fees given to validators and disbursed to delegators.

### [__Anchor__](https://docs.anchorprotocol.com/ "Permalink to this headline")

Anchor is a decentralized savings protocol offering low-volatile yields on Terra stablecoin deposits. The Anchor rate is powered by a diversified stream of staking rewards from major proof-of-stake blockchains, and therefore can be expected to be much more stable than money market interest rates.

> for this page I  choose Anchor project as example for Terra network projects.
                        

### BITCOIN (BTC)

A  [decentralized](https://objectcomputing.com/expertise/blockchain/glossary#decentralization "Decentralization")  blockchain that specifically transacts  [tokens](https://objectcomputing.com/expertise/blockchain/glossary#token "Token")  between accounts.

Bitcoin is the original blockchain-based  [cryptocurrency](https://objectcomputing.com/expertise/blockchain/glossary#cryptocurrency "Cryptocurrency"). Bitcoin uses  [Unspent Transaction Outputs](https://objectcomputing.com/expertise/blockchain/glossary#unspent-transaction-output "Unspent Transaction Output") (UTXOs) to store data and a  [Proof-of-Work](https://objectcomputing.com/expertise/blockchain/glossary#proof-of-work "Proof-of-Work (PoW)")  (PoW)  [consensus](https://objectcomputing.com/expertise/blockchain/glossary#consensus "Consensus")  algorithm.


### ETHEREUM

Ethereum is a  [decentralized](https://objectcomputing.com/expertise/blockchain/glossary#decentralization "Decentralization")  [Blockchain 2.0](https://objectcomputing.com/expertise/blockchain/glossary#blockchain-2-dot-0 "Blockchain 2.0")  chain. It was the first major  [smart contract](https://objectcomputing.com/expertise/blockchain/glossary#smart-contract "Smart Contract")  platform and has widespread support from Fortune 500 companies through the  [Ethereum Enterprise Alliance (EEA)](https://objectcomputing.com/expertise/blockchain/glossary#eea "Ethereum Enterprise Alliance (EEA)").

Ethereum currently uses a  [Proof-of-Work](https://objectcomputing.com/expertise/blockchain/glossary#proof-of-work "Proof-of-Work (PoW)") (PoW) [consensus](https://objectcomputing.com/expertise/blockchain/glossary#consensus "Consensus")  algorithm, but future changes to the protocol will update it to a more  [scalable](https://objectcomputing.com/expertise/blockchain/glossary#scalability "Scalability")  algorithm, most likely based on  [Proof-of-Stake](https://objectcomputing.com/expertise/blockchain/glossary#proof-of-stake "Proof-of-Stake (PoS)") (PoS).

> this page compare these two with Terra.BTC as blockchain that has most market cap and use as e-money and ethereum as blockchain that has highest market cap among programble blockchain(Smart Contract) and  second highest market cap after bitcoin.

                        `}
                    </ReactMarkdown>
                    <Box mt={'6'} display='flex'> </Box>
                </Box>
                <Box display='flex'> </Box>
            </Box>
        </>
    );
};

export default About;
