import { Box, chakra, useColorModeValue } from "@chakra-ui/react"; import ReactMarkdown from "react-markdown";
import Renderer from "chakra-ui-markdown-renderer";
import MDRenderer from "lib/components/basic/MDRenderer";

const About = () => {
  const bgCard = useColorModeValue("white", "#191919");
  return (
    <>
      <Box mx={"auto"} py="6" px={{ base: 6, sm: 2, md: 8 }}>
        <Box
          width={"100%"}
          px="6"
          py="2"
          shadow="base"
          borderRadius={"lg"}
          backgroundColor={bgCard}
          pb={8}
          aria-label="about this dashboard"
        >
          {/* <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            pb={2}
            fontWeight={"bold"}
          >
            About
          </chakra.h1> */}
          <MDRenderer>
            {`

## About

This dashboard is made with love by members of the Terra community, in partnership with Flipside Crypto. We hope it serves as a valuable window into high-level metrics that display the vitality and growth of the Terra ecosystem.

  

The initial version focuses on elements that are critical to the core Terra ecosystem, e.g. UST adoption, transaction & user growth. Subsequent builds will incorporate additional project-specific metrics and important developments within the Terra community.

  

### Credits  

-   [Elsina](https://twitter.com/elsinacrypto)
    
-   [JP12](https://twitter.com/jp12__)
    
-   [Brian_](https://twitter.com/brian_terra_)
    
-   [Pinehearst](https://twitter.com/pinehearst_)
    
-   [Forg](https://twitter.com/forgash_)
    
-   [Kida](https://twitter.com/darksoulsfanlol)
    
-   [LTirrell](https://twitter.com/ltirrell_)
    
-   [CryptoIcicle](https://twitter.com/cryptoicicle)
    
-   [Sam](https://twitter.com/sem1d5)
    
-   [TZM  
    ](https://twitter.com/TZMCrypto)
    

  

### Methodology

-   Data is drawn from a combination of Flipside Crypto’s Terra tables and existing APIs. The LFG page is drawn from https://flipsidecrypto.xyz/terra/lfg
    
-   For charts where data comes from Flipside’s data, a link to the underlying query is provided in the Settings gear wheel at the top right of each visualization. Version 1.5 will provide enhanced references for data drawn from external sources via API
    
-   By default, charts are set to refresh hourly
    
-   Metrics were selected by Flipside community members with demonstrated experience in Terra analytics.
    

### Roadmap (Version 1.5)

-   Revise the Fees Paid Over Time chart in Overview to be denominated in USD
    
-   Expand UST section to show cross-chain flows of UST over time
    
-   Incorporate a DeFi tab drawing on elements from a [partner submission](https://datastudio.google.com/u/0/reporting/e568ad77-be7f-47be-8c6d-946c5f08f35b/page/p_vwnqjnbysc?s=vOcvwiJuiS0)
    
-   Implement a Feedback widget for people to report bugs, missing data, or suggestions
    
-   Expand Governance tab to provide voting power for validators beyond the top 10
    
-   Add Glossary section to define terms & provide additional explanation on the detailed methodology for each tab
    
-   Add tooltips to provide a brief explanation of each metric
    
-   Incorporate feedback from Anchor Protocol regarding collateral growth on Anchor tab
    
-   Add tabs to provide high-level metrics for other key protocols
    
-   Provide links to other key analytics assets in the Terra ecosystem
    

  

Do you have metrics you would like to see on this dashboard? Reach out to GJ via [Twitter](https://twitter.com/GJFlannery19) or Telegram (@Sunslinger) and we’ll do our best to incorporate them into our roadmap!

  

__Last Updated: Apr 22, 2022__
`}
          </MDRenderer>
        </Box>
      </Box>
    </>
  );
};

export default About;
