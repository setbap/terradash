import {
  Box,
  useColorModeValue,
  GridItem,
  MenuList,
  MenuDivider,
  MenuItemOption,
  MenuOptionGroup,
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
import { AnimatePresence } from "framer-motion";
import MotionBox from "../motion/Box";
import LinkToSourceMenuItem from "../basic/LinkToSourceMenuItem";

interface Props {
  modelInfo: string;
  xAxisDataKey: string;
  areaDataKey: string;
  title: string;
  tooltipTitle: string;
  data: any[];
  monthlyData?: any[];
  extraDecimal?: number;
  isNotDate?: boolean;
  domain?: [number, number];
  baseSpan?: number;
  defultSelectedRange?: number | string;
  defultDateView?: "month" | "day";
  showMonthly?: boolean;
  queryLink?: string;
}

const LineChartV2 = ({
  baseSpan = 1,
  defultDateView = "day",
  queryLink,
  isNotDate = false,
  extraDecimal = 2,
  monthlyData,
  domain,
  areaDataKey,
  xAxisDataKey,
  data,
  title,
  modelInfo,
  defultSelectedRange = "all",
  showMonthly = true
}: Props) => {
  const [spanItem, setSpanItem] = useState(GRID_ITEM_SIZE[baseSpan - 1]);
  const [defultViewSetting, setDefultViewSetting] = useState(defultDateView);
  const [selectedDate, setSelectedDate] = useState<number | string>(
    defultSelectedRange
  );
  const [chartData, setChartData] = useState(defultViewSetting === 'day' ? data : monthlyData!);
  const [savedDailyChart, setSavedDailyChart] = useState(data);
  const filterDateAccordingDay = (numberOfDays: number) => {
    const lastDay = moment(data[data.length - 1][xAxisDataKey]).subtract(
      numberOfDays,
      "days"
    );
    const newData = data.filter((item) => {
      return moment(item[xAxisDataKey]).isAfter(lastDay);
    });
    setSelectedDate(numberOfDays);
    setChartData(newData);
  };
  const getMaxDate = () => {
    let maxD = moment(data[0][xAxisDataKey]);
    data.forEach((item) => {
      if (moment(item[xAxisDataKey]).isAfter(maxD)) {
        maxD = moment(item[xAxisDataKey]);
      }
    });
    return maxD;
  };
  const maxDate = isNotDate ? null : getMaxDate();
  const getMinDate = () => {
    let minD = moment(data[0][xAxisDataKey]);
    data.forEach((item) => {
      if (moment(item[xAxisDataKey]).isBefore(minD)) {
        minD = moment(item[xAxisDataKey]);
      }
    });
    return minD;
  };
  const minDate = isNotDate ? null : getMinDate();

  const changeDataToMonethly = () => {
    setDefultViewSetting("month");
    setSavedDailyChart(chartData);
    setChartData(monthlyData!);
  };

  const changeDataToDaily = () => {
    setChartData(savedDailyChart);
    setDefultViewSetting("day");
  };

  const filterDateAccordingRange = (minDate: Date, maxDate: Date) => {
    const newData = data.filter((item) => {
      return (
        moment(item[xAxisDataKey]).isAfter(minDate) &&
        moment(item[xAxisDataKey]).isBefore(maxDate)
      );
    });
    setSelectedDate("custom");
    setChartData(newData);
  };

  const resetChartData = () => {
    setSelectedDate("all");
    setChartData(data);
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
              {queryLink &&
                <>
                  <LinkToSourceMenuItem queryLink={queryLink} />
                  <MenuDivider />
                </>
              }
              {showMonthly && (<><MenuOptionGroup
                onChange={(value) => {
                  if (value === "month") {
                    changeDataToMonethly();
                  } else {
                    changeDataToDaily();
                  }
                }}
                defaultValue={defultViewSetting}
                title="Chart Date Type"
                type="radio"
              >
                <MenuItemOption value={"month"}>monthly</MenuItemOption>
                <MenuItemOption value={"day"}>daily</MenuItemOption>
              </MenuOptionGroup>
                <MenuDivider /></>)}
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
        <ResponsiveContainer
          height={!isNotDate && defultViewSetting === "day" ? 380 : 425}
          width={"100%"}
        >
          <AreaChart
            data={chartData}
            syncId={`${areaDataKey}-${xAxisDataKey}`}
            className="mt-1 mb-1"
          >
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  style={{ stopColor: "var(--chakra-colors-green-300)" }}
                  stopOpacity={0.15}
                />
                <stop
                  offset="95%"
                  style={{ stopColor: "var(--chakra-colors-green-400)" }}
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
                if (isNotDate || defultViewSetting === "month") {
                  return value;
                }
                if (defultViewSetting === "day") {
                  return moment(value).format("MMM DD YYYY");
                }
              }}
              dataKey={xAxisDataKey}
            />
            <YAxis
              domain={domain}
              tickFormatter={(value) =>
                millify(value, {
                  precision: extraDecimal,
                  decimalSeparator: ".",
                })
              }
              width={40}
              fontSize="12"
              tickSize={8}
            />
            <Tooltip
              labelFormatter={(value: string) => {
                if (isNotDate || defultViewSetting === "month") {
                  return value;
                }
                if (defultViewSetting === "day") {
                  return moment(value).format("MMM DD YYYY");
                }
              }}
              labelStyle={{ color: "white" }}
              contentStyle={{ backgroundColor: "black", borderRadius: "5px" }}
              formatter={(a: any) => {
                return millify(a, {
                  precision: extraDecimal,
                  decimalSeparator: ".",
                });
              }}
            />
            <Area
              dataKey={areaDataKey}
              style={{ stroke: "var(--chakra-colors-green-400)" }}
              fill="url(#color)"
            />
            {/* <Legend
              verticalAlign="top"
              fontSize={"8px"}
              style={{ fontSize: "7px" }}
            /> */}
          </AreaChart>
        </ResponsiveContainer>
        <AnimatePresence>
          {!isNotDate && defultViewSetting === "day" && (
            <MotionBox
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              height={"36px"}
            >
              <Box p={"1"} />
              <FilterDayBarBox
                selecteRange={selectedDate}
                onSelectLastNthDay={filterDateAccordingDay}
                onSelectRangeDay={filterDateAccordingRange}
                onResetClick={resetChartData}
                minDate={minDate!.toDate()!}
                maxDate={maxDate!.toDate()}
                filters={[
                  { day: 7, name: "7D" },
                  { day: 30, name: "30D" },
                  {
                    day:
                      Math.round(
                        (maxDate!.toDate().getTime() -
                          new Date(
                            maxDate!.toDate().getFullYear(),
                            0,
                            1
                          ).getTime()) /
                        (1000 * 60 * 60 * 24)
                      ) + 1,
                    name: maxDate!.toDate().getFullYear().toString(),
                  },
                  { day: 365, name: "1Y" },
                ]}
              />
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </GridItem>
  );
};

export default LineChartV2;
