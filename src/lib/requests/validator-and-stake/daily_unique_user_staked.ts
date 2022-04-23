import { DailyUniqueUserStaked } from "types/type";
export const getDailyUniqueUserStaked = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/a340bfd5-ceaf-41fa-bd0a-79c7535e105a/data/latest"
  );
  const dailyUniqueUserStaked: DailyUniqueUserStaked[] = await res.json();
  return dailyUniqueUserStaked.map((item) => ({
    ...item,
    "Daily Unique Stakers": item["daily unique user staked"],
  }));
};
