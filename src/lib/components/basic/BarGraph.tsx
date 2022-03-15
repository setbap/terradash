import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer, CartesianGrid } from "recharts";
import millify from "millify";
import {
    Box, IconButton, chakra, Modal, ModalContent, ModalHeader, ModalCloseButton,
    Text, ModalBody, ModalFooter, Button, ModalOverlay, useColorModeValue, useDisclosure, GridItem
} from "@chakra-ui/react";
import { AiOutlineDownload, AiOutlineExpand, AiOutlineInfoCircle } from "react-icons/ai";

const BarGraph = ({
    title,
    dataKey,
    oxLabel,
    oyLabel,
    values,
    yLimit,
    labels,
    modelInfo,
    isNotDate = false
}: {
    title: string,
    dataKey: string,
    oxLabel: string,
    oyLabel: string,
    isNotDate?: boolean
    values: any[],
    modelInfo: string,
    yLimit?: number[],
    labels: { key: string; color: string }[],
}) => {
    const [spanItem, setSpanItem] = useState(1)
    const [barProps, setBarProps] = useState(
        labels.reduce(
            (a: any, { key }: any) => {
                a[key] = false;
                return a;
            },
            { hover: null }
        )
    );
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.700'
            backdropFilter='blur(10px) hue-rotate(20deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const bgTooltip = useColorModeValue('gray.300', 'gray.700');
    const bgCard = useColorModeValue('white', '#191919');
    const textColor = useColorModeValue('gray.900', 'gray.100');
    const [overlay, setOverlay] = useState(<OverlayOne />)



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
                                    setSpanItem(value => value === 3 ? 1 : 3)
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
                        <BarChart
                            data={values}
                            className="mt-1 mb-2"
                        >
                            <CartesianGrid
                                style={{ stroke: "rgba(10,10,10,0.1)", opacity: 0.25 }}
                                strokeDasharray="3 3"
                            />
                            <XAxis fontSize={"12px"} tickFormatter={(value) => isNotDate ? value : new Date(value).toLocaleDateString()} dataKey={dataKey}>
                                {/* <Label value={oxLabel} position="center" dy={10} dx={20} /> */}
                            </XAxis>
                            <YAxis fontSize={"12px"} type="number" tickFormatter={(value) => millify(value, {
                                precision: 2,
                                decimalSeparator: ","
                            })
                            }>
                                <Label
                                    value={oyLabel}
                                    position="left"
                                    fontSize={'16px'}
                                    angle={-90}
                                    dy={-20}
                                    style={{
                                        color: textColor
                                    }}
                                    dx={10}
                                />
                            </YAxis>
                            <Tooltip
                                labelFormatter={(value: string) => isNotDate ? value : new Date(value).toDateString()}
                                labelStyle={{ color: 'white' }}
                                contentStyle={{ backgroundColor: 'black', borderRadius: '5px' }}
                                formatter={(a: any) => {
                                    return millify(a, {
                                        precision: 2,
                                        decimalSeparator: ","
                                    })
                                }} />
                            <Legend
                                fontSize={"8px"}
                                style={{ fontSize: '7px' }}
                                onClick={selectBar}
                                onMouseOver={handleLegendMouseEnter}
                                onMouseOut={handleLegendMouseLeave}
                            />
                            {labels.map((label, index) => (
                                <Bar
                                    key={index}
                                    dataKey={label.key}
                                    fill={label.color}
                                    stackId={dataKey}
                                    hide={barProps[label.key] === true}
                                    fillOpacity={Number(
                                        barProps.hover === label.key || !barProps.hover ? 1 : 0.6
                                    )}
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </GridItem>
    );
};

export default BarGraph;
