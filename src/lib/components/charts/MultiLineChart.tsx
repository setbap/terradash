import {
  Box,
  ModalOverlay,
  useDisclosure,
  useColorModeValue,
  GridItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import millify from "millify";

import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import ChartSpanMenu from "../basic/ChartSpanMenu";
import { GRID_ITEM_SIZE } from "./template";
import ChartHeader from "../basic/ChartHeader";
import { FilterDayBarBox } from "../basic/FilterDayBar";

interface Props {
  baseSpan?: number;
  modelInfo: string;
  xAxisDataKey: string;
  areaDataKey: string[];
  title: string;
  data: any[];
  chartColors?: string[];
  multiOff?: boolean;
  isNotDate?: boolean;
  defultSelectedRange?: number | string;
}

const MultiChartBox = ({
  isNotDate = false,
  baseSpan = 1,
  multiOff = false,
  areaDataKey,
  xAxisDataKey,
  data,
  title,
  modelInfo,
  defultSelectedRange = 'all',
  chartColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
}: Props) => {
  const [spanItem, setSpanItem] = useState(GRID_ITEM_SIZE[baseSpan - 1]);
  const bgTooltip = useColorModeValue("gray.300", "gray.700");
  const bgCard = useColorModeValue("white", "#191919");
  const textColor = useColorModeValue("gray.900", "gray.100");

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

  const getMaxDate = () => {
    let maxD = moment(data[0][xAxisDataKey]);
    data.forEach(item => {
      if (moment(item[xAxisDataKey]).isAfter(maxD)) {
        maxD = moment(item[xAxisDataKey]);
      }
    });
    return maxD;
  }
  const maxDate = isNotDate ? null : getMaxDate();
  const getMinDate = () => {
    let minD = moment(data[0][xAxisDataKey]);
    data.forEach(item => {
      if (moment(item[xAxisDataKey]).isBefore(minD)) {
        minD = moment(item[xAxisDataKey]);
      }
    });
    return minD;
  }
  const minDate = isNotDate ? null : getMinDate();

  const filterDateAccordingRange = (minDate: Date, maxDate: Date) => {
    const newData = data.filter(item => {
      return moment(item[xAxisDataKey]).isAfter(minDate) && moment(item[xAxisDataKey]).isBefore(maxDate)
    })
    setSelectedDate("custom");
    setChartData(newData)
  }


  const resetChartData = () => {
    setSelectedDate('all');
    setChartData(data)
  }

  return (
    <GridItem
      rowSpan={1}
      colSpan={spanItem}
      color={textColor}
      bgColor={bgCard}
      shadow="base"
      transition={"all 0.5s "}
      _hover={{ boxShadow: "var(--chakra-shadows-lg)" }}
      borderRadius={"2xl"}
      width="100%"
    >
      <Box
        pe={multiOff ? 7 : 1}
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
          <LineChart
            data={chartData}
            syncId={`${areaDataKey}-${xAxisDataKey}`}
            className="mt-1 mb-2"
          >
            <defs>
              <linearGradient id="fillcolor1">
                <stop style={{ stopColor: "#0953fe" }} stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="fillcolor2">
                <stop style={{ stopColor: "#e3034e" }} stopOpacity={0.7} />
              </linearGradient>

              <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
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

              <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  style={{ stopColor: "#f9035e" }}
                  stopOpacity={0.15}
                />
                <stop
                  offset="95%"
                  style={{ stopColor: "#e3034e" }}
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
            {multiOff ? (
              <YAxis width={40} fontSize="12" tickSize={8} />
            ) : (
              areaDataKey.map((key, index) => (
                <YAxis
                  orientation={(index + 1) % 2 === 0 ? "left" : "right"}
                  key={index}
                  width={40}
                  fontSize="12"
                  yAxisId={key}
                  tickSize={8}
                />
              ))
            )}

            <Tooltip
              labelFormatter={(value: string) =>
                isNotDate ? value : moment(value).format("MMM DD YYYY")
              }
              labelStyle={{ color: "white" }}
              contentStyle={{ backgroundColor: "black", borderRadius: "5px" }}
              formatter={(a: any) => {
                return millify(a, {
                  precision: 2,
                  decimalSeparator: ".",
                });
              }}
            />
            {areaDataKey.map((item, index) =>
              multiOff ? (
                <Line
                  key={item}
                  type="natural"
                  dataKey={item}
                  dot={false}
                  stroke={chartColors[index]}
                />
              ) : (
                <Line
                  key={item}
                  type="natural"
                  yAxisId={item}
                  dataKey={item}
                  dot={false}
                  stroke={chartColors[index]}
                />
              )
            )}

            <Legend fontSize={"8px"} verticalAlign="top" height={12} />
          </LineChart>
        </ResponsiveContainer>
        {!isNotDate && <><Box p={"1"} />
          <FilterDayBarBox
            selecteRange={selectedDate}
            onSelectLastNthDay={filterDateAccordingDay}
            onSelectRangeDay={filterDateAccordingRange}
            onResetClick={resetChartData}
            minDate={minDate!.toDate()}
            maxDate={maxDate!.toDate()}
            filters={[{ day: 7, name: "7D" }, { day: 30, name: "30D" }, { day: 365, name: "1Y" }]}
          /></>}
      </Box>
    </GridItem>
  );
};

export default MultiChartBox;
