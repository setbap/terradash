import { AnchorDeposite } from "types/type";

export const getAnchorDeposite = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/913e58fb-8468-4620-903e-2ef7c51a5b6c/data/latest"
  );
  const anchorDepositeInfo: AnchorDeposite[] = await res.json();
  return anchorDepositeInfo;
};
