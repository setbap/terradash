import { TotalLunaStakedInUSD } from "types/type";

export const getTotalLunaStakedInUSD = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/30c4a18b-78cf-4f1a-af50-fb552320416c/data/latest"
  );
  const totalLunaStakedInUSD: TotalLunaStakedInUSD = (await res.json())[0];
  return totalLunaStakedInUSD;
};
