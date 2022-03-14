import { TotalUSTSupply } from "types/type";

export const getTotalUSTSupply = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/d317dc44-bc5a-44fe-8e9d-91c1e8ceaec8/data/latest"
  );
  const totalUSTSupply: TotalUSTSupply = (await res.json())[0];
  return totalUSTSupply;
};
