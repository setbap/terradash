import { DailyBlockCount } from "types/type";

export const getDailyBlockCount = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/04064776-1580-4b56-a527-82001b52051d/data/latest"
  );
  const dailyBlockCount: DailyBlockCount[] = await res.json();
  return dailyBlockCount;
};
