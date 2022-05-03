import moment from "moment";import {
  NetworkFeeDaily,
  TerraTransactionStatics,
  TerraTransactionStaticsRes,
  TotalNetworkFeeDaily,
  TotalNetworkFeeDailyRes,
} from "types/type";

export const getTotalTransactionDailyFee: () => Promise<
  TotalNetworkFeeDaily[]
> = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/4b1c3da6-6616-44f4-b76d-4d67b3d4feeb/data/latest"
  );
  const data: TotalNetworkFeeDailyRes[] = await res.json();

  return data
    .map((item) => ({
      day: moment(item.DATETIME).format("YYYY-MM-DD"),
      Fee: item.DAILY_TOTAL_FEE_USD,
      "Avrage Fee": item.AVERAGE_FEE_USD,
    }))
    .sort((a, b) => (moment(a.day).isAfter(moment(b.day)) ? 1 : -1));
};

export const getTerraTransactionStatics: () => Promise<
  TerraTransactionStatics[]
> = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/1628a1ba-3b50-4c3c-bca8-aee303f1e117/data/latest"
  );
  const data: TerraTransactionStaticsRes[] = await res.json();
  return data.map((item) => ({
    day: moment(item.DATETIME).format("YYYY-MM-DD"),
    "Success Rate": item.SUCCESS_RATE,
    TPS: item.TPS,
    "Number of Transacton": item.TRANSACTIONS,
  }));
};

export const getNetworkFeeDaily = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/30b18d71-6174-4a13-8edc-e840c4c13601/data/latest"
  );
  const data: NetworkFeeDaily[] = await res.json();
  const tokenNames = Array.from(
    new Set(
      data.map((item) => {
        return item.CURRENCY;
      })
    )
  );
  const dailySwapFeeUSD = calculateDailyBridgeValue(
    "MM/DD/YYYY",
    data,
    "DATETIME",
    "CURRENCY",
    "TOTAL_FEE_USD",
    tokenNames,
    0.001
  );

  const dailyAVGSwapFeeUSD = calculateDailyBridgeValue(
    "MM/DD/YYYY",
    data,
    "DATETIME",
    "CURRENCY",
    "AVERAGE_FEE_BY_CURRENCY_USD",
    tokenNames,
    0.00001
  );
  return {
    dailySwapFeeUSD,
    dailyAVGSwapFeeUSD,
    tokenNames,
  };
};

function calculateDailyBridgeValue(
  dateFormat: string,
  USTBridgeValue: any[],
  dateKey: string,
  nameKey: string,
  valueKey: string,
  bridges: string[],
  minValue: number = 0
) {
  const dailyEachBridgeSum: { [key: string]: { [key: string]: number } } = {};
  USTBridgeValue.forEach((item) => {
    const date = moment(item[dateKey]).format(dateFormat);
    if (!Boolean(item[valueKey]) || item[valueKey] <= minValue) {
    } else if (dailyEachBridgeSum[date] === undefined) {
      dailyEachBridgeSum[date] = {};
      dailyEachBridgeSum[date][item[nameKey]] = item[valueKey];
    } else if (dailyEachBridgeSum[date][item[nameKey]] === undefined) {
      dailyEachBridgeSum[date][item[nameKey]] = item[valueKey];
    } else {
      dailyEachBridgeSum[date][item[nameKey]] += item[valueKey];
    }
  });
  const dailyBridgeValue = Object.entries(dailyEachBridgeSum)
    .map((bc) => {
      const finalObject = { date: bc[0] };
      bridges.forEach((bridge) => {
        if (bc[1][bridge]) {
          // @ts-ignore
          finalObject[bridge] = bc[1][bridge];
        }
      });
      return finalObject;
    })
    .sort((a, b) => {
      return moment(a.date).isAfter(moment(b.date)) ? 1 : -1;
    });
  return dailyBridgeValue;
}
