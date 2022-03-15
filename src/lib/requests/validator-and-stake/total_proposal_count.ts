import { TotalProposalCount } from "types/type";

export const getTotalProposalCount = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/c9fef2b6-b259-47d0-9b44-bd41109bfe84/data/latest"
  );
  const totalProposalCount: TotalProposalCount = (await res.json())[0];
  return totalProposalCount;
};
