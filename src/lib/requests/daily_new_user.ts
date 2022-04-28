import { DailyNewUser, RawDailyNewUser } from "types/type";
export const getDailyNewUser = async () => {
  const rawDailyNewUser = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/3d9fe65b-5c5a-4c10-920f-956fd5627fc0/data/latest"
  );
  const dailyNewUser: RawDailyNewUser[] = await rawDailyNewUser.json();

  return dailyNewUser.map((item) => {
    return {
      DATE: item.DATE,
      "Daily Unique Users": item.NUMBER_OF_UNIQUE_USER_PER_DAY,
    };
  });
};
