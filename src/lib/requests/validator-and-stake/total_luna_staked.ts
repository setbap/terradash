import { TotalLunaStaked } from "types/type";

export const getTotalLunaStaked = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/44f993a2-2322-45bc-8f30-e4ffa10d6b83/data/latest"
  );
  const totalLunaStaked: TotalLunaStaked = (await res.json())[0];
  return totalLunaStaked;
};
