import { DailySwapVolume } from "types/type";

export const getDailySwapVolume = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/ce7b5856-3d98-463c-a4d4-b735c2e87e5f/data/latest"
  );
  const dailySwapVolumeInfo: DailySwapVolume[] = await res.json();
  return dailySwapVolumeInfo;
};
