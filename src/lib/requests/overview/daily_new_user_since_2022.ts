import { DailyNewUserSince2022 } from "types/type";

export const getDailyNewUserSince2022 = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/687c37e7-d15d-48e4-a453-d5bf7e589580/data/latest"
  );
  const dailyNewUserSince2022Info: DailyNewUserSince2022[] = await res.json();
  return dailyNewUserSince2022Info;
};
