import { ProposalsCountMonthlyVsMonthlyVotes } from "types/type";

export const getProposalsCountMonthlyVsMonthlyVotes = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/cda6e847-9558-4e02-8869-5aee35435bcf/data/latest"
  );
  let ProposalsCountMonthlyVsMonthlyVotes: ProposalsCountMonthlyVsMonthlyVotes[] =
    await res.json();

  return ProposalsCountMonthlyVsMonthlyVotes.map((proposal) => ({
    "number of proposal": proposal["number of proposal"],
    "monthly votes": proposal["monthly votes"],
    month: new Date(proposal.month).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    }),
  }));
};
