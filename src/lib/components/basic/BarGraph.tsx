import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from "recharts";
import millify from "millify";
import {
    Box, IconButton, chakra, Modal, ModalContent, ModalHeader, ModalCloseButton,
    Text, ModalBody, ModalFooter, Button, ModalOverlay, useColorModeValue, useDisclosure
} from "@chakra-ui/react";
import { AiOutlineDownload, AiOutlineInfoCircle } from "react-icons/ai";

const BarGraph = ({
    title,
    dataKey,
    oxLabel,
    oyLabel,
    values,
    yLimit,
    labels
}: {
    title: string,
    dataKey: string,
    oxLabel: string,
    oyLabel: string,
    values: any[],
    yLimit: number[],
    labels: { key: string; color: string }[],
}) => {
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
        <Box color={textColor} bgColor={bgCard} shadow='base'
            transition={'all 0.5s '} _hover={{ boxShadow: 'var(--chakra-shadows-lg)' }} borderRadius={'2xl'}
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
                                    <Text>{title}</Text>
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
                    >
                        <XAxis fontSize={"12px"} tickFormatter={(value) => new Date(value).toLocaleDateString()} dataKey={dataKey}>
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
                                dx={10}
                            />
                        </YAxis>
                        <Tooltip
                            labelFormatter={(value: string) => new Date(value).toDateString()}
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
            </Box></Box>
    );
};

export default BarGraph;
