import { TotalWalletStaked } from "types/type";

export const getTotalWalletStaked = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/92dee1ed-acfd-456e-91fe-7ffe8870b25d/data/latest"
  );
  const totalWalletStaked: TotalWalletStaked = (await res.json())[0];
  return totalWalletStaked;
};
