import { DailyTx, TotalNumberOfWallets } from "types/type";

export const getTotalNumberOfWallets = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/dd20f26c-d742-440e-a447-43b939091a2f/data/latest"
  );
  const totalNumberOfWallets: TotalNumberOfWallets = (await res.json())[0];
  return totalNumberOfWallets;
};

export const getTerraDailyTx = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/09d05805-ce6e-470b-9bdc-3a2d5f89654d/data/latest"
  );
  const terraDailyTx: DailyTx[] = await res.json();

  return terraDailyTx.map((txCount) => ({
    day: txCount.day,
    "transaction count": txCount["daily TX"],
  }));
};
