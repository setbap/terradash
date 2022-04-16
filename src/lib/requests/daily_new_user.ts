import { DailyNewUser, RawDailyNewUser } from "types/type";

export const getDailyNewUser = async () => {
  const rawDailyNewUser = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/fd9f3216-6902-44fc-b59d-e333fbee0325/data/latest"
  );
  const dailyNewUser: RawDailyNewUser[] = await rawDailyNewUser.json();

  return dailyNewUser.map((item) => {
    return {
      DATE: item.DATE,
      NUMBER_OF_UNIQUE_USER_PER_DAY: item.NUMBER_OF_UNIQUE_USER_PER_DAY,
    };
  });
};
