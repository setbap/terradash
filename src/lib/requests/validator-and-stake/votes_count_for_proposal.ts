import { TotalVotesCountForProposal } from "types/type";

export const getTotalVotesCountForProposal = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/b017f3e2-2ae3-492a-9456-3d2cdd4231b8/data/latest"
  );
  const otalVotesCountForProposal: TotalVotesCountForProposal = (
    await res.json()
  )[0];
  return otalVotesCountForProposal;
};
