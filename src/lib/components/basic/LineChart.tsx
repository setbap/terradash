import { chakra, Box, Button, Text, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineDownload, AiOutlineInfoCircle } from "react-icons/ai";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Props {
    modelInfo: string
    xAxisDataKey: string;
    areaDataKey: string;
    title: string;
    tooltipTitle: string;
    data: any[];
}

const ChartBox = ({ areaDataKey, xAxisDataKey, data, title, modelInfo, tooltipTitle }: Props) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.700'
            backdropFilter='blur(10px) hue-rotate(20deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const bgTooltip = useColorModeValue('gray.300', 'gray.700');
    const bgCard = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.900', 'gray.100');
    const [overlay, setOverlay] = useState(<OverlayOne />)
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active) {
            const date = new Date(label);
            const payloadData = payload[0]["payload"][payload[0]["name"]];
            return (
                <Box p={"3"} color={textColor} shadow="base" rounded={"2xl"} minW="80px" bg={bgTooltip}>
                    <chakra.h4>
                        Time : <strong> {date.toDateString()}</strong>
                    </chakra.h4>
                    <Text>
                        {tooltipTitle} : <strong> {`${payloadData}`} </strong>
                    </Text>
                </Box>
            );
        }
        return null;
    };

    return (
        <Box color={textColor} bgColor={bgCard} shadow='base'
            transition={'all 0.5s '} _hover={{ transform: 'scale(1.01)', boxShadow: 'var(--chakra-shadows-lg)' }} borderRadius={'2xl'}
            width="100%"
            maxW={'600px'}
        >
            <Box
                px='6'
                pt='4'
                pb={'2'}
                _hover={{ boxShadow: `0px 0px 4px ${bgTooltip}` }}

                display="flex"
                flexDir={"column"}
                alignItems="center"
                height={'350px'}
                id={title}
            >
                <Box width={'100%'} display={'flex'} alignItems='center' justifyContent={'space-between'}>
                    <IconButton size={'sm'} aria-label="download chart" variant="outline" icon={<AiOutlineDownload />}
                        onClick={async () => { console.log("save"); }}
                    />
                    <chakra.h6 >{title}</chakra.h6>
                    <Box>
                        <IconButton
                            size={'sm'}
                            variant={'outline'}
                            aria-label='open info about chart'
                            onClick={() => {
                                setOverlay(<OverlayOne />)
                                onOpen()
                            }}
                            icon={<AiOutlineInfoCircle />} />
                        <Modal isCentered isOpen={isOpen} onClose={onClose}>
                            {overlay}
                            <ModalContent>
                                <ModalHeader>Info</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text>{modelInfo}</Text>
                                </ModalBody>
                                <ModalFooter>

                                    <Button onClick={onClose}>Close</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>

                </Box>
                <Box p={'1'} />

                <ResponsiveContainer width={"100%"}>
                    <AreaChart
                        data={data}
                        syncId={`${areaDataKey}-${xAxisDataKey}`}
                        className="mt-1 mb-2"
                    >
                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    style={{ stopColor: "#0953fe" }}
                                    stopOpacity={0.15}

                                />
                                <stop
                                    offset="95%"
                                    style={{ stopColor: "#0343ee" }}
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            style={{ stroke: "rgba(10,10,10,0.1)", opacity: 0.25 }}
                            strokeDasharray="3 3"
                        />
                        <XAxis
                            fontSize={12}
                            color={'var(--textColor)'}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString();
                            }}
                            dataKey={xAxisDataKey}
                        />
                        <YAxis width={40} fontSize="12" tickSize={8} />


                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="natural"
                            dataKey={areaDataKey}
                            strokeLinecap={'round'}
                            style={{ stroke: "#0953fe50" }}
                            fill="url(#color)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Box >
    );
};

export default ChartBox;
