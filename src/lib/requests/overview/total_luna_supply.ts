import { TotalLunaSupply } from "types/type";

export const getTotalLunaSupply = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/8e9d0db2-f607-4041-81fc-1b9337b24270/data/latest"
  );
  const totalLunaSupply: TotalLunaSupply = (await res.json())[0];
  return totalLunaSupply;
};
