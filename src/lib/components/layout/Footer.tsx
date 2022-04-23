import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { ReactNode } from "react";
import { FlipSideIcon } from "../basic/FlipSideIcon";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const baseColor = useColorModeValue("gray.700", "whiteAlpha.700");
  return (
    <Box bg={useColorModeValue("white", "#191919")} color={baseColor}>
      <Container
        as={Stack}
        maxW={"100vw"}
        py={4}
        direction={"row"}
        spacing={4}
        justify={{ base: "center", md: "end" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack direction={"row"} spacing={2}>
          <Text>Powered by</Text>
          <Link style={{marginInlineStart: '0.25em'}} href={"https://flipsidecrypto.xyz/"} isExternal display={'inline-flex'}>
            Flipside Crypto <Box style={{marginTop: '-0.05em'}} ml={'1'}><FlipSideIcon fill={baseColor} /></Box>
          </Link>
          <Text style={{marginInlineStart: '0.3em'}}>&</Text>
          <Link style={{marginInlineStart: '0.25em'}} href={"http://github.com/setbap"} isExternal display={'inline-flex'}>
            SetBap <Box mt={'1'} ml={'1'}><FaGithub /></Box>
          </Link>


          {/* 
          <SocialButton label={"Flipside Website"} href={"http://flipsidecrypto.xyz/"}>

          </SocialButton> */}
          {/* <SocialButton href="http://github.com/setbap" label={"Github"}>

          </SocialButton> */}
        </Stack>
      </Container>
    </Box>
  );
}
