import { DailyNewUser, RawDailyNewUser } from "types/type";export const getDailyNewUser = async () => {
  const rawDailyNewUser = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/54bbe92e-5034-4a5e-af54-c45663caa567/data/latest"
  );
  const dailyNewUser: RawDailyNewUser[] = await rawDailyNewUser.json();

  return dailyNewUser.map((item) => {
    return {
      DATE: item.DATE,
      NUMBER_OF_UNIQUE_USER_PER_DAY: item.NUMBER_OF_UNIQUE_USER_PER_DAY,
    };
  });
};
