import React, { ReactNode } from 'react';
import {
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
} from '@chakra-ui/react';
import NextLink from 'next/link'
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import ThemeToggle from './ThemeToggle';
import ConnectWallet from '../basic/ConnectWallet';
import { useRouter } from 'next/router';

interface LinkItemProps {
    name: string;
    icon: IconType;
    path: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Overview', path: '/', icon: FiHome },
    { name: 'Tx and Fee', path: '/tx-and-fee', icon: FiTrendingUp },
    { name: 'Governance ', path: '/validator-and-stacke', icon: FiCompass },
    { name: 'Dapp and NFT', path: '/dapps-and-nft', icon: FiSettings },
    { name: 'Terra VS Others', path: '/terra-vs-others', icon: FiSettings },
    { name: 'Anchor', path: '/anchor', icon: FiStar },
];

export default function SidebarWithHeader({
    children,
}: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="calc( 100vh - 14px )" bg={useColorModeValue('gray.200', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>

            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const router = useRouter()
    return (
        <Box
            transition="0.7s ease"
            bg={useColorModeValue('white', '#191919')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    <NextLink href={'/'} passHref>
                        Terradash
                    </NextLink>
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem isActive={router.pathname === link.path} path={link.path} key={link.name} icon={link.icon}>
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
    isActive: boolean
}
const NavItem = ({ icon, isActive, path, children, ...rest }: NavItemProps) => {
    const activeBgColor = useColorModeValue('gray.200', '#232323')
    return (
        <NextLink href={path} passHref>
            <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    bg={isActive ? activeBgColor : 'transparent'}
                    border={isActive ? '1px' : 'none'}
                    _hover={{
                        bg: 'cyan.400',
                        color: 'white',
                    }}
                    {...rest}>
                    {icon && (
                        <Icon
                            mr="4"
                            fontSize="16"
                            _groupHover={{
                                color: 'white',
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
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="16"
            alignItems="center"
            bg={useColorModeValue('white', '#191919')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <Box marginEnd={'4'}>
                <IconButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onOpen}
                    variant="outline"
                    aria-label="open menu"
                    icon={<FiMenu />}
                />
            </Box>
            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Terradash
            </Text>
            <Box marginLeft="auto" />
            <HStack gap={'2'} spacing={{ base: '0', md: '6' }}>
                <ConnectWallet />
                <ThemeToggle />
            </HStack>


        </Flex>
    );
};