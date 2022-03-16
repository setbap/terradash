import { DailyStakingRewards } from "types/type";

export const getDailyStakingRewards = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/ae0866cf-51a7-491b-8595-83961cfc4add/data/latest"
  );
  const dailyStakingRewards: DailyStakingRewards[] = await res.json();
  return dailyStakingRewards;
};
