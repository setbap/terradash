import { chakra, Box, Button, Text, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useColorModeValue, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import millify from "millify";
import { AiOutlineDownload, AiOutlineExpand, AiOutlineInfoCircle } from "react-icons/ai";
import {
    AreaChart,
    Legend,
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
    extraDecimal?: number
    isNotDate?: boolean;
    domain?: [number, number]
    baseSpan?: number;
}

const ChartBox = ({ baseSpan = 1, isNotDate = false, extraDecimal = 2, domain, areaDataKey, xAxisDataKey, data, title, modelInfo, tooltipTitle }: Props) => {
    const [spanItem, setSpanItem] = useState(baseSpan)
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.700'
            backdropFilter='blur(10px) hue-rotate(20deg)'
        />
    )
    const [barProps, setBarProps] = useState(
        data.reduce(
            (a: any, { key }: any) => {
                a[key] = false;
                return a;
            },
            { hover: null }
        )
    );

    const handleLegendMouseEnter = (e: any) => {
        if (!barProps[e.dataKey]) {
            setBarProps({ ...barProps, hover: e.dataKey });
        }
    };

    const handleLegendMouseLeave = (_: never) => {
        setBarProps({ ...barProps, hover: null });
    };

    const selectBar = (e: any) => {
        setBarProps({
            ...barProps,
            [e.dataKey]: !barProps[e.dataKey],
            hover: null
        });
    };

    const { isOpen, onOpen, onClose } = useDisclosure()
    const bgTooltip = useColorModeValue('gray.300', 'gray.700');
    const bgCard = useColorModeValue('white', '#191919');
    const textColor = useColorModeValue('gray.900', 'gray.100');
    const [overlay, setOverlay] = useState(<OverlayOne />)

    return (
        <GridItem rowSpan={1} colSpan={spanItem} >
            <Box color={textColor} bgColor={bgCard} shadow='base'
                transition={'all 0.5s '} _hover={{ transform: 'scale(1.01)', boxShadow: 'var(--chakra-shadows-lg)' }} borderRadius={'2xl'}
                width="100%"
            >
                <Box
                    px='6'
                    pt='4'
                    pb={'2'}
                    _hover={{ boxShadow: `0px 0px 4px ${bgTooltip}` }}
                    display="flex"
                    flexDir={"column"}
                    alignItems="center"
                    height={'400px'}
                    id={title}
                >
                    <Box width={'100%'} display={'flex'} alignItems='center' justifyContent={'space-between'}>
                        <IconButton size={'sm'} aria-label="download chart" variant="outline" icon={<AiOutlineDownload />}
                            onClick={async () => { console.log("save"); }}
                        />
                        <Box />
                        <chakra.h6 textAlign={'center'} noOfLines={1} textOverflow='ellipsis'>{title}</chakra.h6>
                        <Box>
                            <IconButton
                                me={2}
                                size={'sm'}
                                variant={'outline'}
                                aria-label='expand chart row'
                                onClick={() => {
                                    setSpanItem(value => value === 3 ? baseSpan : 3)
                                }}
                                icon={<AiOutlineExpand />} />

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

                                    return isNotDate ? value : new Date(value).toLocaleDateString();
                                }}
                                dataKey={xAxisDataKey}
                            />
                            <YAxis
                                domain={domain}
                                tickFormatter={(value) => millify(value, {
                                    precision: extraDecimal,
                                    decimalSeparator: ","
                                })} width={40} fontSize="12" tickSize={8} />


                            <Tooltip
                                labelFormatter={(value: string) => isNotDate ? value : new Date(value).toDateString()}
                                labelStyle={{ color: 'white' }}
                                contentStyle={{ backgroundColor: 'black', borderRadius: '5px' }}
                                formatter={(a: any) => {
                                    return millify(a, {
                                        precision: extraDecimal,

                                        decimalSeparator: ","
                                    })
                                }} />
                            <Area

                                dataKey={areaDataKey}

                                style={{ stroke: "#0953fe50" }}
                                fill="url(#color)"

                            />
                            <Legend
                                verticalAlign="top"
                                fontSize={"8px"}
                                style={{ fontSize: '7px' }}
                                onClick={selectBar}
                                onMouseOver={handleLegendMouseEnter}
                                onMouseOut={handleLegendMouseLeave}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Box >
        </GridItem>
    );
};

export default ChartBox;
