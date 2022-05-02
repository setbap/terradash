import moment from "moment";
import { RawDailyNewUser } from "types/type";
export const getDailyNewUser = async () => {
  const rawDailyNewUser = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/3d9fe65b-5c5a-4c10-920f-956fd5627fc0/data/latest"
  );

  const rawMonthlyNewUser = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/1ff061c2-a080-44ca-acb8-813fe58926da/data/latest"
  );
  const dailyNewUser: RawDailyNewUser[] = await rawDailyNewUser.json();
  const monthlyNewUser: RawDailyNewUser[] = await rawMonthlyNewUser.json();

  return {
    daily: dailyNewUser.map((item) => {
      return {
        DATE: moment(item.DATE).format("MMM DD YYYY"),
        "Unique Users": item.NUMBER_OF_UNIQUE_USER_PER_DAY,
      };
    }),
    monthly: monthlyNewUser.map((item) => {
      return {
        DATE: moment(item.DATE).format("MMM YYYY"),
        "Unique Users": item.NUMBER_OF_UNIQUE_USER_PER_DAY,
      };
    }),
  };
};
