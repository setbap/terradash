import { ActiveValidators, TotalProposals } from "types/type";

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
