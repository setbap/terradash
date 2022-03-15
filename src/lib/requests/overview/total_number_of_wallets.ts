import { TotalNumberOfWallets } from "types/type";

export const getTotalNumberOfWallets = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/dd20f26c-d742-440e-a447-43b939091a2f/data/latest"
  );
  const totalNumberOfWallets: TotalNumberOfWallets = (await res.json())[0];
  return totalNumberOfWallets;
};
