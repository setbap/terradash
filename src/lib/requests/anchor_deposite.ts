import { AnchorDeposite } from "types/type";

export const getAnchorDeposite = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/fb67732d-b21f-4ccd-8aa2-fb1f1b259778/data/latest"
  );
  const anchorDepositeInfo: AnchorDeposite[] = await res.json();
  return anchorDepositeInfo;
};
