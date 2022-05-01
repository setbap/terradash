import {
  MirrorTokenPrice,
  MirrorTokenPriceRes,
  MirrorTVLByStocksVolumeRes,
  SwapValumeRes,
} from "types/type";
import moment from "moment";
export const getPriceOfMirInLast30Days: () => Promise<
  MirrorTokenPrice[]
> = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/mirror-protocol/market_chart?vs_currency=usd&days=366&interval=daily"
  );
  const totalNumberOfWallets: MirrorTokenPriceRes = await res.json();
  return totalNumberOfWallets.prices
    .sort((a, b) => (a[0] - b[0] > 0 ? 1 : -1))
    .map((item) => ({
      day: moment(item[0]).format("DD MMM YYYY"),
      "Mir Price": item[1],
    }));
};

export const getMirTokenCirculatingSupply: () => Promise<number> = async () => {
  const res = await fetch("https://fcd.terra.dev/v1/circulatingsupply/mir");
  const mirTokenSupply: number = await res.json();
  return mirTokenSupply;
};

export const getMirTokenTotalSupply: () => Promise<number> = async () => {
  const res = await fetch("https://fcd.terra.dev/v1/totalsupply/mir");
  const mirTokenTotalSupply: number = await res.json();
  return mirTokenTotalSupply;
};

export const getMirrorSwapValuem: () => Promise<any> = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/ade76dba-e6df-4bbd-a2f3-f2ea4fe3bd46/data/latest"
  );
  const USTBridgeValue: SwapValumeRes[] = await res.json();
  const tokenNames = Array.from(
    new Set(
      USTBridgeValue.map((item) => {
        return item.TOKEN_NAME;
      })
    )
  );
  const dailySwapValume = calculateDailyBridgeValue(
    "MM/DD/YYYY",
    USTBridgeValue,
    "SWAP_DATE",
    "TOKEN_NAME",
    "TOTAL_VOLUME_USD",
    tokenNames,
    1_000
  );
  const monthlySwapValume = calculateDailyBridgeValue(
    "YYYY-MM",
    USTBridgeValue,
    "SWAP_DATE",
    "TOKEN_NAME",
    "TOTAL_VOLUME_USD",
    tokenNames,
    30_000
  );
  return {
    monthlySwapValume,
    dailySwapValume,
    tokenNames,
  };
};

export const getMirrorTVLByStocksVolume: () => Promise<any> = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/52915f60-a99b-4b24-95a7-2d98a0499f08/data/latest"
  );
  const USTBridgeValue: MirrorTVLByStocksVolumeRes[] = await res.json();
  const tokenNames = Array.from(
    new Set(
      USTBridgeValue.map((item) => {
        return item.TOKEN_NAME;
      })
    )
  );
  const dailyTVLUSD = calculateDailyBridgeValue(
    "MM/DD/YYYY",
    USTBridgeValue,
    "SWAP_DATE",
    "TOKEN_NAME",
    "LP_BALANCE_USD",
    tokenNames,
    1_000
  );
  return {
    dailyTVLUSD,
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
    if (!Boolean(item[valueKey]) || item[valueKey] < minValue) {
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
