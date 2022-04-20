import React, { ReactNode } from "react";import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FiHome, FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import ThemeToggle from "./ThemeToggle";
import ConnectWallet from "../basic/ConnectWallet";
import { useRouter } from "next/router";
import { SiBuzzfeed } from "react-icons/si";
import { RiGovernmentLine } from "react-icons/ri";
import { VscArrowSwap } from "react-icons/vsc";
import { FaBitcoin } from "react-icons/fa";
import { CgAnchor } from "react-icons/cg";
import { AiFillDollarCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { GiBlackBook } from "react-icons/gi";
import MotionBox from "../motion/Box";
import LFGICON from "../basic/LFG_ICON";
interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Overview", path: "/", icon: FiHome },
  { name: "LFG", path: "/lfg", icon: LFGICON },
  { name: "UST", path: "/ust", icon: AiFillDollarCircle },
  { name: "Governance ", path: "/governance", icon: RiGovernmentLine },
  { name: "Anchor", path: "/anchor", icon: CgAnchor },
  { name: "Glossary", path: "/glossary", icon: GiBlackBook },

  { name: "Tx and Fee", path: "/tx-and-fee", icon: SiBuzzfeed },
  { name: "Native swap", path: "/native-swap", icon: VscArrowSwap },
  { name: "Terra VS Others", path: "/terra-vs-others", icon: FaBitcoin },
  { name: "About", path: "/about", icon: AiOutlineInfoCircle },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const variants = {
    hidden: { opacity: 0, x: -50, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -50 },
  };
  return (
    <MotionBox
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: "linear" }} // Set the transition to linear
      minH="calc( 100vh - 56px )"
      bg={useColorModeValue(
        " linear-gradient(to top, #e2ebf0 0% , #cfd9df  100%)",
        "linear-gradient(to top, #090909,#000000)"
      )}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        closeOnOverlayClick
        closeOnEsc
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 64 }}>{children}</Box>
    </MotionBox>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const router = useRouter();
  return (
    <Box
      overflowX={"hidden"}
      transition="0.7s ease"
      bg={useColorModeValue("#0046a8", "#1c1c1c")}
      color={"white"}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 64 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="semibold">
          <NextLink href={"/"} passHref>
            <>
              <Box
                display={"inline"}
                fontFamily="sans-serif"
                fontSize="2xl"
                ps={"2"}
                fontWeight={"extrabold"}
              >
                Terra{" "}
              </Box>
              dash
            </>
          </NextLink>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          isActive={router.pathname === link.path}
          path={link.path}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  path: string;
  children: ReactText;
  isActive: boolean;
}
const NavItem = ({ icon, isActive, path, children, ...rest }: NavItemProps) => {
  const activeBgColor = useColorModeValue("gray.200", "#232323");
  return (
    <NextLink href={path} passHref>
      <Link style={{ textDecoration: "none" }}>
        <Flex
          align="center"
          ps="4"
          py={"4"}
          mx="3"
          mb={"1"}
          transition="all 0.7s ease"
          borderRadius="lg"
          role="group"
          fontSize="md"
          fontWeight="medium"
          cursor="pointer"
          border={"1.5px solid transparent"}
          shadow={isActive ? "inner" : "none"}
          borderColor={isActive ? "white" : "transparent"}
          _hover={{
            borderColor: "whiteAlpha.500",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="1rem"
              fontWeight={"bold"}
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 0 }}
      px={{ base: 4, md: 4 }}
      height="16"
      alignItems="center"
      bg={useColorModeValue("white", "#191919")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <Box marginEnd={"4"}>
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
      </Box>
      <Text
        display={{ base: "flex", md: "none" }}
        alignItems="baseline"
        fontSize="xl"
        fontWeight="semibold"
      >
        <NextLink href={"/"} passHref>
          <>
            <Box
              display={"inline"}
              fontFamily="sans-serif"
              fontSize="2xl"
              fontWeight={"extrabold"}
            >
              Terra{" "}
            </Box>
            {""} dash
          </>
        </NextLink>
      </Text>
      <Box marginLeft="auto" />
      <HStack gap={"2"} spacing={{ base: "0", md: "6" }}>
        {/* <ConnectWallet />
        <ThemeToggle /> */}
      </HStack>
    </Flex>
  );
};
