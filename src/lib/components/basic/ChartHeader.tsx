import { Box, IconButton, chakra, Menu, MenuButton, MenuList, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, ModalOverlay, useDisclosure, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { useState } from 'react'
import { AiOutlineInfoCircle, AiOutlineExpand } from 'react-icons/ai'
import ReactMarkdown from 'react-markdown'


export default function ChartHeader({ title, chartMenu, modalInfo }: { modalInfo: string, title: string, chartMenu: any }) {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.700'
            backdropFilter='blur(10px) hue-rotate(20deg)'
        />
    )
    const [overlay, setOverlay] = useState(<OverlayOne />)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box width={'100%'} display={'flex'} alignItems='center' justifyContent={'space-between'}>
            <IconButton
                size={'sm'}
                variant={'outline'}
                aria-label='open info about chart'
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
                icon={<AiOutlineInfoCircle />} />

            <chakra.h6 textAlign={'center'} noOfLines={1} textOverflow='ellipsis'>{title}</chakra.h6>

            <Menu closeOnSelect={false}>
                <MenuButton
                    size={'sm'}
                    as={IconButton}
                    aria-label='Options'
                    icon={<AiOutlineExpand />}
                    variant='outline'
                />
                {chartMenu}
            </Menu>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Info</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ReactMarkdown>{modalInfo}</ReactMarkdown>
                    </ModalBody>
                    <ModalFooter>

                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}


