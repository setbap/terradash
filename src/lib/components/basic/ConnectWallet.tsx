import { Flex, Menu, MenuButton, HStack, VStack, Box, MenuList, useColorModeValue, MenuItem, MenuDivider, Text, useClipboard } from "@chakra-ui/react"
import { WalletStatus, ConnectType, useWallet } from "@terra-money/wallet-provider"
import { BiWalletAlt } from "react-icons/bi"
import { FiChevronDown } from "react-icons/fi"
import { MdContentCopy } from "react-icons/md"
import { VscDebugDisconnect } from "react-icons/vsc"

const ConnectWallet = () => {
    const {
        status,
        network,
        wallets,
        availableConnectTypes,
        availableInstallTypes,
        availableConnections,
        supportFeatures,
        connect,
        disconnect,
    } = useWallet();
    const { onCopy } = useClipboard(wallets[0]?.terraAddress ?? '');

    return (
        <Flex maxW={'200px'} alignItems={'center'} >
            <Menu>
                <MenuButton
                    py={2}
                    transition="all 0.3s"
                    _focus={{ boxShadow: 'none' }}>
                    <HStack>
                        <BiWalletAlt />
                        <VStack
                            display={{ base: 'none', md: 'flex' }}
                            alignItems="flex-start"
                            spacing="1px"
                            ml="0">
                            <Text fontSize="sm">
                                {status === WalletStatus.WALLET_NOT_CONNECTED && 'Wallet not connected'}
                                {status === WalletStatus.WALLET_CONNECTED && 'Wallet  connected'}
                            </Text>
                            {status === WalletStatus.WALLET_CONNECTED && <Text width={'160px'} noOfLines={1} textOverflow={'ellipsis'} fontSize="xs" color="gray.600">
                                {wallets[0].terraAddress}
                            </Text>
                            }
                        </VStack>
                        <Box display={{ base: 'none', md: 'flex' }}>
                            <FiChevronDown />
                        </Box>
                    </HStack>
                </MenuButton>
                <MenuList
                    bg={useColorModeValue('white', 'gray.900')}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}>
                    {status === WalletStatus.WALLET_CONNECTED && (<>
                        <MenuItem onClick={onCopy}>
                            <MdContentCopy />
                            <Box marginEnd={'2.5'} />
                            <Text fontSize='sm'>  Copy Address</Text>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => disconnect()}>
                            <VscDebugDisconnect />
                            <Box marginEnd={'2.5'} />
                            <Text fontSize='sm'>  Disconnect</Text>
                        </MenuItem>
                    </>
                    )}

                    {status === WalletStatus.WALLET_NOT_CONNECTED && (
                        <>
                            {availableConnectTypes.includes(ConnectType.EXTENSION) && (<MenuItem
                                onClick={() => connect(ConnectType.EXTENSION, "station")}
                            >
                                <img
                                    src={"https://assets.terra.money/icon/station-extension/icon.png"}
                                    alt={"Terra Station Wallet"}
                                    style={{ width: '1em', height: '1em' }}
                                />
                                <Box marginEnd={'2'} />
                                <Text fontSize='sm'>Terra Station Wallet</Text>
                            </MenuItem>)}
                            <MenuItem
                                onClick={() => connect(ConnectType.WALLETCONNECT, "")}
                            >
                                <img
                                    src={"https://assets.terra.money/icon/wallet-provider/walletconnect.svg"}
                                    alt={"Wallet Connect"}
                                    style={{ width: '1em', height: '1em' }}
                                />
                                <Box marginEnd={'2.5'} />
                                <Text fontSize='sm'>Wallet Connect</Text>
                            </MenuItem>
                        </>
                    )}
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default ConnectWallet;