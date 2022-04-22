import { SumAnchorDeposite } from "types/type";
export const getSumAnchorDeposite = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/fb67732d-b21f-4ccd-8aa2-fb1f1b259778/data/latest"
  );
  const sumAnchorDepositeInfo: SumAnchorDeposite = (await res.json())[0];
  return sumAnchorDepositeInfo;
};
