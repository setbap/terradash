import { Box, useColorModeValue, GridItem, MenuList, MenuDivider } from "@chakra-ui/react";
import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from "recharts";
import millify from "millify";
import { GRID_ITEM_SIZE } from "./template";
import ChartSpanMenu from "../basic/ChartSpanMenu";
import ChartHeader from "../basic/ChartHeader";
import LinkToSourceMenuItem from "../basic/LinkToSourceMenuItem";
interface Props {
    modelInfo: string;
    dataKey: string;
    nameKey: string;
    title: string;
    tooltipTitle: string;
    data: any[];
    baseSpan?: number;
    colors?: string[];
    queryLink?: string;
}

const DonutChart = ({
    baseSpan = 1,
    queryLink,
    dataKey,
    nameKey,
    data,
    title,
    modelInfo,
    tooltipTitle,
    colors = ["#00bcd4", "#ffc107", "#ff5722", "#03a9f4", "#4caf50", "#f44336", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#009688", "#607d8b"],
}: Props) => {
    const [spanItem, setSpanItem] = useState(GRID_ITEM_SIZE[baseSpan - 1]);

    const [state, setState] = useState({
        activeIndex: 0,
    });

    const onPieEnter = (data: any, index: number, e: React.MouseEvent) => {
        setState({
            activeIndex: index,
        });
    };

    const bgTooltip = useColorModeValue("gray.300", "gray.700");
    const bgCard = useColorModeValue("white", "#191919");
    const textColor = useColorModeValue("gray.900", "gray.100");
    const centerCircleTextColor = useColorModeValue(
        "rgb(30,30,30)",
        "rgb(210,210,210)"
    );

    const renderActiveShape = (props: any) => {
        const RADIAN = Math.PI / 180;
        const {
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value,
            name,
        } = props;

        return (
            <g>
                <text x={cx} y={cy} dy={3} textAnchor="middle" fill={fill}>
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
                    innerRadius={outerRadius + 2}
                    outerRadius={outerRadius + 6}
                    fill={"rgb(100,255,100)"}
                />

                <text
                    width={100}
                    x={cx}
                    y={cy - 16}
                    fontSize={16}
                    textAnchor={"middle"}
                    fill={centerCircleTextColor}
                >{`${millify(value, {
                    precision: 2,
                    decimalSeparator: ".",
                })}`}</text>
                <text
                    x={cx}
                    y={cy + 8}
                    fontSize={20}
                    textAnchor={"middle"}
                    fill={centerCircleTextColor}
                >{`${name}`}</text>

                <text
                    x={cx}
                    y={cy + 32}
                    textAnchor={"middle"}
                    fontSize={14}
                    fill={centerCircleTextColor}
                >{`(Rate ${millify(percent * 100, {
                    precision: 2,
                    decimalSeparator: ".",
                })}%)`}</text>
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
                    height={"480px"}
                    id={title}
                >
                    <ChartHeader
                        chartMenu={
                            <MenuList>
                                {queryLink &&
                                    <>
                                        <LinkToSourceMenuItem queryLink={queryLink} />
                                        <MenuDivider />
                                    </>
                                }
                                <ChartSpanMenu
                                    onChange={(span) =>
                                        setSpanItem(GRID_ITEM_SIZE[Number(span) - 1])
                                    }
                                    baseSpan={baseSpan}
                                />
                            </MenuList>
                        }
                        modalInfo={modelInfo}
                        title={title}
                    />
                    <Box p={"1"} />

                    <ResponsiveContainer width={"100%"}>
                        <PieChart width={400} height={400}>
                            <Pie
                                activeIndex={state.activeIndex}
                                activeShape={renderActiveShape}
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={105}
                                outerRadius={140}
                                fill="#0953fe"
                                dataKey={dataKey}
                                nameKey={nameKey}
                                onMouseEnter={onPieEnter}
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </GridItem>
    );
};

export default DonutChart;
