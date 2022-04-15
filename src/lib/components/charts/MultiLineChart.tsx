import {  chakra,
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
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import millify from "millify";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

import { AiOutlineExpand, AiOutlineInfoCircle } from "react-icons/ai";
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

interface Props {
  baseSpan?: number;
  modelInfo: string;
  xAxisDataKey: string;
  areaDataKey: string[];
  title: string;
  tooltipTitle: string[];
  data: any[];
  chartColors?: string[];
  multiOff?: boolean;
  isNotDate?: boolean;
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
  tooltipTitle,
  chartColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
}: Props) => {
  const [spanItem, setSpanItem] = useState(GRID_ITEM_SIZE[baseSpan - 1]);
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
        ps="3"
        pe={multiOff ? 7 : 1}
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
          <LineChart
            data={data}
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
                isNotDate ? value : moment(value).toDate().toDateString()
              }
              labelStyle={{ color: "white" }}
              contentStyle={{ backgroundColor: "black", borderRadius: "5px" }}
              formatter={(a: any) => {
                return millify(a, {
                  precision: 2,
                  decimalSeparator: ",",
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
      </Box>
    </GridItem>
  );
};

export default MultiChartBox;
