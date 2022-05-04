import React from "react";
import { Line } from "recharts";

function getAvg(arr: number[]) {
  const total = arr.reduce((acc, c) => acc + c, 0);
  return total / arr.length;
}

function getSum(arr: number[]) {
  return arr.reduce((acc, c) => acc + c, 0);
}

function createTrend(data: any[], xKey: string, yKey: string) {
  const xData = data.map((value) => value[xKey]);
  const yData = data.map((value) => value[yKey]);

  // average of X values and Y values
  const xMean = getAvg(xData);
  const yMean = getAvg(yData);

  // Subtract X or Y mean from corresponding axis value
  const xMinusxMean = xData.map((val) => val - xMean);
  const yMinusyMean = yData.map((val) => val - yMean);

  const xMinusxMeanSq = xMinusxMean.map((val) => Math.pow(val, 2));

  const xy = [];
  for (let x = 0; x < data.length; x++) {
    xy.push(xMinusxMean[x] * yMinusyMean[x]);
  }

  // const xy = xMinusxMean.map((val, index) => val * yMinusyMean[index]);

  const xySum = getSum(xy);

  // b1 is the slope
  const b1 = xySum / getSum(xMinusxMeanSq);
  // b0 is the start of the slope on the Y axis
  const b0 = yMean - b1 * xMean;

  return {
    slope: b1,
    yStart: b0,
    calcY: (x: number) => b0 + b1 * x,
  };
}

interface Props {
  data: any[];
  xKey: string;
  yKey: string;
}

export const TrendLine = ({ data, xKey, yKey }: Props) => {
  const trendData = () => {
    debugger;
    const trend = createTrend(data, xKey, yKey);
    console.log([
      { [yKey]: trend.calcY(data[0][xKey]), [xKey]: data[0][xKey] },
      {
        [yKey]: trend.calcY(data[data.length - 1][xKey]),
        [xKey]: data[data.length - 1][xKey],
      },
    ]);
    return [
      { [yKey]: trend.calcY(data[0][xKey]), [xKey]: data[0][xKey] },
      {
        [yKey]: trend.calcY(data[data.length - 1][xKey]),
        [xKey]: data[data.length - 1][xKey],
      },
    ];
  };
  return (
    <Line
      data={trendData()}
      dataKey="weight"
      stroke="red"
      strokeDasharray="3 3"
    />
  );
};

export default TrendLine;
