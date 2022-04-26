import moment from "moment";
import {
  AtiveUserOverTime,
  DailyActiveWallets,
  DailyTx,
  SimpilifiedTotalFeeByEachToken,
  TotalFeeByEachToken,
  TotalNumberOfWallets,
  TransactionFee,
} from "types/type";

export const getDailyActiveWallets: () => Promise<AtiveUserOverTime> =
  async () => {
    const dailyRes = await fetch(
      "https://api.flipsidecrypto.com/api/v2/queries/abd492f7-d5a2-456a-92b1-33bc8a542e04/data/latest"
    );
    const monthlyRes = await fetch(
      "https://api.flipsidecrypto.com/api/v2/queries/9b5c761e-dfff-41e8-a3c5-f13081f591a0/data/latest"
    );
    const numberOfDailyActiveWallets: DailyActiveWallets[] =
      await dailyRes.json();
    const numberOfMonthlyActiveWallets: DailyActiveWallets[] =
      await monthlyRes.json();
    return {
      numberOfMonthlyActiveWallets: numberOfMonthlyActiveWallets.map(
        (month) => {
          return {
            "Number of Active Users": month.ACTIVE_USERS,
            date: moment(month.DATE).format("MMM YYYY"),
          };
        }
      ),
      numberOfDailyActiveWallets: numberOfDailyActiveWallets.map((day) => {
        return {
          "Number of Active Users": day.ACTIVE_USERS,
          date: moment(day.DATE).format("DD MMM YYYY"),
        };
      }),
    };
  };

export const getTotalNumberOfWallets = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/129cfcfb-1d97-4454-a7b8-d8111f8173f2/data/latest"
  );
  const totalNumberOfWallets: TotalNumberOfWallets = (await res.json())[0];
  return totalNumberOfWallets;
};

export const getTotalNumberOfActiveUserInPeriod = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/5d5129be-e976-4d92-844a-380c0497a14e/data/latest"
  );
  const totalNumberOfActiveUser: { active_user: number }[] = await res.json();
  return [
    {
      title: "# Active Users past day",
      name: "1D",
      value: totalNumberOfActiveUser[0].active_user,
    },
    {
      title: "# Active Users Past 7 days",
      name: "7D",
      value: totalNumberOfActiveUser[1].active_user,
    },
    {
      title: "# Active Users Past 30 days",
      name: "30D",
      value: totalNumberOfActiveUser[2].active_user,
    },
    {
      title: "# Active Users in 2022",
      name: "2022",
      value: totalNumberOfActiveUser[3].active_user,
    },
    {
      title: "# Active Users in Past Year",
      name: "1Y",
      value: totalNumberOfActiveUser[4].active_user,
    },
  ];
};

export const getTerraDailyTx = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/09d05805-ce6e-470b-9bdc-3a2d5f89654d/data/latest"
  );
  const terraDailyTx: DailyTx[] = await res.json();

  return terraDailyTx.map((txCount) => ({
    day: txCount.day,
    "Transaction Count": txCount["daily TX"],
  }));
};

export const getTotalFeeByEachToken = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/8c595217-f3ad-44c9-bf83-853e71ee1c2d/data/latest"
  );
  const totalFeeByEachToken: TotalFeeByEachToken[] = await res.json();
  const nameAndFeeObject: { [key: string]: number } = {};

  return totalFeeByEachToken.map<SimpilifiedTotalFeeByEachToken>(
    (feeAndToken) => ({
      "token name": feeAndToken.DENOM,
      "amount token": Number(feeAndToken["TOTAL_AMOUNT"]),
    })
  );
};

export const getDailyTerraTransactionFee = async () => {
  const dailyRes = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/faabbf34-1eb5-40b9-bdfd-e394e8706ecb/data/latest"
  );

  const monthlyRes = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/eb0d1a8d-e2b1-4aa7-acb7-aba9a32ff071/data/latest"
  );
  const dailyTerraTransactionFee: TransactionFee[] = await dailyRes.json();
  const monthlyTerraTransactionFee: TransactionFee[] = await monthlyRes.json();
  const daily = calculateFeesInGivenTimeFrame(
    "MM-DD-YYYY",
    dailyTerraTransactionFee
  );
  const monthly = calculateFeesInGivenTimeFrame(
    "YYYY/MM",
    monthlyTerraTransactionFee
  );

  return {
    monthly: monthly.transactionFees,
    daily: daily.transactionFees,
    denums: daily.denums,
  };
};

function calculateFeesInGivenTimeFrame(
  timeframe: string,
  dailyTerraTransactionFee: TransactionFee[]
) {
  const newSum: {
    [key: string]: { [key: string]: number };
  } = {};
  const denums = Array.from(
    new Set(
      dailyTerraTransactionFee.map((item) => {
        return item.DENOM;
      })
    )
  );
  dailyTerraTransactionFee.forEach((item) => {
    const date = moment(item.DATE).format(timeframe);
    if (newSum[date] === undefined) {
      newSum[date] = {};
      newSum[date][item.DENOM] = item.TOTAL_AMOUNT;
    } else if (newSum[date][item.DENOM] === undefined) {
      newSum[date][item.DENOM] = item.TOTAL_AMOUNT;
    } else {
      newSum[date][item.DENOM] += item.TOTAL_AMOUNT;
    }
  });
  const transactionFees = Object.entries(newSum)
    .map((bc) => {
      const finalObject = { date: bc[0] };
      denums.forEach((denum) => {
        if (bc[1][denum] !== undefined) {
          // @ts-ignore
          finalObject[denum] = bc[1][denum] ?? 0;
        }
      });
      return finalObject;
    })
    .sort((a, b) => {
      // @ts-ignore
      return new Date(a.date) - new Date(b.date);
    });
  return { transactionFees, denums };
}
