import { AvgTxCountPerBlock } from "types/type";

export const getTerraAvgTxCountPerBlock = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/5ef196fa-1ee5-4345-98a7-657492a7452d/data/latest"
  );
  const avgTxCountPerBlock: AvgTxCountPerBlock = (await res.json())[0];
  return avgTxCountPerBlock;
};
