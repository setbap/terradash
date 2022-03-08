import { Box, chakra, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "lib/components/basic/BasicCard";
import { VoterInfo } from "types/voter_info";

const Home = ({ voterInfo }: { voterInfo: VoterInfo }) => {
  return (
    <>
      {console.log(voterInfo)}
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          What is our company doing?
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>

          <StatsCard status="inc" title={"Number Of Mir Voter"} stat={voterInfo.NUMBER_OF_MIR_VOTER} />
          <StatsCard status="inc" title={"Number Of Anchor Voter"} stat={voterInfo.NUMBER_OF_ANCHOR_VOTER} />
          <StatsCard status="inc" title={"Number Of Terra Voter"} stat={voterInfo.NUMBER_OF_TERRA_VOTER} />
          <StatsCard status="inc" title={"Number Of Unique Voter"} stat={voterInfo.NUMBER_OF_UNIQUE_VOTER} />
          <StatsCard status="inc" title={"Number Of Voter Whales"} stat={voterInfo.NUMBER_OF_VOTER_WHALES} />

        </SimpleGrid>
      </Box>
    </>
  );
};



export default Home;
