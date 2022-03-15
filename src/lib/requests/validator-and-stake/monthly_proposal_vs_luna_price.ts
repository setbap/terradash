import { ProposalsCountMonthlyVsLUNAPrice } from "types/type";

export const getProposalsCountMonthlyVsLUNAPrice = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/89af0ca1-638f-40b1-bd8b-af5e122cae05/data/latest"
  );
  let proposalsCountMonthlyVsLUNAPrice: ProposalsCountMonthlyVsLUNAPrice[] =
    await res.json();

  return proposalsCountMonthlyVsLUNAPrice.map((proposal) => ({
    "No of proposal": proposal["No of proposal"],
    "avg price": proposal["avg price"],
    month: new Date(proposal.month).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    }),
  }));
};
