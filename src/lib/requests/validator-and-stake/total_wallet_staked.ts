import { TotalWalletStaked } from "types/type";

export const getTotalWalletStaked = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/6b5d2b39-2dca-4d07-a007-4890de54038a/data/latest"
  );
  const totalWalletStaked: TotalWalletStaked = (await res.json())[0];
  return totalWalletStaked;
};
