import {
  Box,
  useColorModeValue,
  GridItem,
  MenuList,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import moment from "moment";
import millify from "millify";
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
import { GRID_ITEM_SIZE } from "./template";
import ChartSpanMenu from "../basic/ChartSpanMenu";
import ChartHeader from "../basic/ChartHeader";
import { FilterDayBarBox } from "../basic/FilterDayBar";

interface Props {
  modelInfo: string;
  xAxisDataKey: string;
  areaDataKey: string;
  title: string;
  tooltipTitle: string;
  data: any[];
  extraDecimal?: number;
  isNotDate?: boolean;
  domain?: [number, number];
  baseSpan?: number;
  defultSelectedRange?: number | string;
}

const ChartBox = ({
  baseSpan = 1,
  isNotDate = false,
  extraDecimal = 2,
  domain,
  areaDataKey,
  xAxisDataKey,
  data,
  title,
  modelInfo,
  defultSelectedRange = 'all'
}: Props) => {
  const [spanItem, setSpanItem] = useState(GRID_ITEM_SIZE[baseSpan - 1]);
  const [barProps, setBarProps] = useState(
    data.reduce(
      (a: any, { key }: any) => {
        a[key] = false;
        return a;
      },
      { hover: null }
    )
  );

  const [selectedDate, setSelectedDate] = useState<number | string>(defultSelectedRange)
  const [chartData, setChartData] = useState(data);
  const filterDateAccordingDay = (numberOfDays: number) => {
    const lastDay = moment(data[data.length - 1][xAxisDataKey]).subtract(numberOfDays, 'days');
    const newData = data.filter(item => {
      return moment(item[xAxisDataKey]).isAfter(lastDay)
    })
    setSelectedDate(numberOfDays);
    setChartData(newData)
  }
  const resetChartData = () => {
    setSelectedDate('all');
    setChartData(data)
  }


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
      hover: null,
    });
  };

  const bgTooltip = useColorModeValue("gray.300", "gray.700");
  const bgCard = useColorModeValue("white", "#191919");
  const textColor = useColorModeValue("gray.900", "gray.100");


  return (
    <GridItem
      rowSpan={1}
      color={textColor}
      bgColor={bgCard}
      shadow="base"
      transition={"all 0.5s "}
      _hover={{ boxShadow: "var(--chakra-shadows-lg)" }}
      borderRadius={"2xl"}
      width="100%"
      colSpan={spanItem}
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
        // height={"400px"}
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
          <AreaChart
            data={chartData}
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
              color={"var(--textColor)"}
              tickFormatter={(value) => {
                return isNotDate
                  ? value
                  : moment(value).toDate().toLocaleDateString();
              }}
              dataKey={xAxisDataKey}
            />
            <YAxis
              domain={domain}
              tickFormatter={(value) =>
                millify(value, {
                  precision: extraDecimal,
                  decimalSeparator: ",",
                })
              }
              width={40}
              fontSize="12"
              tickSize={8}
            />

            <Tooltip
              labelFormatter={(value: string) =>
                isNotDate ? value : moment(value).toDate().toDateString()
              }
              labelStyle={{ color: "white" }}
              contentStyle={{ backgroundColor: "black", borderRadius: "5px" }}
              formatter={(a: any) => {
                return millify(a, {
                  precision: extraDecimal,
                  decimalSeparator: ",",
                });
              }}
            />
            <Area
              dataKey={areaDataKey}
              style={{ stroke: "#0953fe50" }}
              fill="url(#color)"
            />
            <Legend
              verticalAlign="top"
              fontSize={"8px"}
              style={{ fontSize: "7px" }}
              onClick={selectBar}
              onMouseOver={handleLegendMouseEnter}
              onMouseOut={handleLegendMouseLeave}
            />
          </AreaChart>
        </ResponsiveContainer>
        {!isNotDate && <><Box p={"1"} />
          <FilterDayBarBox
            selecteRange={selectedDate}
            onClick={filterDateAccordingDay}
            onResetClick={resetChartData}
            filters={[{ day: 7, name: "1W" }, { day: 30, name: "1M" }, { day: 180, name: "6M" }, { day: 365, name: "1Y" }]}
          /></>}
      </Box>
    </GridItem>
  );
};

export default ChartBox;
