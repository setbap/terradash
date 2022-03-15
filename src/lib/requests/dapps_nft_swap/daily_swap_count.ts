import { DailySwapCount } from "types/type";

export const getDailySwapCount = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/5df0746c-04fb-42a2-846c-dd85554a0a00/data/latest"
  );
  const dailySwapCountInfo: DailySwapCount[] = await res.json();
  return dailySwapCountInfo;
};
