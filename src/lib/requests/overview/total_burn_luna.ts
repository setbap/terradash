import { TotalBurnLuna } from "types/type";

export const getTotalBurnLuna = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/98496bf2-007a-4605-aec7-32f216913af2/data/latest"
  );
  const totalBurnLuna: TotalBurnLuna = (await res.json())[0];
  return totalBurnLuna;
};
