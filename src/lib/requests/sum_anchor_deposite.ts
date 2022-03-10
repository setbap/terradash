import { SumAnchorDeposite } from "types/type";

export const getSumAnchorDeposite = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/9e6a5e73-3972-4d82-a8e0-0013a51648f0/data/latest"
  );
  const sumAnchorDepositeInfo: SumAnchorDeposite = (await res.json())[0];
  return sumAnchorDepositeInfo;
};
