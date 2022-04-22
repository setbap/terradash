import { AnchorCollateralStatsLong } from "types/type";

export const getAnchorCollateralStatsLong = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/b8ff3531-06fe-4f11-8e1b-773a4cd9a4ea/data/latest"
  );
  const anchorCollateralStatsLong: AnchorCollateralStatsLong[] =
    await res.json();
  return anchorCollateralStatsLong;
};
