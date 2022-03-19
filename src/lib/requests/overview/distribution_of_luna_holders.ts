import { DistributionOfLunaHolders } from "types/type";

export const getDistributionOfLunaHolders = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/c59b6b40-99fa-4c8f-b99c-82306f6698d6/data/latest"
  );
  const distributionOfLunaHoldersInfo: DistributionOfLunaHolders[] =
    await res.json();
  return distributionOfLunaHoldersInfo;
};
