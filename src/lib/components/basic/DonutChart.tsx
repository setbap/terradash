import {
    chakra,
    Box,
    Button,
    Text,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useColorModeValue,
    GridItem,
} from "@chakra-ui/react";
import { useState } from "react";
import {
    AiOutlineDownload,
    AiOutlineExpand,
    AiOutlineInfoCircle,
} from "react-icons/ai";
import { ResponsiveContainer, PieChart, Pie, Sector } from "recharts";
import millify from "millify";
interface Props {
    modelInfo: string;
    dataKey: string;
    nameKey: string;
    title: string;
    tooltipTitle: string;
    data: any[];
}

const DonutChart = ({
    dataKey,
    nameKey,
    data,
    title,
    modelInfo,
    tooltipTitle,
}: Props) => {
    const [spanItem, setSpanItem] = useState(1);

    const [state, setState] = useState({
        activeIndex: 0,
    });

    const onPieEnter = (data: any, index: number, e: React.MouseEvent) => {
        setState({
            activeIndex: index,
        });
    };

    const OverlayOne = () => (
        <ModalOverlay
            bg="blackAlpha.700"
            backdropFilter="blur(10px) hue-rotate(20deg)"
        />
    );

    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgTooltip = useColorModeValue("gray.300", "gray.700");
    const bgCard = useColorModeValue("white", "#191919");
    const textColor = useColorModeValue("gray.900", "gray.100");
    const [overlay, setOverlay] = useState(<OverlayOne />);

    const renderActiveShape = (props: any) => {
        const RADIAN = Math.PI / 180;
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value,
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

        return (
            <g>

                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill="none"
                />
                <circle cx={ex} cy={ey} r={4} fill={fill} stroke="none" />
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    fill="#333"
                >{`${payload.coin} ${millify(value, {
                    precision: 2,
                    decimalSeparator: ",",
                })} `}</text>
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    dy={18}
                    textAnchor={textAnchor}
                    fill="#999"
                >
                    {`(Rate ${millify(percent * 100, {
                        precision: 2,
                        decimalSeparator: ",",
                    })}%)`}
                </text>
            </g>
        );
    };

    return (
        <GridItem rowSpan={1} colSpan={spanItem}>
            <Box
                color={textColor}
                bgColor={bgCard}
                shadow="base"
                transition={"all 0.5s "}
                _hover={{
                    transform: "scale(1.01)",
                    boxShadow: "var(--chakra-shadows-lg)",
                }}
                borderRadius={"2xl"}
                width="100%"
            >
                <Box
                    px="6"
                    pt="4"
                    pb={"2"}
                    _hover={{ boxShadow: `0px 0px 4px ${bgTooltip}` }}
                    display="flex"
                    flexDir={"column"}
                    alignItems="center"
                    height={"400px"}
                    id={title}
                >
                    <Box
                        width={"100%"}
                        display={"flex"}
                        alignItems="center"
                        justifyContent={"space-between"}
                    >
                        <IconButton
                            size={"sm"}
                            aria-label="download chart"
                            variant="outline"
                            icon={<AiOutlineDownload />}
                            onClick={async () => {
                                console.log("save");
                            }}
                        />
                        <Box />
                        <chakra.h6
                            textAlign={"center"}
                            noOfLines={1}
                            textOverflow="ellipsis"
                        >
                            {title}
                        </chakra.h6>
                        <Box>
                            <IconButton
                                me={2}
                                size={"sm"}
                                variant={"outline"}
                                aria-label="expand chart row"
                                onClick={() => {
                                    setSpanItem((value) => (value === 3 ? 1 : 3));
                                }}
                                icon={<AiOutlineExpand />}
                            />

                            <IconButton
                                size={"sm"}
                                variant={"outline"}
                                aria-label="open info about chart"
                                onClick={() => {
                                    setOverlay(<OverlayOne />);
                                    onOpen();
                                }}
                                icon={<AiOutlineInfoCircle />}
                            />
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
                    <Box p={"1"} />

                    <ResponsiveContainer width={"100%"}>
                        <PieChart width={400} height={400}>
                            <Pie
                                activeIndex={state.activeIndex}
                                activeShape={renderActiveShape}
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#0953fe"
                                dataKey={dataKey}
                                nameKey={nameKey}
                                onMouseEnter={onPieEnter}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </GridItem>
    );
};

export default DonutChart;
