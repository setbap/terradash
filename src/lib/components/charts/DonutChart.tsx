import { Box, useColorModeValue, GridItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Sector } from "recharts";
import millify from "millify";
import { GRID_ITEM_SIZE } from "./template";
import ChartSpanMenu from "../basic/ChartSpanMenu";
import ChartHeader from "../basic/ChartHeader";
interface Props {
    modelInfo: string;
    dataKey: string;
    nameKey: string;
    title: string;
    tooltipTitle: string;
    data: any[];
    baseSpan?: number;
}

const DonutChart = ({
    baseSpan = 1,
    dataKey,
    nameKey,
    data,
    title,
    modelInfo,
    tooltipTitle,
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
            midAngle,
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
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 7) * cos;
        const sy = cy + (outerRadius + 7) * sin;
        const mx = cx + (outerRadius + 20) * cos;
        const my = cy + (outerRadius + 20) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 11;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

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
                {/* <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={'rgb(100,255,100)'}
                    fill="none"
                />
                <circle cx={ex} cy={ey} r={4} fill={'rgb(100,255,100)'} stroke="none" /> */}
                <text
                    x={cx}
                    y={cy - 16}
                    fontSize={16}
                    textAnchor={"middle"}
                    fill={centerCircleTextColor}
                >{`${millify(value, {
                    precision: 2,
                    decimalSeparator: ",",
                })}`}</text>
                <text
                    // x={ex + (cos >= 0 ? 1 : -1) * 7}
                    // y={ey + 4}
                    x={cx}
                    y={cy + 8}
                    fontSize={20}
                    // textAnchor={textAnchor}
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
                    decimalSeparator: ",",
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
                    height={"400px"}
                    id={title}
                >
                    <ChartHeader
                        chartMenu={
                            <MenuList>
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
                                innerRadius={90}
                                outerRadius={115}
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
