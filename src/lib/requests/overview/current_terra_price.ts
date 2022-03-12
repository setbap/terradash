import { CurentLunaPrice, TotalTx } from "types/type";

export const getCurrentLunaPrice = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/a99f1fa8-2590-4eb5-9473-7d6006b40fea/data/latest"
  );
  const curentLunaPrice: CurentLunaPrice = (await res.json())[0];
  return curentLunaPrice;
};
