import { DailyTx } from "types/type";

export const getTerraDailyTx = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/09d05805-ce6e-470b-9bdc-3a2d5f89654d/data/latest"
  );
  const terraDailyTx: DailyTx[] = await res.json();
  return terraDailyTx;
};
