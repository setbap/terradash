import {
  ActiveValidators,
  SimpilfiedTerraValidators,
  SimplifiedTerraValidatorsWithVote,
  TerraValidators,
  TerraValidatorsWithVote,
  TotalProposals,
} from "types/type";

export const getNumberOfActiveValidators = async () => {
  const res = await fetch(
    "https://lcd.terra.dev/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED"
  );
  const activeValidatorsData: ActiveValidators = await res.json();
  return Number(activeValidatorsData.pagination.total);
};

export const getNumberOfTotalProposals = async () => {
  const res = await fetch("https://lcd.terra.dev/cosmos/gov/v1beta1/proposals");
  const totalProposalData: TotalProposals = await res.json();
  return Number(totalProposalData.pagination.total);
};

export const getNumberOfActiveProposals = async () => {
  const res = await fetch(
    "https://lcd.terra.dev/cosmos/gov/v1beta1/proposals?proposal_status=2"
  );
  const totalActiveProposalData: TotalProposals = await res.json();
  return Number(totalActiveProposalData.pagination.total);
};

export const getTopTenTerraValidator = async () => {
  const res = await fetch("https://fcd.terra.dev/v1/staking/validators");
  const totalActiveProposalData: TerraValidators[] = await res.json();
  const topTenTerraValidator: SimpilfiedTerraValidators[] =
    totalActiveProposalData
      .sort((a, b) => +b.votingPower.weight - +a.votingPower.weight)
      .filter((_, index) => index < 10)
      .map((validator) => ({
        name: validator.description.moniker,
        "voting power": +validator.votingPower.weight * 100,
      })) || [];
  return topTenTerraValidator;
};

export const getTerraValidatorWithVote = async () => {
  const res = await fetch("https://api.terra.dev/validators");
  const allValidatorsWithVote: TerraValidatorsWithVote[] = await res.json();
  const validatorsWithTheirVote: SimplifiedTerraValidatorsWithVote[] =
    allValidatorsWithVote
      .filter((validator) => validator.votes != undefined)
      .sort((a, b) => {
        return b.votes!.length - a.votes!.length;
      })
      // .filter((_, index) => index < 130)
      .map((validator) => ({
        name: validator.description.moniker,
        "total votes": validator.votes!.length,
        "yes votes": validator.votes!.filter(
          (vote) => vote.options[0].option === "VOTE_OPTION_YES"
        ).length,
        "no votes": validator.votes!.filter(
          (vote) => vote.options[0].option === "VOTE_OPTION_NO"
        ).length,
        "abstain votes": validator.votes!.filter(
          (vote) => vote.options[0].option === "VOTE_OPTION_ABSTAIN"
        ).length,
      })) || [];
  return validatorsWithTheirVote;
};
