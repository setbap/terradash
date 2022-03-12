import { TotalTx } from "types/type";

export const getTerraTotalTx = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/b3fbab58-02ad-4c22-8683-ebb373f7516d/data/latest"
  );
  const totalTx: TotalTx = (await res.json())[0];
  return totalTx;
};
