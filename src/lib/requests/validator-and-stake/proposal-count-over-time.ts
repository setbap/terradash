import { ProposalCountOverTime } from "types/type";

export const getProposalCountOverTime = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/0ad92232-6b8b-4ea9-9bfd-337a46bf156e/data/latest"
  );
  const proposalCountOverTime: ProposalCountOverTime[] = await res.json();
  return proposalCountOverTime;
};
