import { AnchorGrossTVLUSD } from "types/type";

export const getAnchorTVLUSD = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/09651200-e39b-43e0-bc40-6fa2afb18291/data/latest"
  );
  const anchorGrossTVLUSD: AnchorGrossTVLUSD[] =
    await res.json();
  return anchorGrossTVLUSD;
};
