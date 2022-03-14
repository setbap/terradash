import { TotalWalletAlreadyStaked } from "types/type";

export const getTotalWalletAlreadyStaked = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/92dee1ed-acfd-456e-91fe-7ffe8870b25d/data/latest"
  );
  const totalWalletAlreadyStaked: TotalWalletAlreadyStaked = (
    await res.json()
  )[0];
  return totalWalletAlreadyStaked;
};
