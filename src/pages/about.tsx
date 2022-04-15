import { Box, chakra, useColorModeValue } from "@chakra-ui/react"; import ReactMarkdown from "react-markdown";
import Renderer from "chakra-ui-markdown-renderer";

const About = () => {
  const bgCard = useColorModeValue("white", "#191919");
  return (
    <>
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 8 }}>
        <Box
          width={"100%"}
          px="6"
          py="2"
          my={"6"}
          shadow="base"
          borderRadius={"lg"}
          backgroundColor={bgCard}
          pb={8}
          aria-label="anchor project descrition"
        >
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            pb={2}
            fontWeight={"bold"}
          >
            About
          </chakra.h1>
          <ReactMarkdown components={Renderer()}>
            {`
this dashboard was created as [**FlipSideCrypto bounty**](http://flipsidecrypto.xyz/) project. this dashboard contain 50 query to flipside datawherehouse.
more info comming soon.

---
### Change Log 
 - 4/15/2022
	 - change donut chart path and put it to center
	 - fix overflow expand in mobile
	 - fix Invalid Date on safari (maybe😛)
	 - disable scale on hover in chart
   - add change time frame on chart
   - improve page component base




                        `}
          </ReactMarkdown>
        </Box>
      </Box>
    </>
  );
};

export default About;
